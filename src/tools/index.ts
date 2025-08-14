import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerPlansTools } from "./plans.js";
import { registerAccountsTools } from "./accounts.js";
import OutsetaApi from "../api/index.js";

export const registerAllTools = (server: McpServer, outsetaApi: OutsetaApi) => {
  registerPlansTools(server, outsetaApi);
  registerAccountsTools(server, outsetaApi);
};
