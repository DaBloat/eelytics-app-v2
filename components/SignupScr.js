import { TextInput, KeyboardAvoidingView, View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native'
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
            <View style={style.back_button}>
                <TouchableOpacity onPress={goToLogin}>
                    <MaterialCommunityIcons name='arrow-left-thin' size={35} color='gray'/>
                </TouchableOpacity>
            </View>
            <ScrollView
            contentContainerStyle={{ width:'100%', flexGrow:1, alignItems: 'center', justifyContent:'center'}}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
                        <Text style={style.title}>Let's Get Started!</Text>
                        <Text style={style.subtitle}>Fill out all required fields</Text>
                        <View style={[style.circle, { backgroundColor: '#F44336' }]}>
                            <Text style={style.avatarText}>T</Text>
                        </View>
                        <View style={style.input_container}>
                            <MaterialCommunityIcons name='account-outline' size={20} color={'gray'}/>
                            <TextInput
                                style={style.input_text}
                                placeholder='First Name*'
                                placeholderTextColor='gray'/>
                        </View>

                        <View style={style.input_container}>
                            <MaterialCommunityIcons name='account-group-outline' size={20} color={'gray'}/>
                            <TextInput
                                style={style.input_text}
                                placeholder='Last Name*'
                                placeholderTextColor='gray'/>
                        </View>

                        <View style={style.input_container}>
                            <MaterialCommunityIcons name='card-text-outline' size={20} color={'gray'}/>
                            <TextInput
                                style={style.input_text}
                                placeholder='Suffix'
                                placeholderTextColor='gray'/>
                        </View>

                        <View style={style.input_container}>
                            <MaterialCommunityIcons name='at' size={20} color={'gray'}/>
                            <TextInput
                                style={style.input_text}
                                placeholder='Username*'
                                placeholderTextColor='gray'/>
                        </View>

                        <View style={style.input_container}>
                            <MaterialCommunityIcons name='email-outline' size={20} color={'gray'}/>
                            <TextInput
                                style={style.input_text}
                                placeholder='Email*'
                                placeholderTextColor='gray'/>
                        </View>

                        <View style={style.input_container}>
                            <MaterialCommunityIcons name='lock-outline' size={20} color={'gray'}/>
                            <TextInput
                                style={style.input_text}
                                placeholder='Password*'
                                placeholderTextColor='gray'/>
                        </View>

                        <View style={style.input_container}>
                            <MaterialCommunityIcons name='lock-check-outline' size={20} color={'gray'}/>
                            <TextInput
                                style={style.input_text}
                                placeholder='Confirm Password*'
                                placeholderTextColor='gray'/>
                        </View>

                        <TouchableOpacity style={style.signup_button}>
                            <Text style={style.signup_button_text}>SIGN UP</Text>
                        </TouchableOpacity>
            </ScrollView>            
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
        paddingVertical: 25
    },
    back_button: {
        alignItems: 'flex-start',
        width: '100%',
        marginTop: 15
    },
    circle: {
        height: 100,
        width: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'rgba(0, 122, 255, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 25
    },
    avatarText: {
        fontSize: 65,
        fontWeight: 'bold',
        color: 'white',
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 0.5)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        marginBottom: 15,
        paddingHorizontal: 15,
    },
    input_text: {
        flex: 1,
        color: 'white',
        fontWeight: 16,
        height: 50
    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 16,
        color: 'gray'
    },
    signup_button: {
        paddingHorizontal: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 122, 255, 0.8)',
        borderRadius: 10,
        height: 35

    },
    signup_button_text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    },
})