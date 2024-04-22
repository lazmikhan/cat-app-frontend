// withHeader.tsx
import React from 'react';
import Header from '../../commons/Header/Header';

const withHeader = (WrappedComponent: React.ComponentType) => {
  return (props: any) => (
    <div>
      <Header />
      <WrappedComponent {...props} />
    </div>
  );
};

export default withHeader;
