# GraphQL Supplier Data Service

A Node.js service that fetches and transforms supplier data from a GraphQL endpoint.

## Features

- GraphQL data fetching with authentication
- Supplier data transformation and cleaning


## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Valid API credentials for the GraphQL endpoint

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
PORT=3000
API_USERNAME=your_username
API_PASSWORD=your_password
GRAPHQL_ENDPOINT=your_graphql_endpoint_url
```

## API Endpoints

### GET /fetch-data

Fetches supplier data from the GraphQL endpoint and returns a transformed response.

#### Response Format:

```json
{
  "metadata": {
    "supplierCount": number,
    "hasDiagnoses": boolean
  },
  "suppliers": [
    {
      "id": string,
      "code": string,
      "companyName": string,
      "shortName": string,
      "isActive": boolean,
      "category": string,
      "address": {
        "code": string,
        "description": string
      },
      "languageCode": string,
      "vatNumber": string,
      "registrationNumber": string
    }
  ]
}
```

## Dependencies

- express: Web framework for Node.js
- axios: HTTP client for making API requests
- dotenv: Environment variable management

## Development

To start the development server:

```bash
node server.js
```

The server will start on http://localhost:3000 (or the port specified in your .env file)

