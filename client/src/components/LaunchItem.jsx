import classnames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(new Date(dateString)).replace(',', '');
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export default function LaunchItem({ launch: { flight_number, mission_name, launch_date_local, launch_success } }) {
  return (
    <div className="card card-body mb-3">
      <div className="row align-items-center">
        <div className="col-md-9">
          <h4>
            Mission:{' '}
            <span
              className={classnames({
                'text-success': launch_success,
                'text-danger': !launch_success,
              })}
            >
              {mission_name}
            </span>
          </h4>
          <p>Date: {formatDate(launch_date_local)}</p>
        </div>
        <div className="col-md-3 text-md-right">
          <Link to={`/launch/${flight_number}`} className="btn btn-secondary">
            Launch Details
          </Link>
        </div>
      </div>
    </div>
  );
}
