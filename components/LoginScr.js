import { Text, KeyboardAvoidingView, StyleSheet, Image, Platform, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScr() { 
    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style = {styles.login_container}
        >
            <Image source={require('../assets/logo.png')} style={styles.logo_size}/>

            <Text style={styles.title}>Welcome!</Text>

            <Text style={styles.subtitle}>Sign in to continue</Text>

            <View style={styles.input_container}>
                <MaterialCommunityIcons name="account-outline" size={20} color={'gray'}/>
                <TextInput 
                    style={styles.input_text}
                    placeholder="Username"
                    placeholderTextColor="gray"
                    />
            </View>

            <View style={styles.input_container}>
                <MaterialCommunityIcons name="lock-outline" size={20} color={'gray'}/>
                <TextInput 
                    style={styles.input_text}
                    placeholder="Password"
                    placeholderTextColor="gray"
                    secureTextEntry/>
            </View>

            <TouchableOpacity style={styles.login_button}>
                <Text style={styles.login_button_text}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgot_button}>
                <Text style={styles.forgot_button_text}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine}/>
                <Text style={styles.dividerText}>OR REGISTER HERE</Text>
                <View style={styles.dividerLine}/>
            </View>

            <TouchableOpacity style={styles.signup_button}>
                <Text style={styles.login_button_text}>SIGN UP</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    login_container: {
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
    forgot_button: {
        alignItems: 'flex-end',
        width: '100%',
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
    }
})
