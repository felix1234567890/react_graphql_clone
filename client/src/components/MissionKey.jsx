import React from 'react';

export default function MissionKey() {
  return (
    <div className="my-4">
      <div className="d-flex align-items-center mb-2">
        <span className="px-3 py-1 mr-2 bg-success rounded"></span>
        <span>Successful Launch</span>
      </div>
      <div className="d-flex align-items-center">
        <span className="px-3 py-1 mr-2 bg-danger rounded"></span>
        <span>Failed Launch</span>
      </div>
    </div>
  );
}
