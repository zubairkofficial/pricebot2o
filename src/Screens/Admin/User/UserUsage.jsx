import React from 'react'
import { useParams } from 'react-router-dom';

const UserUsage = () => {

    const {id} = useParams();
  return (
    <div>UserUsage of user {id}</div>
  )
}

export default UserUsage