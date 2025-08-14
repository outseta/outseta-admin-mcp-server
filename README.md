# Outseta Admin MCP Server

A Model Context Protocol (MCP) server for interacting with the Outseta platform, providing access to billing plans, plan families, accounts, and more.

## Features

- **Billing Management**: Get, create, and manage billing plans and plan families
- **Account Management**: Retrieve and manage customer accounts
- **Advanced Filtering**: Support for complex filters with operators (gt, gte, lt, lte, ne, isnull)
- **Pagination**: Built-in pagination support for all list operations
- **Sorting**: Configurable sorting by any field in ascending or descending order
- **TypeScript Support**: Comprehensive type definitions and schema validation
- **Error Handling**: Robust error handling with detailed error messages

## Installation

1. Install dependencies:

```bash
npm install
```

2. Build the project:

```bash
npm run build
```

## Configuration

Set the following environment variables:

- `OUTSETA_SUBDOMAIN` - Your Outseta subdomain (e.g., "yourcompany")
- `OUTSETA_API_KEY` - Your Outseta API key
- `OUTSETA_API_SECRET` - Your Outseta API secret

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

## Available Tools

### Plans Management

#### get_plans

Get billing plans from Outseta with pagination, filtering, and sorting.

**Parameters:**

- `page` (number, optional): Page number (0-based, default: 0)
- `perPage` (number, optional): Results per page (1-25, default: 25)
- `orderBy` (string, optional): Field to order by
- `orderDirection` ("asc" | "desc", optional): Sort direction
- `filters` (array, optional): Array of filter conditions

**Filter format:**

```json
{
  "field": "CreatedAt",
  "operator": "gte",
  "value": "2024-01-01"
}
```

**Available operators:** `gt`, `gte`, `lt`, `lte`, `ne`, `isnull`

#### get_plan_families

Get all plan families from Outseta.

**Parameters:** None

#### create_plan

Create a new billing plan.

**Parameters:**

- `name` (string): Plan name
- `planFamilyUid` (string): UID of the plan family
- `isActive` (boolean): Whether the plan is active
- `trialPeriodDays` (number): Number of trial days
- `accountRegistrationMode` ("Individual" | "Team"): Registration mode
- `rates` (object): Plan rates (monthly, quarterly, yearly, or one-time)

**Rate examples:**

```json
// Recurring plan
{
  "monthlyRate": 29,
  "quarterlyRate": 87,
  "yearlyRate": 290
}

// One-time plan
{
  "oneTimeRate": 99
}
```

### Account Management

#### get_accounts

Get customer accounts from Outseta with pagination, filtering, and sorting.

**Parameters:**

- `page` (number, optional): Page number (0-based, default: 0)
- `perPage` (number, optional): Results per page (1-25, default: 25)
- `orderBy` (string, optional): Field to order by
- `orderDirection` ("asc" | "desc", optional): Sort direction
- `filters` (array, optional): Array of filter conditions

## Response Format

All tools return responses in a consistent format:

```json
{
  "success": true,
  "data": {
    "items": [...],
    "metadata": {
      "total": 100,
      "page": 0,
      "perPage": 25
    }
  }
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details"
}
```

## Development

The project is structured as follows:

```
src/
├── index.ts          # Main MCP server setup
├── api.ts            # Outseta API client with authentication
├── schemas/
│   └── common.ts     # Shared schemas for pagination, filtering, etc.
└── tools/
    ├── index.ts      # Tool registration
    ├── plans.ts      # Billing plans tools
    ├── accounts.ts   # Account management tools
    └── _utils.ts     # Utility functions for responses
```

### Key Components

- **OutsetaApi**: Handles authentication and API communication with Outseta
- **Tools**: Individual tool implementations for different Outseta resources
- **Schemas**: Zod-based validation schemas for consistent parameter handling
- **Pagination**: Automatic conversion between MCP pagination and Outseta's offset/limit system
- **Filtering**: Advanced filtering system supporting multiple operators

### Scripts

- `npm run build` - Build the TypeScript project
- `npm start` - Run the built server
- `npm run dev` - Development mode with auto-reload

## License

ISC
