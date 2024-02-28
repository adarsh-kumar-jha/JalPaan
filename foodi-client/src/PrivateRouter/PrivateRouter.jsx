import React, { useContext } from 'react';
import { useLocation } from "react-router-dom";
import { AuthContext } from '../contexts/AuthProvider';
const PrivateRouter = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();

 if(loading)
 {
    return 
    ( 
        <LoadingSpinner/>
    )

 }
 if(user)
 {
    return children;
 }




  return (
    <div>
      
    </div>
  )
}

export default PrivateRouter
