// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User';
import './App.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from './redux/authSlice';



// ✅ Composant de route privée
function PrivateRoute({ children }) {
    const token = useSelector((state) => state.auth.token);
    const localToken = localStorage.getItem('token');

    if (!token && !localToken) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
}

function App() {
    const dispatch = useDispatch();

    // ✅ Restaurer token depuis localStorage au démarrage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(setToken(token));
        }
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sign-in" element={<SignIn />} />
                {/* ✅ Route protégée */}
                <Route
                    path="/user"
                    element={
                        <PrivateRoute>
                            <User />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App; 
