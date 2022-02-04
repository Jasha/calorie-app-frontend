import React from 'react';
import { LinearProgress } from '@mui/material';

interface ILazyElementProps {
  Component: React.FC;
}

const LazyElement: React.FC<ILazyElementProps> = ({
  Component,
}: ILazyElementProps) => (
  <React.Suspense fallback={<LinearProgress />}>
    <Component />
  </React.Suspense>
);

export default LazyElement;
