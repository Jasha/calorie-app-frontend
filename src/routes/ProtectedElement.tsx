import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { getUser } from 'utils/userService';

import LazyElement from './LazyElement';

interface IProtectedElementProps {
  Component: React.FC;
  isForAdmin?: boolean;
}

const ProtectedElement: React.FC<IProtectedElementProps> = ({
  Component,
  isForAdmin,
}: IProtectedElementProps) => {
  const user = getUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isForAdmin && !user.is_superuser) {
    return <Navigate to="/" replace />;
  }

  if (!isForAdmin && user.is_superuser) {
    return <Navigate to="/report" replace />;
  }

  return <LazyElement Component={Component} />;
};

ProtectedElement.defaultProps = {
  isForAdmin: false,
};

export default ProtectedElement;
