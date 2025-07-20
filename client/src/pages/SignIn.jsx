// pages/SignIn.jsx

// ✅ Importation des composants visuels
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 

// ✅ Importation des hooks React et Redux
import { useState } from 'react'; // Pour gérer l'état local (email, password, rememberMe)
import { useDispatch, useSelector } from 'react-redux'; // Pour dispatcher les actions Redux et lire le state
import { loginUser } from '../redux/authSlice'; // Thunk asynchrone pour la connexion (Redux Toolkit)
import { useNavigate } from 'react-router-dom'; // Pour rediriger après la connexion réussie

// ✅ Composant fonctionnel SignIn — Page de connexion
function SignIn() {
    const dispatch = useDispatch(); // Préparer la fonction dispatch
    const navigate = useNavigate(); // Pour naviguer vers une autre page après le login
    const auth = useSelector(state => state.auth); // Accéder au state global auth (ex : pour afficher les erreurs)

    // ✅ Déclaration des états locaux pour gérer le formulaire
    const [email, setEmail] = useState(''); // Stocker l'email entré par l'utilisateur
    const [password, setPassword] = useState(''); // Stocker le mot de passe entré par l'utilisateur
    const [rememberMe, setRememberMe] = useState(false); // Stocker l'état de la case "Remember Me"

    // ✅ Fonction appelée lors de la soumission du formulaire de connexion
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement automatique de la page lors du submit

        // ✅ Appel du thunk Redux pour effectuer la requête de connexion
        const result = await dispatch(loginUser({ email, password }));

        // ✅ Si la connexion est réussie (thunk retourné avec "fulfilled")
        if (loginUser.fulfilled.match(result)) {
            // ✅ Si l'utilisateur a coché "Remember Me" — on stocke le token dans localStorage
            if (rememberMe) {
                localStorage.setItem('token', result.payload.token);
            }

            // ✅ Redirection vers la page protégée /user
            navigate('/user');
        } else {
            // ✅ Si la connexion échoue, on affiche une alerte (ou on pourrait afficher un message d'erreur visuel)
            alert("Login failed. Please check your credentials.");
        }
    };

    // ✅ Rendu JSX de la page
    return (
        <>
            <Navbar /> {/* Affiche la barre de navigation */}
            <main className="main bg-dark">
                <section className="login-content">
                    <i className="fa fa-user-circle login-icon"></i> {/* Icône utilisateur */}
                    <h1>Sign In</h1>

                    {/* ✅ Formulaire de connexion */}
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="email">email</label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="input-remember">
                            <input
                                type="checkbox"
                                id="remember-me"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>

                        <button className="sign-in-button" type="submit">Sign In</button>

                        {/* ✅ Affichage du message d'erreur si auth.error existe */}
                        {auth.error && <p style={{ color: 'red' }}>{auth.error}</p>}
                    </form>
                </section>
            </main>
            <Footer /> {/* Affiche le pied de page */}
        </>
    );
}

// ✅ Exportation du composant SignIn pour l'utiliser dans les routes
export default SignIn;
