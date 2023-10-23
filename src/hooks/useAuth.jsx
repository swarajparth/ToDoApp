import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useAuth = () => {
    const {
        loading,
        loggedIn,
        username,
        authenticate,
        login,
        logout
    } = useContext(AuthContext);

    return {
        loading,
        loggedIn,
        username,
        authenticate,
        login,
        logout
    };
};