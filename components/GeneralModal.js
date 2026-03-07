import { Modal, View, StyleSheet } from "react-native";

export default function GeneralModal({ state, children, onClose, height, width}){
    return (
    <Modal visible={state} transparent={true} animationType="fade" onRequestClose={onClose}>
        <View style={styles.bgModal}>
            <View style={[styles.containerModal, {height: height, width: width}]}>
                {children}
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
        flex: 1
    },
    containerModal: {
        backgroundColor: 'rgba(30, 30, 30, 1)',
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderColor: 'rgba(0, 122, 255, 1)'
    },
})