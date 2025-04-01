import { gql, useQuery } from '@apollo/client';
import React from 'react';
import LaunchItem from './LaunchItem.jsx';
import MissionKey from './MissionKey.jsx';

const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
    }
  }
`;

function Launches() {
  const { loading, error, data } = useQuery(LAUNCHES_QUERY);

  if (loading) return <h4 className="text-center">Loading...</h4>;
  if (error) {
    console.error("Error fetching launches:", error);
    return <h4 className="text-center text-danger">Error loading launches.</h4>;
  }

  return (
    <>
      <h1 className="display-4 my-3">Launches</h1>
      <MissionKey />
      {data && data.launches.map(launch => (
        <LaunchItem key={`${launch.flight_number}-${launch.mission_name}`} launch={launch} />
      ))}
    </>
  );
}

export default Launches;
