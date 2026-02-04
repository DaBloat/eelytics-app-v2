import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function PasswordField({name, placeholder, value, onChangeText, isPassVisible, setPassVisiblity}){
    return (
        <View style={styles.input_container}>
            <MaterialCommunityIcons name={name} size={20} color={'gray'}/>
            <TextInput
                style={styles.input_text}
                placeholder={placeholder}
                placeholderTextColor='gray'
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={!isPassVisible}/>
            <TouchableOpacity onPress={() => {setPassVisiblity(!isPassVisible)}}>
                <MaterialCommunityIcons
                name={isPassVisible ? 'eye':'eye-off'}
                size={20}
                color={'gray'}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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
})