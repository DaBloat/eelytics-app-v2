import { View, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState, useEffect } from 'react'

export default function Log({ navigation, route }){
    const { baseUrl } = route.params
    const [ loading, setLoading ]= useState(false)
    const [ currentPage, setPage ] = useState(1)
    const [ logs, setLogs ] = useState([])

    const fetchLogs = async(page) => {
        setLoading(true)
        const response = await fetch(`${baseUrl}/api/eelsdb/get_logs?page=${page}&limit=50`)
        const data = await response.json()
        setLogs(data.results)
        setLoading(false)
    }

    useEffect(() => {
        fetchLogs(currentPage);
    }, [currentPage]);

    return (
        <View style={styles.log_container}>
            <View style={styles.log_items}>
                { loading ? 
                (<ActivityIndicator size="large"/>) :
                (<FlatList
                    data={logs}
                    showsVerticalScrollIndicator={true}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                            <View style={{ flexDirection: 'row' }}>
                                <Text>{item.date}</Text>1
                                <Text>{item.time}</Text>
                                <Text>{item.data_group}</Text>
                                <Text>{item.size}"</Text>
                            </View>
                        )}
                />)}
            </View>
            <View style={styles.button_row}>
                <TouchableOpacity>
                    <MaterialCommunityIcons name={'menu-left'} size={45} color={'gray'}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons name={'magnify'} size={45} color={'gray'}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <MaterialCommunityIcons name={'menu-right'} size={45} color={'gray'}/>
                </TouchableOpacity>                      
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    log_container: {
        margin: 30,
    },
    log_items: {
        padding: 25,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'rgba(0, 122, 255, 1)',
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        height: '90%'
    },
    button_row: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    }
})