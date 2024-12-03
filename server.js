// Import the necessary modules
require('dotenv').config();
const express = require('express');
const axios = require('axios');

// Initialize the express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Set up the route to get data from the GraphQL endpoint
app.get('/fetch-data', async (req, res) => {
  try {
    // Define the GraphQL query
    const query = {
      query: `{
        x3MasterData {
          supplier {
            query (first: 1000) {
              edges{
                node{
                  _id
                  code{
                    code
                  }
                  _companyName
                  shortCompanyName
                  isActive
                  category{
                    description
                  }
                  addressByDefault{
                    code
                    description
                  }
                  language{
                    code
                  }
                  vatNumber
                  registrationNumber
                }
              }
            }
          }
        }
      }`
    };

    // Configure basic authentication credentials
    const auth = Buffer.from(
      `${process.env.API_USERNAME}:${process.env.API_PASSWORD}`
    ).toString('base64');

    // Make the request to the GraphQL endpoint
    const response = await axios.post(process.env.GRAPHQL_ENDPOINT, query, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      }
    });

    const data = response.data;
    
    // Transform suppliers into a cleaner format
    const suppliers = data?.data?.x3MasterData?.supplier?.query?.edges.map(edge => {
      const supplier = edge.node;
      return {
        id: supplier._id,
        code: supplier.code.code,
        companyName: supplier._companyName,
        shortName: supplier.shortCompanyName,
        isActive: supplier.isActive,
        category: supplier.category?.description,
        address: {
          code: supplier.addressByDefault?.code,
          description: supplier.addressByDefault?.description
        },
        languageCode: supplier.language?.code,
        vatNumber: supplier.vatNumber || null,
        registrationNumber: supplier.registrationNumber || null
      };
    }) || [];

    // Send transformed response
    res.status(200).json({
      metadata: {
        supplierCount: suppliers.length,
        hasDiagnoses: data.extensions?.diagnoses?.length > 0
      },
      suppliers
    });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
