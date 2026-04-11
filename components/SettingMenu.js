import { Modal, View, Text, TouchableOpacity, StyleSheet, Linking, Image, ScrollView } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState } from 'react'
import PopUp from './PopUp'
import GeneralModal from './GeneralModal'

export default function SettingMenu({state, setState, onClose, navigation}) {
    const [legalState, setLegalState] = useState(false)
    const [statesPop, setStatesPop ] = useState({
        visible: false,
        title: '',
        description: '',
        status: 'success'
    })

    const handleLogOut = () => {
        setStatesPop({
            visible: true,
            title: 'Logging Out',
            description: 'Cleaning the mess we made!',
            status: 'success'
        })
        onClose()
        setTimeout(()=>{navigation.replace('Login')}, 2000)
    }

    const  handleFeedback = () => {
        const email = 'eelyticsadmin@gmail.com'
        const subject = 'App Feedback'
        const body = 'Hi Eelytics Team,\n\nI have some feedback regarding...'

        const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        Linking.openURL(url).catch((err) => console.error("An error occurred", err))
    }

    const handleLegal = () => {
        onClose()
        toggleLegal()
    }

    const toggleLegal = () => {
        setLegalState(!legalState)
    }

    const handleInfo = () => {
        onClose()
    }

    const modelServer = () => {
        onClose()
    }

    const raspberryPi = () => {
        onClose()
    }

    const gateEsp = () => {
        onClose()
    }

    const tankEsp = () => {
        onClose()
    }



    return (
        <>
        <Modal visible={state} transparent={true} animationIn="slideInRight" animationOut="slideOutRight" onRequestClose={onClose}>
            <SafeAreaProvider>
                <SafeAreaView style={styles.modal_container} >
                    <View style={styles.menu}>
                        <View style={styles.back_button_container}>
                            <TouchableOpacity onPress={setState} style={styles.back_button}>
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
                                    System Info:
                                </Text>
                            </View>
                            <View style={styles.component_container}>
                                <TouchableOpacity style={styles.component_button} onPress={modelServer}>
                                    <MaterialCommunityIcons name={'server-network'} color={'white'}/>
                                    <Text style={styles.component_button_text}>
                                        Model Server
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.component_button} onPress={raspberryPi}>
                                    <MaterialCommunityIcons name={'raspberry-pi'} color={'white'}/>
                                    <Text style={styles.component_button_text}>
                                        Raspberry Pi
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.component_button} onPress={gateEsp}>
                                    <MaterialCommunityIcons name={'integrated-circuit-chip'} color={'white'}/>
                                    <Text style={styles.component_button_text}>
                                        Gate ESP32
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.component_button} onPress={tankEsp}>
                                    <MaterialCommunityIcons name={'integrated-circuit-chip'} color={'white'}/>
                                    <Text style={styles.component_button_text}>
                                        Tank ESP32
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.menu_button_containers}>
                            <TouchableOpacity style={styles.menu_button} onPress={handleInfo}>
                                <MaterialCommunityIcons name={'information'} color={'white'} size={16}/>
                                <Text style={styles.menu_button_text}>
                                    Information
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menu_button_containers} >
                            <TouchableOpacity style={styles.menu_button} onPress={handleLegal}>
                                <MaterialCommunityIcons name={'gavel'} color={'white'} size={16}/>
                                <Text style={styles.menu_button_text}>
                                    Legal
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menu_button_containers}>
                            <TouchableOpacity style={styles.menu_button} onPress={handleFeedback}>
                                <MaterialCommunityIcons name={'bug-outline'} color={'white'} size={16}/>
                                <Text style={styles.menu_button_text}>
                                    Feedback
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.menu_button_containers}>
                            <TouchableOpacity style={styles.menu_button} onPress={handleLogOut}>
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
        <PopUp states={statesPop} setStates={setStatesPop}/>
        <GeneralModal state={legalState} height={'75%'} width={'90%'} onClose={toggleLegal}>
            
                <View style={styles.bfar_container}>
                    <Image source={require('../assets/bfar.png')} style={styles.bfar_logo}/>
                </View>
                <View>
                    <Text style={styles.bfar_order}>
                        Fisheries Administrative Order No. 242, Series of 2012
                    </Text>
                </View>
                <View>
                    <Text style={styles.bfar_subject}>
                        Reinstating the ban on the export of elvers
                    </Text>
                </View>
                <ScrollView>
                    <Image source={require('../assets/bfar_1.png')} style={styles.bfar_paper}/>
                    <Image source={require('../assets/bfar_2.png')} style={styles.bfar_paper}/>
                </ScrollView>
                <TouchableOpacity onPress={toggleLegal} style={styles.bfar_button}>
                    <Text style={styles.bfar_button_text}>
                        OK, Got It!
                    </Text>
                </TouchableOpacity>
            
        </GeneralModal>
        </>
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
    },
    bfar_container: {
        backgroundColor: 'rgba(0, 122, 255, 0.9)',
        borderRadius: 10,
        margin: 10
    },
    bfar_logo: {
        height: 75,
        width: 100
    },
    bfar_order: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 10
    },
    bfar_subject: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    bfar_paper: {
        height: 400,
        width: 300
    },
    bfar_button: {
        margin: 5,
        backgroundColor: 'rgba(0, 122, 255, 0.9)',
        padding: 15,
        borderRadius: 10,
    },
    bfar_button_text: {
        color: 'white',
        fontWeight: 'bold'
    }
})