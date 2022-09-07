import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserContext } from '../contextapi/usercontext'


const PrivateRoute = ({ children}) => {

  // Add your own authentication on the below line.
  const {auth}=useContext(UserContext)

        return auth ? children : <Navigate to={{ pathname: '/login'}}/>;
}

export default PrivateRoute