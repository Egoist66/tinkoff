import {createContext, FC, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import {collection, addDoc} from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";
import { User } from 'firebase/auth';
import {Alert} from "react-native";
import {APP_CONFIG} from "../firebase";

interface IContext {
    user: User | null
    isLoading: boolean
    register: (email: string, password: string) => Promise<void>
    login: (email: string, password: string) =>  Promise<void>
    logout: () =>  Promise<void>


}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthContext = createContext<IContext>({} as IContext)
export const useAuthContext = () => useContext(AuthContext)
export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null)
    const [isLoadingInitial, setLoadingInitial] = useState<boolean>(true)
    const [isLoading, setLoading] = useState<boolean>(true)

    const registerHandler = async (email: string, password: string) => {
        setLoading(true)
        try {

            const {user} = await APP_CONFIG.register(email, password)
            await addDoc(collection(APP_CONFIG.db, 'users'), {
                _id: user.uid,
                displayName: 'No name'
            })
        } catch (error: any) {
            Alert.alert('Registration Error', error)
        } finally {
            setLoading(false)
        }
    }

    const loginHandler = async (email: string, password: string) => {
        setLoading(true)

        try {
            await APP_CONFIG.login(email, password)
        }
        catch (error: any) {
            Alert.alert('Login Error', error)
        } finally {
            setLoading(false)
        }
    }


    const logOutHandker = async () => {
        setLoading(true)

        try {
            await APP_CONFIG.logout()
        }
        catch (error: any) {
            Alert.alert('Logout Error', error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        onAuthStateChanged(APP_CONFIG.auth, (user) => {
            setUser(user || null)
            setLoadingInitial(false)
        })
    }, [])


    const value = useMemo(() => ({
        user,
        isLoading,
        login: loginHandler,
        logout: logOutHandker,
        register: registerHandler
    }), [user, isLoading]);


    return (
        <AuthContext.Provider value={value}>

            {!isLoadingInitial && children}

        </AuthContext.Provider>
    )

}