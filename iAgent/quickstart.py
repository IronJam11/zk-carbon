from flask import Flask, request, jsonify
import os
import time
import threading
from datetime import datetime
import colorama
from colorama import Fore, Style, Back
import requests
import json
from decimal import Decimal
from typing import Dict, Optional
from app.agent_manager import AgentManager
from flask import Flask, request, jsonify
from flask_cors import CORS  # Import the CORS extension
import os
import time

# Initialize colorama for cross-platform colored output
colorama.init()

app = Flask(__name__)
CORS(app)

class InjectiveAPI:
    """API interface for Injective Chain with agent management"""

    def __init__(self, api_url: str, debug: bool = False):
        self.api_url = api_url
        self.debug = debug
        self.session_id = datetime.now().strftime("%Y%m%d-%H%M%S")
        self.animation_stop = False
        self.agent_manager = AgentManager()

    def format_response(self, response_text, response_type=None):
        """Format and clean up the response text based on type."""
        if not response_text:
            return "No response"

        try:
            # Try to parse as JSON first
            response_data = (
                json.loads(response_text)
                if isinstance(response_text, str)
                else response_text
            )

            # Determine the type of response based on content
            if isinstance(response_data, dict):
                if "balances" in response_data:
                    return self.format_balance_response(response_data)
                elif any(
                    key in response_data for key in ["result", "gas_wanted", "gas_fee"]
                ):
                    return self.format_transaction_response(response_data)
        except:
            pass

        # Default formatting for regular messages
        return response_text

    def format_transaction_response(self, response):
        """Format blockchain transaction response."""
        if isinstance(response, str):
            try:
                response = json.loads(response)
            except:
                return response

        if isinstance(response, dict):
            if "error" in response:
                return (
                    f"{Fore.RED}Transaction Error: {response['error']}{Style.RESET_ALL}"
                )

            result = []
            if "result" in response:
                tx_result = response["result"]
                result.append(f"{Fore.GREEN}Transaction Successful{Style.RESET_ALL}")
                if isinstance(tx_result, dict):
                    if "txhash" in tx_result:
                        result.append(f"Transaction Hash: {tx_result['txhash']}")
                    if "height" in tx_result:
                        result.append(f"Block Height: {tx_result['height']}")

            if "gas_wanted" in response:
                result.append(f"Gas Wanted: {response['gas_wanted']}")
            if "gas_fee" in response:
                result.append(f"Gas Fee: {response['gas_fee']}")

            return "\n".join(result)

        return str(response)

    def format_balance_response(self, response):
        """Format balance query response."""
        if isinstance(response, str):
            try:
                response = json.loads(response)
            except:
                return response

        if isinstance(response, dict):
            if "error" in response:
                return f"{Fore.RED}Query Error: {response['error']}{Style.RESET_ALL}"

            if "balances" in response:
                result = [f"{Fore.CYAN}Account Balances:{Style.RESET_ALL}"]
                for token in response["balances"]:
                    amount = Decimal(token.get("amount", 0)) / Decimal(
                        10**18
                    )  # Convert from wei
                    denom = token.get("denom", "UNKNOWN")
                    result.append(f"- {amount:.8f} {denom}")
                return "\n".join(result)

        return str(response)

    def make_request(
        self, endpoint: str, data: Optional[dict] = None, params: Optional[dict] = None
    ) -> dict:
        """Make API request with current agent information"""
        try:
            url = f"{self.api_url.rstrip('/')}/{endpoint.lstrip('/')}"
            headers = {"Content-Type": "application/json", "Accept": "application/json"}

            # Add current agent information to request if available
            current_agent = self.agent_manager.get_current_agent()
            if current_agent and data:
                data["agent_key"] = current_agent["private_key"]
                data["environment"] = self.agent_manager.get_current_network()
                data["agent_id"] = current_agent["address"]
            else:
                return
            response = requests.post(
                url, json=data, params=params, headers=headers, timeout=60
            )

            response.raise_for_status()
            return response.json()

        except requests.exceptions.RequestException as e:
            raise Exception(f"API request failed: {str(e)}")

# Initialize the InjectiveAPI instance
injective_api = InjectiveAPI("http://localhost:5000")

@app.route('/switch_network', methods=['POST'])
def switch_network():
    network = request.json.get('network')
    if not network or network.lower() not in ["mainnet", "testnet"]:
        return jsonify({"error": "Please specify 'mainnet' or 'testnet'"}), 400

    injective_api.agent_manager.current_agent = None
    injective_api.agent_manager.switch_network(network.lower())
    return jsonify({"message": f"Switched to {network.upper()}"}), 200

@app.route('/create_agent', methods=['POST'])
def create_agent():
    agent_name = request.json.get('agent_name')
    if not agent_name:
        return jsonify({"error": "Agent name required"}), 400

    agent_info = injective_api.agent_manager.create_agent(agent_name)
    return jsonify({
        "message": f"Created agent '{agent_name}' on {injective_api.agent_manager.get_current_network().upper()}",
        "address": agent_info['address']
    }), 200

@app.route('/delete_agent', methods=['POST'])
def delete_agent():
    agent_name = request.json.get('agent_name')
    if not agent_name:
        return jsonify({"error": "Agent name required"}), 400

    injective_api.agent_manager.delete_agent(agent_name)
    return jsonify({"message": f"Deleted agent '{agent_name}'"}), 200

@app.route('/switch_agent', methods=['POST'])
def switch_agent():
    agent_name = request.json.get('agent_name')
    if not agent_name:
        return jsonify({"error": "Agent name required"}), 400

    injective_api.agent_manager.switch_agent(agent_name)
    return jsonify({
        "message": f"Switched to agent '{agent_name}' on {injective_api.agent_manager.get_current_network().upper()}"
    }), 200

@app.route('/list_agents', methods=['GET'])
def list_agents():
    mainnet_agents, testnet_agents = injective_api.agent_manager.get_agent_based_on_network()
    if injective_api.agent_manager.current_network == "mainnet":
        agents = mainnet_agents
    else:
        agents = testnet_agents

    return jsonify({
        "network": injective_api.agent_manager.get_current_network().upper(),
        "agents": agents
    }), 200

# @app.route('/send_message', methods=['POST'])
# def send_message():
#     message = request.json.get('message')
#     if not message:
#         return jsonify({"error": "Message is required"}), 400

#     if not injective_api.agent_manager.get_current_agent():
#         return jsonify({"error": "No agent selected. Use 'switch_agent' to select an agent."}), 400

#     try:
#         agent = injective_api.agent_manager.get_current_agent()
#         result = injective_api.make_request(
#             "/chat",
#             {
#                 "message": message,
#                 "session_id": injective_api.session_id,
#                 "agent_id": agent["address"],
#                 "agent_key": agent["private_key"],
#                 "environment": injective_api.agent_manager.get_current_network(),
#             },
#         )

#         return jsonify({
#             "response": injective_api.format_response(result.get("response")),
#             "debug_info": result if injective_api.debug else None
#         }), 200

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

from transformers import pipeline

# Load a pre-trained model (e.g., GPT-J)
generator = pipeline("text-generation", model="gpt2-medium")

@app.route('/send_message', methods=['POST'])
def send_message():
    message = request.json.get('message')
    if not message:
        return jsonify({"error": "Message is required"}), 400
    
    try:
        # Generate a response using the model
        llm_response = generator(
            message, 
            max_length=50,  # Adjust based on your needs
            temperature=0.7,
            num_return_sequences=1
        )
        llm_message = llm_response[0]["generated_text"]
        
        return jsonify({
            "response": llm_message,
        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)