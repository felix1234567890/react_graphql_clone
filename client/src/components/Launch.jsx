import { gql, useQuery } from '@apollo/client';
import classnames from 'classnames';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

function Launch() {
  let { flight_number } = useParams();
  flight_number = parseInt(flight_number);

  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  });

  if (loading) return <h4 className="text-center">Loading...</h4>;
  if (error) {
    console.error("Error fetching launch details:", error);
    return <h4 className="text-center text-danger">Error loading launch details.</h4>;
  }

  if (!data || !data.launch) {
    return <h4 className="text-center">Launch data not found.</h4>;
  }

  const {
    mission_name,
    launch_year,
    launch_success,
    rocket: { rocket_name, rocket_type },
  } = data.launch;

  return (
    <div>
      <h1 className="display-4 my-3">
        <span className="text-dark">Mission:</span> {mission_name}
      </h1>
      <h4 className="mb-3">Launch Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Flight Number: {flight_number}</li>
        <li className="list-group-item">Launch Year: {launch_year}</li>
        <li className="list-group-item">
          Launch Successful:{' '}
          <span
            className={classnames({
              'text-success': launch_success,
              'text-danger': !launch_success,
            })}
          >
            {launch_success ? 'Yes' : 'No'}
          </span>
        </li>
      </ul>

      <h4 className="my-3">Rocket Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Rocket Name: {rocket_name}</li>
        <li className="list-group-item">Rocket Type: {rocket_type}</li>
      </ul>

      <hr />
      <Link className="btn btn-secondary my-3" to="/">
        Back
      </Link>
    </div>
  );
}

export default Launch;
