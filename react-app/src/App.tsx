import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Customers from './pages/Customers';
import { Orders } from './pages/Orders';
import { ProtectedRoute, Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/customers" />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;