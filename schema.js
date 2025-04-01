import axios from 'axios';
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';

// SpaceX API Base URL
const SPACEX_API_BASE_URL = 'https://api.spacexdata.com/v3';

// Launch Type
const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocket: { type: RocketType },
  }),
});

// Rocket Type
const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      async resolve(parent, args) {
        try {
          const response = await axios.get(`${SPACEX_API_BASE_URL}/launches`);
          return response.data;
        } catch (error) {
          console.error('Error fetching launches:', error);
          throw new Error('Failed to fetch launches');
        }
      },
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        try {
          const response = await axios.get(
            `${SPACEX_API_BASE_URL}/launches/${args.flight_number}`
          );
          return response.data;
        } catch (error) {
          console.error(`Error fetching launch ${args.flight_number}:`, error);
          throw new Error(`Failed to fetch launch ${args.flight_number}`);
        }
      },
    },
    rockets: {
      type: new GraphQLList(RocketType),
      async resolve(parent, args) {
        try {
          const response = await axios.get(`${SPACEX_API_BASE_URL}/rockets`);
          return response.data;
        } catch (error) {
          console.error('Error fetching rockets:', error);
          throw new Error('Failed to fetch rockets');
        }
      },
    },
    rocket: {
      type: RocketType,
      args: {
        // Changed from id: GraphQLInt to rocket_id: GraphQLString
        rocket_id: { type: GraphQLString },
      },
      async resolve(parent, args) {
        try {
          // Corrected endpoint and argument name
          const response = await axios.get(
            `${SPACEX_API_BASE_URL}/rockets/${args.rocket_id}`
          );
          return response.data;
        } catch (error) {
          console.error(`Error fetching rocket ${args.rocket_id}:`, error);
          throw new Error(`Failed to fetch rocket ${args.rocket_id}`);
        }
      },
    },
  },
});

// Export the schema using ES Module syntax
const schema = new GraphQLSchema({
  query: RootQuery,
});

export default schema;
