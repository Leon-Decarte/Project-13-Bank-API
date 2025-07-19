// components/Navbar.jsx

// ✅ Importation des outils nécessaires à la navigation et à la gestion du state global Redux
import { Link } from 'react-router-dom'; // Permet la navigation sans rechargement via React Router
import { useDispatch } from 'react-redux'; // Hook Redux pour dispatcher des actions au store
import { logout } from '../redux/authSlice'; // Action de déconnexion créée dans le slice Redux
import logo from '../assets/argentBankLogo.png'; // Logo de l'application

// ✅ Composant fonctionnel Navbar — Il affiche la barre de navigation
// La prop { user } est reçue du composant parent pour savoir si l'utilisateur est connecté ou non
function Navbar({ user }) {
    const dispatch = useDispatch(); // Préparation du dispatch pour interagir avec Redux

    // ✅ Fonction appelée lors du clic sur "Sign Out"
    // Elle déclenche l'action logout() pour réinitialiser le token et déconnecter l'utilisateur
    const handleLogout = () => {
        dispatch(logout()); // Met à jour le store pour déconnecter le user
    };

    return (
        <nav className="main-nav">
            {/* ✅ Logo + Retour à la page d'accueil */}
            <Link className="main-nav-logo" to="/">
                <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
                {/* Ce <h1> est masqué pour l’accessibilité (lecture d'écran) */}
                <h1 className="sr-only">Argent Bank</h1>
            </Link>

            <div>
                {/* ✅ Si l'utilisateur est connecté */}
                {user ? (
                    <>
                        {/* Lien vers la page profil utilisateur */}
                        <Link className="main-nav-item" to="/user">
                            <i className="fa fa-user-circle"></i> {user}
                        </Link>

                        {/* Lien de déconnexion avec déclenchement de handleLogout() */}
                        <Link className="main-nav-item" to="/" onClick={handleLogout}>
                            <i className="fa fa-sign-out"></i> Sign Out
                        </Link>
                    </>
                ) : (
                    // ✅ Si l'utilisateur n'est pas connecté — Affiche le lien "Sign In"
                    <Link className="main-nav-item" to="/sign-in">
                        <i className="fa fa-user-circle"></i> Sign In
                    </Link>
                )}
            </div>
        </nav>
    );
}

// ✅ Exportation du composant Navbar pour pouvoir l'utiliser ailleurs (ex : App.jsx)
export default Navbar;
