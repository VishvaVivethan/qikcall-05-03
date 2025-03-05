import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CContainer, CSpinner } from '@coreui/react';

// routes config
import routes from '../routes';

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Routes>
          {routes.map((route, idx) => {
            // Ensure route.element is a valid component
            return (
              route.element && (
                <Route
                  key={route.path || idx} // Use route.path if available
                  path={route.path}
                  element={<route.element />}
                />
              )
            );
          })}
          <Route path="/" element={<Navigate to="/adminlogin" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
