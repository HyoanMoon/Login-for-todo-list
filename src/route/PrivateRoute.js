import React from "react";
import { Navigate } from "react-router-dom";


const PrivateRoute = ({user, children}) => {
    return  user ? children : <Navigate to = "/login"/>;
    
}

// User 값이 있으면? Todo page : redirect /login 으로!!!!


export default PrivateRoute