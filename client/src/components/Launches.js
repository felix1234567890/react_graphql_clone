import React, { Component } from 'react'
import {Query} from 'react-apollo'
import gql from 'graphql-tag'
import LaunchItem from './LaunchItem'
import MissionKey from './MissionKey'


const LAUNCHES_QUERY = gql`
query LaunchesQuery{
  launches {
    flight_number
    mission_name
    launch_date_local
    launch_success
  }
}`

export default class Launches extends Component {
  render() {
    return (
      <div>
        <h1 className="display-4 my-3">Launches</h1>
        <MissionKey/>
        <Query query={LAUNCHES_QUERY}>
        { ({loading, error, data}) => {
          if(loading) return <h4>Loading...</h4>
          if(error) console.log(error)
          
          return <div>
            {data.launches.map(launch => {
              return <LaunchItem key={launch.flight_number} launch={launch}/>
            })}
          </div>
        }}
        </Query>
        
      </div>
    )
  }
}
