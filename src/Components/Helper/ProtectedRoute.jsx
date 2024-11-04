import React from 'react'
import { UserContext } from '../../UserContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const { login } = React.useContext(UserContext);
  // Esse children pega o componente filho do protectedRoute
  // Nesse caso ele pega o User que esta dentro do protectedRoute em App.jsx
  return login ? children : <Navigate to="/login" /> ;
};

export default ProtectedRoute
