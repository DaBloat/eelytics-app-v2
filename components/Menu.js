import { Modal, View, Text, Touchable, TouchableOpacity } from 'react-native'

export default function Menu({state, setState}) {
    return (
        <Modal visible={state} transparent={false}>
            <View>
                <TouchableOpacity onPress={setState}>
                    <Text>
                        MODAL FOR THE MENU
                    </Text>
                </TouchableOpacity>
            </View>
        </Modal>
    )
}