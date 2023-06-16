const http = require("http");
const { Pool } = require("pg");

// Configure the PostgreSQL connection
const pool = new Pool({
  user: "admin",
  host: "praetor.ingress.dcnorse.ddns.net",
  database: "mydb",
  password: "password",
  port: 32490, // Default PostgreSQL port
});

// Create an HTTP server
const server = http.createServer(async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM "Books"');
    const books = result.rows;

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(books));

    client.release();
  } catch (error) {
    console.error("Error occurred:", error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

// Start the server
server.listen(8000, "0.0.0.0", () => {
  console.log("Server running at http://localhost:8000/");
});
