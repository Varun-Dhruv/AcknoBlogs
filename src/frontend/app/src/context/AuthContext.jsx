"use client"
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()
const admin_server_url = process.env.NEXT_PUBLIC_SERVER_URL;

export const AuthProvider = ({ children }) => {

    const [state, setState] = useState({
        authenticated: false,
        user: null,
        token: ''
    })

    const verifyLogin = async () => {
        try {
            const { data: res } = await axios.get(
                `${admin_server_url}/auth/user`,
                {
                    headers: {
                        'Authorization': window.localStorage.getItem('auth_token')
                    }
                }
            )

            updateState({
                authenticated: true,
                token: window.localStorage.getItem('auth_token'),
                user: res
            })
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.localStorage.removeItem('auth_token')
            }
        }
    }
    useEffect(() => {
        verifyLogin()
    }, [])
    const updateState = (updates) => {
        const data = {}
        Object.assign(data, state)
        Object.assign(data, updates)
        setState(data)
    }

    const value = { state: state, setState, updateState, verifyLogin }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}

