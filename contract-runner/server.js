const express = require("express");
const { exec } = require("child_process"); // Terminal commands run karne ke liye
const path = require("path");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
// Static files serve karein (frontend ke liye)
app.use(express.static("public"));

// Hardcoded values
const FOLDER_PATH = "../contracts"; 
const PASSWORD = "nitinrinki7777";
const FROM_ADDRESS = "inj1t0whglsm4hkdngh8ccwlgtrz96ye54jwv8p96s"; 
const CHAIN_ID = "injective-888"; 
const NODE_URL = "https://k8s.testnet.tm.injective.network:443"; 
const GAS_FEES = "1000000000000000inj"; 
const GAS_LIMIT = "2000000"; 

// Generalized function to build command
const buildCommand = (type, contractAddress, functionName, queryParams = {}) => {
  let command = "";

  if (type === "execute") {
    // For execute commands (state-changing)
    const executeMsg = JSON.stringify({ [functionName]: queryParams });
    command = `
      injectived tx wasm execute ${contractAddress} '${executeMsg}' \\
      --from=${FROM_ADDRESS} \\
      --chain-id="${CHAIN_ID}" \\
      --yes --fees=${GAS_FEES} --gas=${GAS_LIMIT} \\
      --node=${NODE_URL} \\
      --output json
    `;
  } else if (type === "query") {
    // For query commands (read-only)
    const queryMsg = JSON.stringify({ [functionName]: queryParams });
    command = `
      injectived query wasm contract-state smart ${contractAddress} '${queryMsg}' \\
      --node=${NODE_URL} \\
      --output json
    `;
  } else {
    throw new Error("Invalid command type. Use 'execute' or 'query'.");
  }

  return command;
};

// API endpoint for generalized command execution
app.post("/command", (req, res) => {
  const { type, contractAddress, functionName, queryParams = {} } = req.body;

  if (!type || !contractAddress || !functionName) {
    return res.status(400).json({ success: false, message: "Missing required fields: type, contractAddress, or functionName" });
  }

  try {
    // Build the command
    const command = buildCommand(type, contractAddress, functionName, queryParams);

    // Full path banayein
    const fullPath = path.resolve(__dirname, FOLDER_PATH);

    // Terminal se command run karein
    const childProcess = exec(command, { cwd: fullPath, shell: "/bin/bash" }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ success: false, message: `Command failed: ${error.message}` });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res.status(500).json({ success: false, message: `Command failed: ${stderr}` });
      }

      // Command ka output frontend ko bhejein
      res.json({ success: true, output: stdout });
    });

    // Password automatically pass karein (only for execute commands)
    if (type === "execute") {
      childProcess.stdin.write(`${PASSWORD}\n`); // Password + new line
      childProcess.stdin.end(); // Input stream end karein
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
});

// New endpoint to fetch organizations
app.get("/api/organizations", (req, res) => {
  const contractAddress = "inj1nyv7fs5awuuarfgxqua89srt3064ef786zfhjg"; // Contract address for organizations
  const functionName = "get_all_organizations"; // Function name to fetch organizations
  const queryParams = { start_after: null, limit: 10 }; // Query parameters

  try {
    // Build the query command
    const command = buildCommand("query", contractAddress, functionName, queryParams);

    // Full path banayein
    const fullPath = path.resolve(__dirname, FOLDER_PATH);

    // Terminal se command run karein
    exec(command, { cwd: fullPath, shell: "/bin/bash" }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ success: false, message: `Command failed: ${error.message}` });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res.status(500).json({ success: false, message: `Command failed: ${stderr}` });
      }

      try {
        // Parse the command output
        const result = JSON.parse(stdout);
        res.json({ success: true, organizations: result.data.organizations });
      } catch (parseError) {
        console.error(`Error parsing command output: ${parseError.message}`);
        res.status(500).json({ success: false, message: "Failed to parse command output" });
      }
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get("/api/claims", (req, res) => {
  const contractAddress = "inj1nyv7fs5awuuarfgxqua89srt3064ef786zfhjg"; // Contract address for claims
  const functionName = "get_claims"; // Function name to fetch claims
  const queryParams = { start_after: null, limit: 10 }; // Query parameters

  try {
    // Build the query command
    const command = buildCommand("query", contractAddress, functionName, queryParams);

    // Log the command for debugging
    console.log("Executing command:", command);

    // Full path banayein
    const fullPath = path.resolve(__dirname, FOLDER_PATH);

    // Terminal se command run karein
    exec(command, { cwd: fullPath, shell: "/bin/bash" }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ success: false, message: `Command failed: ${error.message}` });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res.status(500).json({ success: false, message: `Command failed: ${stderr}` });
      }

      // Log the command output for debugging
      console.log("Command output:", stdout);

      try {
        // Parse the command output
        const result = JSON.parse(stdout);

        // Check if the result contains the expected data
        if (result.data && result.data.claims) {
          res.json({ success: true, claims: result.data.claims });
        } else {
          throw new Error("Invalid response format: claims data not found");
        }
      } catch (parseError) {
        console.error(`Error parsing command output: ${parseError.message}`);
        res.status(500).json({ success: false, message: "Failed to parse command output" });
      }
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
});
// Add this endpoint to your existing backend code
app.post("/api/addClaim", (req, res) => {
  const {
    contractAddress,
    longitudes,
    latitudes,
    time_started,
    time_ended,
    demanded_tokens,
    ipfs_hashes,
  } = req.body;

  // Validate required fields
  if (
    !contractAddress ||
    !longitudes ||
    !latitudes ||
    !time_started ||
    !time_ended ||
    !demanded_tokens ||
    !ipfs_hashes
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: contractAddress, longitudes, latitudes, time_started, time_ended, demanded_tokens, or ipfs_hashes",
    });
  }

  try {
    // Build the execute command
    const executeMsg = JSON.stringify({
      create_claim: {
        longitudes,
        latitudes,
        time_started,
        time_ended,
        demanded_tokens,
        ipfs_hashes,
      },
    });

    const command = buildCommand("execute", contractAddress, "create_claim", {
      longitudes,
      latitudes,
      time_started,
      time_ended,
      demanded_tokens,
      ipfs_hashes,
    });

    // Log the command for debugging
    console.log("Executing command:", command);

    // Full path banayein
    const fullPath = path.resolve(__dirname, FOLDER_PATH);

    // Terminal se command run karein
    const childProcess = exec(command, { cwd: fullPath, shell: "/bin/bash" }, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ success: false, message: `Command failed: ${error.message}` });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return res.status(500).json({ success: false, message: `Command failed: ${stderr}` });
      }

      try {
        // Parse the command output
        const result = JSON.parse(stdout);
        res.json({ success: true, output: result });
      } catch (parseError) {
        console.error(`Error parsing command output: ${parseError.message}`);
        res.status(500).json({ success: false, message: "Failed to parse command output" });
      }
    });

    // Password automatically pass karein
    childProcess.stdin.write(`${PASSWORD}\n`); // Password + new line
    childProcess.stdin.end(); // Input stream end karein
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ success: false, message: error.message });
  }
});
// Server start karein
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});