import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useState, useEffect } from 'react'

export default function Log({ navigation }){
    return (
        <View style={styles.log_container}>
            <View style={styles.log_items}>
                <FlatList
                    showsVerticalScrollIndicator={true}
                />
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