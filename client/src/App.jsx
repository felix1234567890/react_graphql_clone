import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "./App.css";
import Launch from './components/Launch.jsx';
import Launches from './components/Launches.jsx';
import logo from "./spacex.png";

// Initialize Apollo Client
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql", // Your GraphQL server endpoint
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container"> {/* Changed className for potentially better styling context */}
          <img 
            src={logo} 
            alt="SpaceX Logo" // Added more descriptive alt text
            style={{ width: 300, display: 'block', margin: 'auto' }} // Centered logo
          />
          <Routes> {/* Updated routing for React Router v6 */}
            <Route path="/" element={<Launches />} /> 
            <Route path="/launch/:flight_number" element={<Launch />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
