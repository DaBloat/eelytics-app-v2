import { Text, KeyboardAvoidingView, StyleSheet, Image, Platform, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import PopUp from "../components/PopUp";

export default function LoginScr({ navigation }) { 
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [isPassVisible, setPassVisibility] = useState(false)
    const [statesPop, setStatesPop ] = useState({
        visible: false,
        title: '',
        description: '',
        status: 'success'
    })
    const [mode, setMode] = useState('API')

    const handleLogin = async() => {
        console.log(`Username is ${username}`)
        console.log(`Password is ${password}`)
        const selectedUrl = mode === 'LOCAL' 
            ? 'http://192.168.1.220' 
            : 'https://unfauceted-irene-contextually.ngrok-free.dev';
        console.log(`Link is ${selectedUrl}`)

        if (!username.trim() || !password.trim()) {
            setStatesPop({visible:true,
                          title: 'Whoops!',
                          description: 'You forgot to fill in your login details.',
                          status: 'warning'
            })
            return;
        }
        
        setLoading(true)

        setStatesPop({visible: true,
                          title: 'One sec...',
                          description: 'Just feeding the server eels.',
                          status: 'loading'
        })

        const response = await fetch(`${selectedUrl}/api/accounts/login`,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type':'application/json',
                                        
                                    },
                                    body: JSON.stringify({
                                    username: username,
                                    password: password
                                    })
                                })
            
        const data = await response.json()
        console.log(data)
        console.log(response.status)

        if (response.status === 401) {
            setStatesPop({visible: true,
                          title: 'Uh-oh!',
                          description: data.message,
                          status: data.status
            })
            return;
        }

        if (response.status === 200) {
            setStatesPop({visible: true,
                          title: 'Login Success!',
                          description: data.message,
                          status: data.status
            })
            setTimeout(()=>{
                setStatesPop({...statesPop, visible: false}
                )}, 1500)
            navigation.replace('Home', { baseUrl: selectedUrl })
        }
        setLoading(false)
    }

    const goToSignUp = () => {
        navigation.navigate('Signup')
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style = {styles.login_container}
        >
            <Image source={require('../assets/logo.png')} style={styles.logo_size}/>

            <Text style={styles.title}>Welcome!</Text>

            <Text style={styles.subtitle}>Sign in to continue</Text>

            <InputField name="account-outline" placeholder='Username' value={username} onChangeText={setUsername} keyboardType='default'/>
            <PasswordField 
                name="lock-outline" 
                placeholder='Password' 
                value={password} 
                onChangeText={setPassword} 
                isPassVisible={isPassVisible} 
                setPassVisiblity={setPassVisibility}/>

            <TouchableOpacity style={styles.login_button} onPress={handleLogin}>
                <Text style={styles.login_button_text}>LOGIN</Text>
            </TouchableOpacity>

            <View style={styles.forgot_button_container}>
                <TouchableOpacity style={styles.forgot_button}>
                    <Text style={styles.forgot_button_text}>Forgot Password?</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine}/>
                <Text style={styles.dividerText}>OR REGISTER HERE</Text>
                <View style={styles.dividerLine}/>
            </View>

            <TouchableOpacity style={styles.signup_button} onPress={goToSignUp}>
                <Text style={styles.login_button_text}>SIGN UP</Text>
            </TouchableOpacity>

            <View style={styles.mode_button_container}>
                            <TouchableOpacity onPress={() => {setMode(mode === 'API' ? 'LOCAL' : 'API')}}>
                    <Text style={styles.mode_button} >
                        {mode}
                    </Text>
            </TouchableOpacity>
            </View>

            <PopUp states={statesPop} setStates={setStatesPop}/>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    login_container: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 75
    },
    logo_size: {
        height: 120,
        width: 120,
        resizeMode: 'contain',
        marginTop: 50
    },
    title: {
        color: 'white',
        fontSize: 35,
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 75
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
    login_button: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 122, 255, 0.8)',
        borderRadius: 10,
        width: '100%',
        marginTop: 10,
        paddingVertical: 15
    },
    login_button_text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white'
    },
    forgot_button_container: {
        alignItems: 'flex-end',
        width: '100%',
    },
    forgot_button: {
        marginTop: 15
    },
    forgot_button_text: {
        color: 'rgba(0, 122, 255, 0.8)',
        fontSize: 14,
    },
    dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginTop: 30,
    marginBottom: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'gray',
    },
    dividerText: {
        color: 'gray',
        marginHorizontal: 10,
        fontSize: 12,
    },
    signup_button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'gray',
        width: '80%',
        borderRadius: 10,
        height: 35,
    },
    mode_button: {
        fontSize: 12,
        color: 'gray',
    },
    mode_button_container: {
        alignItems: 'flex-end',
        width: '100%',
        marginTop: 50
    },
})
