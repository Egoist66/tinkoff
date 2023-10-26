import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {AuthProvider} from "./app/providers/AuthProvider";

export default function App() {

    return (

        <AuthProvider>

                <Text></Text>

        </AuthProvider>


    );
}

