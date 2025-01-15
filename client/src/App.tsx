import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import publicRoutes from './router/publicRoutes';
import privateRoutes from './router/privateRoutes';
import './style.scss'
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

const App = () => {
  const isAuthenticated = useSelector((store: RootState) => store.admin.isAuthenticated); // Replace with your auth logic

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {
          publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))
        }

        {/* Private Routes */}
        {
          privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={(
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                >
                  {route.element}
                </ProtectedRoute>
              )}
            >
              {route?.children?.map(child => (
                <Route
                  key={child.path}
                  path={child.path}
                  element={(
                    <ProtectedRoute
                      isAuthenticated={isAuthenticated}
                    >
                      {child.element}
                    </ProtectedRoute>
                  )}
                />
              ))}
            </Route>
          ))
        }
        <Route path='*' element={<Navigate to={'/'} />} />
      </Routes>
    </Router>
  );
};

export default App;
