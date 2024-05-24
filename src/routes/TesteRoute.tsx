import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useGoogleGetAccount, UserGoogleLogin, UserResponseGoogle, useValidGoogleSession } from '../services/Querys/Google';

export function Teste() {
    const [user, setUser] = useState<UserGoogleLogin>(null);
    const [profile, setProfile] = useState<UserResponseGoogle>(null);
    const { data, error, refetch } = useGoogleGetAccount(user);
    const { data: _tokenData, error: _tokenError, refetch: tokenRefetch } = useValidGoogleSession(user);

    useEffect(() => {
        const t = JSON.parse(localStorage.getItem("credentials"))
        if (t) {
            setUser(t)
        }
    }, [])

    useEffect(() => {
        if (user) { 
            tokenRefetch()
            refetch();
        }
    }, [user]);
    
    useEffect(() => {
        if (data) setProfile(data);
        if (error) console.error('Error fetching user data:', error);
        
    }, [data, error]);


    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            localStorage.setItem("credentials", JSON.stringify(codeResponse));
            setUser(codeResponse)
        },
        onError: (error) => console.log('Login Failed:', error),
    });

    const logOut = () => {
        googleLogout();
        setProfile(null);
        setUser(null)
        localStorage.removeItem("credentials")
    };

    

    return (
        <div>
            <h2>React Google Login</h2>
            <br />
            <br />
            {profile ? (
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={() => logOut()}>Log out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Sign in with Google 🚀 </button>
            )}
        </div>
    );
}
