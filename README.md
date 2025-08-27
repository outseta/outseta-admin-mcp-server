# Outseta Admin MCP Server

A Model Context Protocol (MCP) server for interacting with your [Outseta](https://outseta.com) account. This server provides AI assistants with the ability to manage your Outseta account through natural language commands.

- [What You Can Do](#what-you-can-do)
  - [Account & People](#account--people)
  - [Billing Plans](#billing-plans)
  - [Subscriptions](#subscriptions)
  - [Email Lists](#email-lists)
- [Integration with AI Assistants](#integration-with-ai-assistants)
  - [Prerequisites & Requirements](#prerequisites--requirements)
  - [Getting Your API Credentials](#getting-your-api-credentials)
  - [Using the MCP Server with Cursor](#using-the-mcp-server-with-cursor)
  - [Using the MCP Server with Claude Desktop](#using-the-mcp-server-with-claude-desktop)
- [Security Considerations](#security-considerations)
  - [API Credential Security](#api-credential-security)
  - [Data Privacy](#data-privacy)
  - [Access Control](#access-control)
- [Contributing](#contributing)
- [License](#license)

## What You Can Do

This MCP server enables AI assistants to help you with common Outseta administrative tasks:

### Account & People

- **Manage accounts & people**:

  - "Register a new account for Acme Corp"
  - "Add lisa@example.com to the Basic plan"
  - "Create a new person 'Jane Doe' (jane@example.com)"
  - "Add Sarah Johnson as a team member to the Acme Corp"
  - "Update the primary contact for Acme Corp"

- **Explore accounts & people**:

  - "How many people are associated with Acme Corp?"
  - "List all accounts created this month"
  - "Who has been added this week?"
  - "What accounts are trialing at the moment?"

### Billing Plans

- **Manage billing plans & plan families**:

  - "Create a new monthly plan called 'Starter' for $29/month, $199/year"
  - "Add a 'Pro' plan"
  - "Help me create plans for a course business"
  - "Let's add SaaS style plans"
  - "Create a plan family for my course business"
  - "Set up plan families for different product lines"

- **Explore billing plans & plan families**:

  - "What are my paid plans?"
  - "What is the price of my Pro plan?"
  - "List all plan families"
  - "Show me all plans in the 'SaaS' plan family"

### Subscriptions

- **Preview & change subscriptions**:

  - "What would happen if I upgrade account Acme Corp to annual billing?"
  - "Preview the cost changes if I switch Acme Corp to the Pro plan"
  - "Upgrade Acme Corp to the Pro plan starting immediately"

- **Explore subscriptions**:

  - "Show me all active subscriptions"
  - "Show me failed payments this week"
  - "List accounts that are currently on trials"

### Email Lists

- **Manage email lists & subscriptions**:

  - "I need a newsletter"
  - "Let's add a Product Updates list with double opt-in"
  - "Add john@example.com to Product Updates"
  - "Create an internal list for team announcements"

- **Explore email lists & subscribers**:

  - "What email lists do I have"
  - "Who's subscribed to Product Updates?"
  - "List all subscribers to my newsletter"
  - "How many people are on each of my email lists?"

## Integration with AI Assistants

This server integrates with MCP-compatible AI assistants to enable natural language management of your Outseta account. The AI assistant will automatically select the appropriate tools based on your requests, handle parameter validation and error checking, and prompt for confirmation before performing destructive operations.

### Prerequisites & Requirements

Before setting up the MCP server, ensure you have:

- **Node.js** (version 18 or higher)
- **An active Outseta account** with admin access
- **Outseta API credentials** (API key and secret)
- **MCP-compatible AI assistant** (Cursor, Claude Desktop, or similar)

### Getting Your API Credentials

To use this MCP server, you'll need to obtain API credentials from your Outseta account:

1. Log into your Outseta account
2. Go to **Settings > Integrations > API Keys**
3. Click **Add API Keys**
4. Create a new API key with appropriate permissions
5. Note down your:
   - **Subdomain** (e.g., if your Outseta URL is `yourcompany.outseta.com`, your subdomain is `yourcompany`)
   - **API Key**
   - **API Secret**

**Important**: Keep these credentials secure

### Using the MCP Server with Cursor

1. In Cursor, open your settings (Cmd/Ctrl + ,)
2. Search for "MCP" or go to Extensions > MCP
3. Add a new MCP server configuration:
   ```json
   {
     "name": "outseta-admin",
     "command": "npx",
     "args": ["-y", "@outseta/admin-mcp-server"],
     "env": {
       "OUTSETA_SUBDOMAIN": "your-subdomain",
       "OUTSETA_API_KEY": "your-api-key",
       "OUTSETA_API_SECRET": "your-api-secret"
     }
   }
   ```
4. Save the configuration and restart Cursor
5. The Outseta tools will now be available in Cursor's AI assistant

### Using the MCP Server with Claude Desktop

1. Open Claude Desktop's configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
2. Add the MCP server configuration:
   ```json
   {
     "mcpServers": {
       "outseta-admin": {
         "command": "npx",
         "args": ["-y", "@outseta/admin-mcp-server"],
         "env": {
           "OUTSETA_SUBDOMAIN": "your-subdomain",
           "OUTSETA_API_KEY": "your-api-key",
           "OUTSETA_API_SECRET": "your-api-secret"
         }
       }
     }
   }
   ```
3. Save the configuration and restart Claude Desktop
4. The Outseta tools will now be available in Claude Desktop

## Security Considerations

When using this MCP server, keep the following security practices in mind:

### API Credential Security

- **Never commit API credentials** to version control systems
- Store credentials securely using environment variables
- Regularly rotate your API keys as part of good security hygiene
- Use the minimum required permissions for your API keys

### Data Privacy

- The MCP server only accesses data you explicitly request through AI commands
- All API calls are made directly from your local environment to Outseta
- No data is stored persistently by the MCP server
- Review AI commands before confirming destructive operations

### Access Control

- Only install this server in trusted environments
- Be cautious when sharing MCP configurations that include credentials
- Create keys specifically for the MCP server

## Contributing

Interested in contributing? See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## License

ISC
