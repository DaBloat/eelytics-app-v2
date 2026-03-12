import { View, Text, StyleSheet } from 'react-native'

export default function Dashboard({ navigation }){
    return (
        <View style={styles.dashboard_container}>
            <Text>Dashboard</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    dashboard_container: {
        margin: 30,
        backgroundColor: 'red'
    }
})