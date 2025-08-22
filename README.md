# Outseta Admin MCP Server

A Model Context Protocol (MCP) server for interacting with your [Outseta](https://outseta.com) account. This server provides AI assistants with the ability to manage your Outseta account through natural language commands.

## What You Can Do

This MCP server enables AI assistants to help you with common Outseta administrative tasks:

### Account & Customer Management

- **Register new accounts**: "Register a new account for John Doe with email john@example.com on the Pro plan"
- **Find customer information**: "Show me all accounts created this month"
- **Update customer details**: "Change the billing plan for account ABC123 to the Enterprise plan"
- **Preview subscription changes**: "What would happen if I upgrade account XYZ to annual billing?"

### Billing & Subscription Management

- **Manage billing plans**: "Create a new monthly plan called 'Starter' for $29/month"
- **Handle subscription changes**: "Upgrade customer ABC to the Pro plan starting immediately"
- **Plan family organization**: "Create a new plan family called 'Business Plans'"
- **Monitor billing**: "Show me all accounts with failed payments this week"

### People & Contact Management

- **Add team members**: "Add Sarah Johnson as a team member to the Acme Corp account"
- **Update contact info**: "Update the primary contact for account XYZ"
- **Manage relationships**: "Show me all people associated with the Enterprise accounts"

### Email List Management

- **Manage subscribers**: "Add john@example.com to the Prodct Updates"
- **Bulk operations**: "Show me all email lists and their subscriber counts"

## Installation

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

## Usage

### As a standalone MCP server

Run the server:

```bash
npm start
```

### Development mode

Run in development mode with auto-reload:

```bash
npm run dev
```

## Integration with AI Assistants

This server is designed to work with MCP-compatible AI assistants. Once connected, you can use natural language to perform Outseta administrative tasks like:

- "Register a new customer for the Pro plan"
- "Show me accounts that haven't paid this month"
- "Create a new email list for product announcements"
- "Upgrade all Starter plan customers to Pro"
- "Add the new hire to our team account"

The AI assistant will use the appropriate tools automatically based on your requests, handling parameter validation, error checking, and confirmation prompts for destructive operations.

### Setting up with Cursor

1. Make sure the MCP server is built
2. In Cursor, open your settings (Cmd/Ctrl + ,)
3. Search for "MCP" or go to Extensions > MCP
4. Add a new MCP server configuration (replace the path with the path to the MCP server):
   ```json
   {
     "name": "outseta-admin",
     "command": "node",
     "args": ["path/to/your/outseta-admin-mcp-server/build/index.js"],
     "env": {
       "OUTSETA_SUBDOMAIN": "your-subdomain",
       "OUTSETA_API_KEY": "your-api-key",
       "OUTSETA_API_SECRET": "your-api-secret"
     }
   }
   ```
5. Save the configuration and restart Cursor
6. The Outseta tools will now be available in Cursor's AI assistant

### Setting up with Claude Desktop

1. Make sure the MCP server is built
2. Open Claude Desktop's configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
3. Add the MCP server configuration (replace the path with the path to the MCP server):
   ```json
   {
     "mcpServers": {
       "outseta-admin": {
         "command": "node",
         "args": ["path/to/your/outseta-admin-mcp-server/build/index.js"],
         "env": {
           "OUTSETA_SUBDOMAIN": "your-subdomain",
           "OUTSETA_API_KEY": "your-api-key",
           "OUTSETA_API_SECRET": "your-api-secret"
         }
       }
     }
   }
   ```
4. Save the configuration and restart Claude Desktop
5. The Outseta tools will now be available in Claude Desktop

## License

ISC
