import { Pool } from "../deps.js";

const CONCURRENT_CONNECTIONS = 2;
const connectionPool = new Pool({
  hostname: "balarama.db.elephantsql.com",
  database: "uacmjhab",
  user: "uacmjhab",
  password: "Nd4kAXw9VTozV790OQ1keyZNFObyrPdj",
  port: 5432,
}, CONCURRENT_CONNECTIONS);

// const CONCURRENT_CONNECTIONS = 2;
// const connectionPool = new Pool({}, CONCURRENT_CONNECTIONS);

const executeQuery = async (query, ...args) => {
  const response = {};
  let client;

  try {
    client = await connectionPool.connect();
    const result = await client.queryObject(query, ...args);
    if (result.rows) {
      response.rows = result.rows;
    }
  } catch (e) {
    console.log(e);
    response.error = e;
  } finally {
    try {
      await client.release();
    } catch (e) {
      console.log(e);
    }
  }

  return response;
};

export { executeQuery };
