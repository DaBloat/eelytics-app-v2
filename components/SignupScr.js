import { TextInput, KeyboardAvoidingView, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function SignupScr({ navigation }){

    const goToLogin = () => {
        navigation.goBack('Login')
    }

    return (
        <KeyboardAvoidingView
         behavior={Platform.OS === 'ios' ? 'padding':'height'}
         style={style.signup_container}>
            <TouchableOpacity onPress={goToLogin}>
                <Text>Back</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    signup_container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 75
    }
})