import { Alert, TextInput, KeyboardAvoidingView, View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView, TouchableWithoutFeedback, Keyboard} from 'react-native'
import { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import InputField from '../components/InputField';
import PasswordField from '../components/PasswordField';
import PopUp from '../components/PopUp';

const dynamicBackground = (username) => {
  const palette = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', 
    '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', 
    '#8BC34A', '#CDDC39', '#FFC107', '#FF9800', '#FF5722'
  ];

  if (!username || username.trim() === '') return '#D3D3D3';

  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % palette.length;
  return palette[index];
};

export default function SignupScr({ navigation }){
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [suffix, setSuffix] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [isPassVisible, setPassVisibility] = useState(false)
    const [isConPassVisible, setConPassVisibility] = useState(false)
    const [statesPop, setStatesPop ] = useState({
        visible: false,
        title: '',
        description: '',
        status: 'success'
    })


    const handleSignUp = async() => {

        if (!firstName.trim() || !lastName.trim() || !username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim() ) {
            setStatesPop({visible:true,
                          title: 'Wait a Sec...',
                          description: "Don't skip the * fields!",
                          status: 'warning'
            })
            return
        }

        if (password !== confirmPassword){
            setStatesPop({visible:true,
                          title: 'Yikes!',
                          description: "Those passwords look different.",
                          status: 'error'
            })
            return
        }

        if (!/[A-Z]/.test(password)) {
            setStatesPop({visible:true,
                          title: 'Low Energy',
                          description: "Add aleast one CAPITAL letter to your pass.",
                          status: 'warning'
            })
            return
        }

        if (!/\d/.test(password)) {
            setStatesPop({visible:true,
                          title: 'Missing Digits',
                          description: "Add aleast one number to your password.",
                          status: 'warning'
            })
            return
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            setStatesPop({visible:true,
                          title: 'Too plain',
                          description: "Spice it up your password with symbols.",
                          status: 'warning'
            })
            return
        }

        if (password.length < 8) {
            setStatesPop({visible:true,
                          title: 'Too short',
                          description: "Password needs at least 8 characters.",
                          status: 'warning'
            })
            return
        }

        setLoading(true)

        const response = await fetch('https://unfauceted-irene-contextually.ngrok-free.dev/api/accounts/signup',
            {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json',
                },
                body: JSON.stringify({
                    fn: firstName,
                    ln: lastName,
                    suf: suffix,
                    usr: username,
                    em: email,
                    pas: password,
                })
            }
        )

        const data = await response.json()
        console.log(data)
        console.log(response.status)

        if (response.status === 409) {
            setStatesPop({visible: true,
                          title: 'Déjà Vu?',
                          description: data.message,
                          status: data.status
            })
        }
    }

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
                        <Text style={style.title}>Let's Get Started!</Text>
                        <Text style={style.subtitle}>Fill out all required fields</Text>
            <ScrollView
            contentContainerStyle={{ width: '100%', flexGrow:1, alignItems: 'center', justifyContent:'flex-start'}}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
                        <View style={[style.circle, { backgroundColor: dynamicBackground(username) }]}>
                            <Text style={style.avatarText}>
                                {username.trim() ? username.trim().charAt(0).toUpperCase() : '?' }
                            </Text>
                        </View>

                        <InputField name="account-outline" value={firstName} onChangeText={setFirstName} placeholder="First Name *"/>
                        <InputField name="account-group-outline" value={lastName} onChangeText={setLastName} placeholder="Last Name *"/>
                        <InputField name="card-text-outline" value={suffix} onChangeText={setSuffix} placeholder="Suffix" />
                        <InputField name="at" value={username} onChangeText={setUsername} placeholder="Username *"/>
                        <InputField name="email-outline" value={email} onChangeText={setEmail} placeholder="Email *" />

                        <PasswordField 
                            name='lock-outline' 
                            value={password} 
                            onChangeText={setPassword} 
                            placeholder="Password *" 
                            setPassVisiblity={setPassVisibility}
                            isPassVisible={isPassVisible}/>

                        <PasswordField 
                            name='lock-check-outline' 
                            value={confirmPassword} 
                            onChangeText={setConfirmPassword} 
                            placeholder="Confirm Password *" 
                            setPassVisiblity={setConPassVisibility}
                            isPassVisible={isConPassVisible}/>

                        <Text style={style.foot_text}>By signing up, you agree to our Terms of Service and Privacy Policy.</Text>

                        <TouchableOpacity style={style.signup_button} onPress={handleSignUp}>
                            <Text style={style.signup_button_text}>SIGN UP</Text>
                        </TouchableOpacity>
            </ScrollView>

            <PopUp states={statesPop} setStates={setStatesPop}/>

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
        marginVertical: 10
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
        fontWeight: 'bold',
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
    foot_text: {
        color: 'gray',
        fontSize: 12,
        paddingHorizontal: 5
    }
})