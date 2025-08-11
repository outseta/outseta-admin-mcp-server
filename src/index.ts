#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { registerAllTools } from "./tools/index.js";
import OutsetaApi from "./api.js";

// Create server instance
const server = new McpServer({
  name: "outseta-admin",
  version: "1.0.0",
});

const outsetaApi = new OutsetaApi(
  process.env.OUTSETA_SUBDOMAIN!,
  process.env.OUTSETA_API_KEY!,
  process.env.OUTSETA_API_SECRET!
);

// Register all tools
registerAllTools(server, outsetaApi);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Outseta Admin MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
