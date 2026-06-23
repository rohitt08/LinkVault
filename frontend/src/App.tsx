import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoadingSpinner } from './components/LoadingSpinner';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const SignUp = lazy(() => import('./pages/SignUp').then(module => ({ default: module.SignUp })));
const History = lazy(() => import('./pages/History').then(module => ({ default: module.History })));
const UnlockPage = lazy(() => import('./components/UnlockPage').then(module => ({ default: module.UnlockPage })));
const ExpiredPage = lazy(() => import('./components/ExpiredPage').then(module => ({ default: module.ExpiredPage })));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#F4F7F4]"><LoadingSpinner /></div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unlock/:alias" element={<UnlockPage />} />
          <Route path="/expired" element={<ExpiredPage />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
