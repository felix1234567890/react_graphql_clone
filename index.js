import { createYoga } from 'graphql-yoga';
import { createServer } from 'node:http';
import schema from './schema.js'; // Add .js extension for ES Modules

const PORT = process.env.PORT || 4000; // Use environment variable or default

// Create a Yoga instance with the schema
const yoga = createYoga({ schema });

// Create an HTTP server with Yoga
const server = createServer(yoga);

// Start the server
server.listen(PORT, () => {
  console.info(`Server is running on http://localhost:${PORT}/graphql`);
});
