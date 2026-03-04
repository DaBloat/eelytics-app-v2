import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function SettingMenu({state, setState}) {
    return (
        <Modal visible={state} transparent={true} animationIn="slideInRight" animationOut="slideOutRight">
            <SafeAreaProvider>
                <SafeAreaView style={styles.modal_container} >
                    <View style={styles.menu}>
                        <View style={styles.back_button_container}>
                            <TouchableOpacity onPress={setState} styles={styles.back_button}>
                                <MaterialCommunityIcons name={'arrow-right-thin'} size={30} color={'gray'}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menu_button_containers}>
                            <Text style={styles.title}>
                                Options
                            </Text>
                        </View>
                        <View style={styles.menu_button_containers}>
                            <View style={styles.subtitle_container}>
                                <MaterialCommunityIcons name={'gate'} color={'white'} size={16}/>
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
                            <View style={styles.subtitle_container}>
                                <MaterialCommunityIcons name={'chip'} color={'white'} size={16}/>
                                <Text style={styles.subtitle}>
                                    System Health:
                                </Text>
                            </View>
                            <View style={styles.component_container}>
                                <TouchableOpacity style={styles.component_button}>
                                    <MaterialCommunityIcons name={'server-network'} color={'white'}/>
                                    <Text style={styles.component_button_text}>
                                        Model Server
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.component_button}>
                                    <MaterialCommunityIcons name={'raspberry-pi'} color={'white'}/>
                                    <Text style={styles.component_button_text}>
                                        Raspberry Pi
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.component_button}>
                                    <MaterialCommunityIcons name={'integrated-circuit-chip'} color={'white'}/>
                                    <Text style={styles.component_button_text}>
                                        Gate ESP32
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.component_button}>
                                    <MaterialCommunityIcons name={'integrated-circuit-chip'} color={'white'}/>
                                    <Text style={styles.component_button_text}>
                                        Tank ESP32
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.menu_button_containers}>
                            <TouchableOpacity style={styles.menu_button}>
                                <MaterialCommunityIcons name={'information'} color={'white'} size={16}/>
                                <Text style={styles.menu_button_text}>
                                    Information
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menu_button_containers}>
                            <TouchableOpacity style={styles.menu_button}>
                                <MaterialCommunityIcons name={'gavel'} color={'white'} size={16}/>
                                <Text style={styles.menu_button_text}>
                                    Legal
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menu_button_containers}>
                            <TouchableOpacity style={styles.menu_button}>
                                <MaterialCommunityIcons name={'bug-outline'} color={'white'} size={16}/>
                                <Text style={styles.menu_button_text}>
                                    Feedback
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menu_button_containers}>
                            <TouchableOpacity style={styles.menu_button}>
                                <MaterialCommunityIcons name={'trash-can'} color={'white'} size={16}/>
                                <Text style={styles.menu_button_text}>
                                    Delete Account
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menu_button_containers}>
                            <TouchableOpacity style={styles.menu_button}>
                                <MaterialCommunityIcons name={'logout'} color={'white'} size={16}/>
                                <Text style={styles.menu_button_text}>
                                    Log Out
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.copyright_foot}>
                            <Text style={styles.copyright_text}>
                                © 2025 Eelytics All Rights Reserved
                            </Text>
                        </View>
                    </View>
                </SafeAreaView>
            </SafeAreaProvider>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal_container : {
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        height: '100%'
    },
    menu: {
        backgroundColor: 'rgba(30, 30, 30, 1)',
        width: "80%",
        height: "100%",
        borderLeftWidth: 1,
        borderLeftColor: 'rgba(0, 122, 255, 1)',
        justifyContent: 'flex-start',
        alignContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
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
        alignItems: 'center',
        justifyContent: 'flex-start',
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
    },
    menu_button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10
    },
    menu_button_text: {
        color: 'white',
        paddingHorizontal: 5,
        fontWeight: 'bold',
        fontSize: 14
    },
    copyright_foot: {
        position: 'absolute',
        bottom: 10,
        left: 55,
    },
    copyright_text: {
        color: 'gray'
    },
    component_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 10,
        width: '100%',
    },
    component_button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        width: '40%',
        backgroundColor: 'rgba(0, 122, 255, 0.9)',
        borderRadius: 10
    },
    component_button_text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 10,
        padding: 10
    }
})