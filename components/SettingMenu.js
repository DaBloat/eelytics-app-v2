import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function SettingMenu({state, setState}) {
    return (
        <Modal visible={state} transparent={true}>
            <View style={styles.modal_container} >
                <View style={styles.menu}>
                    <View style={styles.back_button_container}>
                        <TouchableOpacity onPress={setState} styles={styles.back_button}>
                            <MaterialCommunityIcons name={'arrow-right-thin'} size={30} color={'gray'}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menu_button_containers}>
                        <Text style={styles.title}>
                            Settings
                        </Text>
                    </View>
                    <View style={styles.menu_button_containers}>
                        <View style={styles.subtitle_container}>
                            <Text style={styles.subtitle}>
                                Test Gates:
                            </Text>
                        </View>
                        <View style={styles.test_button_container}>
                            <TouchableOpacity style={[styles.test_button, {backgroundColor: '#00D4FF'}]}>
                                <Text style={styles.test_button_text}>
                                    ELVER
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.test_button, {backgroundColor: '#FF3131'}]}>
                                <Text style={styles.test_button_text}>
                                    TABLE
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.test_button, {backgroundColor: '#00FF41'}]}>
                                <Text style={styles.test_button_text}>
                                    KUROKO
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.menu_button_containers}>
                        <TouchableOpacity>
                            <Text>
                                Delete Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.menu_button_containers}>
                        <TouchableOpacity>
                            <Text>
                                Log Out
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal_container : {
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    menu: {
        backgroundColor: 'rgba(30, 30, 30, 1)',
        width: "80%",
        height: "100%",
        borderLeftWidth: 2,
        borderLeftColor: 'rgba(0, 122, 255, 1)',
        justifyContent: 'flex-start',
        alignContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    back_button_container: {
        alignItems:'flex-end',
        paddingHorizontal: 15,
        paddingVertical: 12
    },
    back_button: {
        margin: 10
    },
    menu_button_containers: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        borderBottomWidth: 1, 
        borderColor: 'rgba(255, 255, 255, 0.2)'
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 24,
        paddingBottom: 10
    },
    subtitle_container: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: '90%'
    },
    subtitle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        padding: 10
    },
    test_button_container: {
        flexDirection: 'row',
        paddingBottom: 10
    },
    test_button: {
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 1)',
        margin: 5,
        height: 65,
        width: 65,
        alignItems: 'center',
        justifyContent: 'center'
    },
    test_button_text: {
        color: 'black',
        fontSize: 10,
        padding: 10,
        fontWeight: 'bold'
    }
})