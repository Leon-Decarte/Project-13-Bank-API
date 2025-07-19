// ✅ Importation des composants réutilisables
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AccountCard from '../components/AccountCard';

// ✅ Importation des hooks React & Redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ✅ Importation de l'action fetchUserProfile (thunk) qui va récupérer le profil utilisateur
import { fetchUserProfile, updateUserProfile  } from '../redux/authSlice';


// ✅ Composant de la page "User" (tableau de bord utilisateur)
function User() {

    const dispatch = useDispatch(); // ✅ Permet d'envoyer des actions Redux

    // ✅ Récupération des données du user depuis le store Redux (stockées par fetchUserProfile)
    const user = useSelector((state) => state.auth.user);

    // ✅ Récupération du token stocké dans le store Redux (mis lors du login ou du chargement)
    const token = useSelector((state) => state.auth.token);

    const [isEditing, setIsEditing] = useState(false);
    const [firstNameInput, setFirstNameInput] = useState(user?.firstName || '');
    const [lastNameInput, setLastNameInput] = useState(user?.lastName || '');

    const handleSave = () => {
        dispatch(updateUserProfile({ firstName: firstNameInput, lastName: lastNameInput, token }));
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFirstNameInput(user?.firstName || '');
        setLastNameInput(user?.lastName || '');
    };
console.log('Token avant fetch profile:', token);

        // ✅ useEffect se déclenche au montage du composant ou quand le token change
    // ➔ Si on a un token valide, on demande les informations du profil au backend via Redux Thunk
    useEffect(() => {
        if (token) {
            dispatch(fetchUserProfile(token));
        }
    }, [dispatch, token]); // ✅ Dispatch et token sont des dépendances (bonne pratique)


    return (
        <>
            <Navbar user={user?.firstName || 'User'} />
            <main className="main bg-dark">
                <div className="header">
                    {isEditing ? (
                        <>
                            <h1>Edit Name</h1>
                            <div className="edit-form">
                                <input 
                                    type="text" 
                                    value={firstNameInput} 
                                    onChange={(e) => setFirstNameInput(e.target.value)} 
                                />
                                <input 
                                    type="text" 
                                    value={lastNameInput} 
                                    onChange={(e) => setLastNameInput(e.target.value)} 
                                />
                                <button onClick={handleSave}>Save</button>
                                <button onClick={handleCancel}>Cancel</button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>Welcome back<br />{user?.firstName} {user?.lastName}!</h1>
                            <button className="edit-button" onClick={() => setIsEditing(true)}>Edit Name</button>
                        </>
                    )}
                </div>
                
                <section className="account-list">
                    <AccountCard title="Argent Bank Checking (x8349)" amount="$2,082.79" desc="Available Balance" />
                    <AccountCard title="Argent Bank Savings (x6712)" amount="$10,928.42" desc="Available Balance" />
                    <AccountCard title="Argent Bank Credit Card (x8349)" amount="$184.30" desc="Current Balance" />
                </section>
            </main>
            <Footer />
        </>
    );
}

// ✅ On exporte le composant pour l'utiliser dans App.jsx (via PrivateRoute)
export default User;
