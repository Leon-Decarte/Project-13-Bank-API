// App.jsx
// ✅ Import des outils de routage React Router
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// ✅ Import des pages principales
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User';

// ✅ Import des styles globaux
import './App.css';

// ✅ Import des hooks React et Redux pour les effets et la gestion d'état global
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ✅ Import de l'action setToken pour réinitialiser le token Redux depuis le localStorage
import { setToken } from './redux/authSlice';




// ✅ Composant PrivateRoute — Protège l'accès aux pages sensibles
// ➔ Si l'utilisateur n'est pas connecté (pas de token), il est redirigé vers /sign-in
// ➔ Sinon, le composant enfant (User) est rendu normalement
function PrivateRoute({ children }) {
    // ✅ On récupère le token depuis le store Redux
    const token = useSelector((state) => state.auth.token);

    // ✅ On vérifie également si un token est stocké dans le localStorage (persistance)
    const localToken = localStorage.getItem('token');

    // ✅ Si aucun token → Redirection automatique vers la page de connexion
    if (!token && !localToken) {
        return <Navigate to="/sign-in" replace />;
    }

    // ✅ Sinon → On affiche les enfants (exemple : <User />)
    return children;
}


// ✅ Composant principal de l'application
function App() {
    const dispatch = useDispatch(); // ✅ Hook Redux pour envoyer des actions

    // ✅ Au montage de l'application (au démarrage ou rafraîchissement)
    // ➔ On vérifie si un token est déjà enregistré dans le localStorage
    // ➔ Si oui, on le remet dans Redux pour que l'application "reconnaisse" l'utilisateur
    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken) {
            dispatch(setToken(localToken)); // ✅ On restaure le token dans le store Redux
        }
    }, [dispatch]); // ✅ On déclare dispatch comme dépendance (bonne pratique)


    // ✅ Rendu du composant App
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
