// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
const CosmosClient = require("@azure/cosmos").CosmosClient;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const page = req.query.page ? req.query.page as unknown as number : 1;
    const { endpoint, key, database, container } = {endpoint: process.env.COSMOS_URI, key: process.env.COSMOS_KEY,
        database: process.env.COSMOS_DATABASE, container: process.env.COSMOS_CONTAINER};
   
     const client = new CosmosClient({ endpoint, key });
   
     const databaseID = client.database(database);
     const containerID = databaseID.container(container);
   
     if (endpoint) {
       console.log(`Querying container:\\n${containerID}`);
       const querySpec = {
         query: `SELECT * FROM c OFFSET ${(page-1)*5} LIMIT 5`,
       };
   
       const { resources: items } = await containerID.items
         .query(querySpec)
         .fetchAll();
      res.status(200).json(items)
     }
}
