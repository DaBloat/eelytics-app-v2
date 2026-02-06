import { View, Modal, TouchableOpacity, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'

export default function PopUp({ states, setStates }) {
    const imageEel = { 'success': {img: require('../assets/success.png'),
                                   color: '#4CAF50'}, 
                       'error':  {img: require('../assets/error.png'),
                                  color: '#FF5252'},
                       'warning': {img: require('../assets/warning.png'),
                                   color: '#FFC107'},
                       'loading': {img:require('../assets/loading.png'),
                                   color: 'rgba(0, 122, 255, 1)'}
    }

    const curr = imageEel[states.status]

    return (
        <Modal visible={states.visible} transparent={true} animationType='fade'>
            <View style={styles.bgModal}>
                <View style={[styles.containerModal, { borderColor: curr.color }]}>
                    <Image source={curr.img} style={styles.imgStatus}/>
                    <Text style={[styles.title, { color: curr.color }]}>{states.title}</Text>
                    <Text style={styles.subtitle}>{states.description}</Text>
                    {states.status === 'loading' || states.status === 'success'  ? (
                        <ActivityIndicator size="large" color={curr.color } />
                    ) : (
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={[styles.button, { backgroundColor: curr.color }]} onPress={() => setStates({...states, visible:false})}>
                                <Text style={styles.buttonText}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    bgModal: {
        backgroundColor: 'rgba(30, 30, 30, 0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        height:"100%"
    },
    containerModal: {
        backgroundColor: 'rgba(30, 30, 30, 1)',
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '90%',
        height: '30%'
    },
    buttonContainer: {
        alignItems: 'flex-end',
        width: '100%',
        paddingHorizontal: 10
    },
    button: {
        borderRadius: 10,
        width: '15%',
        alignItems: 'center'
    },
    buttonText: {
        color:'white',
        fontSize: 15,
        fontWeight: 'bold',
        padding: 5
    },
    imgStatus: {
        width: 95,
        height: 95,
        marginTop: 25
    },
    title: {
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 10
    },
    subtitle: {
        fontSize: 16,
        color: 'gray',
        marginBottom: 15
    }
})