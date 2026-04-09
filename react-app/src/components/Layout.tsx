import { Navigate, Outlet, Link, useNavigate } from 'react-router-dom';

export const ProtectedRoute = () => {
    return localStorage.getItem('token') ? <Outlet /> : <Navigate to="/login" />;
};

export const Layout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={{ padding: '20px' }}>
            <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
                <Link to="/customers">Customers (Laravel)</Link> |{" "}
                <Link to="/orders">Orders (NestJS)</Link> |{" "}
                <button onClick={handleLogout} style={{ color: 'red', marginLeft: '10px' }}>Logout</button>
            </nav>
            <Outlet />
        </div>
    );
};