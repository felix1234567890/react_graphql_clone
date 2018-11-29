import React, { Component } from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import {Link} from 'react-router-dom'
import classnames from 'classnames'

const LAUNCH_QUERY = gql`
query LaunchQuery($flight_number:Int!){
  launch(flight_number: $flight_number){
    flight_number
    mission_name
    launch_year
    launch_success
    launch_date_local
    rocket{
      rocket_id
      rocket_name
      rocket_type
    }
  }
}
`

export class Launch extends Component {
  render() {
    let {flight_number} = this.props.match.params
    flight_number = parseInt(flight_number)
    return (
      <div>
        <Query query={LAUNCH_QUERY} variables={{flight_number}}> 
          {
            ({loading, error, data}) => {
              if(loading) return <h4>Loading...</h4>
              if(error) console.log(error)
              const {mission_name, flight_number, launch_year, launch_success, rocket: { rocket_name, rocket_type}} = data.launch
              return <div>
                <h1 className="display-4 my-3"><span className="text-dark"> Mission: {mission_name}</span> </h1>
                <h4 className="mb-3">Launch details</h4>
                <ul className="list-group">
                <li className="list-group-item"> Flight number: {flight_number}</li>
                <li className="list-group-item"> Launch year: {launch_year}</li>
                <li className="list-group-item"> Successfull: <span className={classnames({'text-succes': launch_success,'text_danger':!launch_success})}>{launch_success ? 'Yes':'No'}</span></li>
                </ul>
                <h4 className="my-3">Rocket details</h4>
                <ul className="list-group">
                <li className="list-group-item">{rocket_name}</li>
                <li className="list-group-item">{rocket_type}</li>
                </ul>
                <Link className="btn btn-secondary my-1" to="/">Back</Link>
              </div>
            }
          }
        </Query>
      </div>
    )
  }
}

export default Launch
