// redux/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/user';

export const loginUser = createAsyncThunk(
    'auth/loginUser', // ✅ Nom de l'action (sera utilisé dans les reducers et pour le debug)
    async ({ email, password }, thunkAPI) => {
        try {
            // ✅ Envoi d'une requête POST avec email & password vers le backend /login
            const response = await axios.post(`${API_URL}/login`, { email, password });
            return response.data.body; 
            // ✅ Si OK : on retourne uniquement le body (contenant le token)
        } catch (error) {
            // ✅ Si error : on rejette avec une valeur customisée (sera récupérable dans extraReducers)
            return thunkAPI.rejectWithValue('Login failed');
        }
    }
);

// ✅ NOUVEAU : Thunk pour récupérer le profil utilisateur
// Il sera appelé après la connexion pour charger les données utilisateur

export const fetchUserProfile = createAsyncThunk(
    'auth/fetchUserProfile', // ✅ Nom de l'action
    async (token, thunkAPI) => {
        try {
            // ✅ Requête POST vers /profile avec le token en Authorization
            const response = await axios.post(`${API_URL}/profile`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.body; 
            // ✅ Si OK : on retourne le profil utilisateur
        } catch (error) {
            return thunkAPI.rejectWithValue('Could not fetch profile');
            // ✅ Si erreur : on rejette avec un message d'erreur
        }
    }
);

// ✅ NOUVEAU : Thunk pour mettre à jour le profil utilisateur
// Il sera appelé lors de la modification du nom ou prénom dans le profil
export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async ({ firstName, lastName, token }, thunkAPI) => {
    try {
        const response = await axios.put(`${API_URL}/profile`, 
            { firstName, lastName },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data.body;
    } catch (error) {
        return thunkAPI.rejectWithValue('Could not update profile');
    }
});


// ✅ NOUVEAU : Slice Redux pour l'authentification
const initialState = {
    token: null,
    user: null,
    loading: false,
    error: null,
};

// ✅ Création du slice avec les reducers et les actions
const authSlice = createSlice({
    name: 'auth',      // ✅ Nom du slice (utile pour Redux DevTools)
    initialState,      // ✅ État initial

    reducers: {
        // ✅ Fonction de déconnexion
        logout: (state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem('token'); // ✅ On vide aussi le localStorage
        },

        // ✅ Fonction pour restaurer un token depuis le localStorage (au rechargement par exemple)
        setToken: (state, action) => {
            state.token = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            // ✅ Quand le login réussit : on stocke le token dans le state
            .addCase(loginUser.fulfilled, (state, action) => {
                state.token = action.payload.token; // ✅ Le token retourné par la réponse backend
                state.error = null;                 // ✅ On reset l'erreur au cas où
            })
            // ✅ Quand la récupération du profil réussit : on stocke le user dans le state
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;        // ✅ Le profil complet retourné par l'API
                state.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.user = action.payload;  // 🔥 Met à jour les infos utilisateur
                state.error = null;
});
            
    },
});


export const { logout, setToken } = authSlice.actions;
// ✅ On exporte nos actions "logout" et "setToken" pour les utiliser dans les composants

export default authSlice.reducer;
// ✅ On exporte le reducer pour le connecter au store principal

