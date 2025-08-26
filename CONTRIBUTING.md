# Contributing to Outseta Admin MCP Server

Thank you for your interest in contributing to the Outseta Admin MCP Server! This guide will help you get set up for development.

## Development Setup

### Prerequisites

- Node.js (version 18 or higher)
- npm
- An Outseta account with API access

### Installation

1. Clone the repository:

```bash
git clone https://github.com/outseta/outseta-admin-mcp-server.git
cd outseta-admin-mcp-server
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

## Development Workflow

### Running in Development Mode

Run in development mode with auto-reload:

```bash
npm run dev
```

### Building the Project

To build the TypeScript source code:

```bash
npm run build
```

### Testing

Run the server locally:

```bash
npm start
```

## Project Structure

- `src/` - TypeScript source code
  - `api/` - Core API utilities and schema
  - `crm_accounts/` - Account management tools
  - `crm_people/` - People management tools
  - `billing_plans/` - Billing plan management tools
  - `billing_subscriptions/` - Subscription management tools
  - `email_lists/` - Email list management tools
  - `index.ts` - Main server entry point
  - `tools.ts` - Tool registration and configuration
- `build/` - Compiled JavaScript output
- `package.json` - Project configuration and dependencies
- `tsconfig.json` - TypeScript configuration

## Environment Variables

For development, you'll need to set up the following environment variables:

- `OUTSETA_SUBDOMAIN` - Your Outseta subdomain
- `OUTSETA_API_KEY` - Your Outseta API key
- `OUTSETA_API_SECRET` - Your Outseta API secret

You can set these in your shell or create a `.env` file (note: `.env` files are gitignored).

## Contributing Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Build and test your changes
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add JSDoc comments for public APIs
- Ensure all code builds without warnings

## Adding New Tools

When adding new Outseta API endpoints:

1. Create a new directory under `src/` for the feature area
2. Add schema definitions in `schema.ts`
3. Implement the tool handlers in `index.ts`
4. Register the tools in `src/tools.ts`
5. Update documentation as needed

## Publishing

See `PUBLISH_CHECKLIST.md` for the complete publishing process.
