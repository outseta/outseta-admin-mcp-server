# Outseta Admin MCP Server

A Model Context Protocol (MCP) server for interacting with the Outseta billing platform.

## Features

- Get billing plans from Outseta with pagination and sorting support
- Structured JSON response format for easy programmatic consumption
- Proper error handling and data formatting
- TypeScript support with comprehensive type definitions

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

### Available Tools

#### get_plans

Get billing plans from Outseta.

**Parameters:**

- `offset` (number, optional): Starting record number (default: 0)
- `limit` (number, optional): Maximum number of records to return (default: 100)
- `orderBy` (string, optional): Field to order by
- `orderDirection` ("asc" | "desc", optional): Order direction

**Example response:**

```json
{
  "success": true,
  "metadata": {
    "total": 3,
    "count": 3,
    "offset": 0,
    "limit": 100
  },
  "plans": [
    {
      "id": "abc123def4",
      "name": "Basic Plan",
      "description": "Basic features for small teams",
      "monthlyRate": 29,
      "annualRate": 290,
      "quarterlyRate": 87,
      "oneTimeRate": 0,
      "isActive": true,
      "trialPeriodDays": 14,
      "planFamily": {
        "id": "xyz789ghi0",
        "name": "Standard Plans"
      },
      "isPerUser": false,
      "setupFee": 0,
      "isTaxable": true,
      "unitOfMeasure": "",
      "isQuantityEditable": false,
      "minimumQuantity": 1,
      "maxPeople": null,
      "requiresPayment": true,
      "numberOfSubscriptions": 12
    },
    {
      "id": "def456ghi7",
      "name": "Pro Plan",
      "description": "Advanced features for growing businesses",
      "monthlyRate": 99,
      "annualRate": 990,
      "quarterlyRate": 297,
      "oneTimeRate": 0,
      "isActive": true,
      "trialPeriodDays": 14,
      "planFamily": {
        "id": "xyz789ghi0",
        "name": "Standard Plans"
      },
      "isPerUser": false,
      "setupFee": 0,
      "isTaxable": true,
      "unitOfMeasure": "",
      "isQuantityEditable": false,
      "minimumQuantity": 1,
      "maxPeople": null,
      "requiresPayment": true,
      "numberOfSubscriptions": 8
    }
  ]
}
```

## Development

The project is structured as follows:

- `src/index.ts` - Main MCP server setup and tool definitions
- `src/api.ts` - Outseta API client
- `src/types.ts` - TypeScript type definitions for Outseta entities

## License

ISC
