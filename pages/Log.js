import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useState, useEffect } from 'react'

export default function Log({ navigation }){
    return (
        <View style={styles.log_container}>
            <View>
                <FlatList
                    showsVerticalScrollIndicator={true}
                />
            </View>
            <View>
                <TouchableOpacity>
                    <Text>
                        Search
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>
                        Back
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>
                        Forward
                    </Text>
                </TouchableOpacity>                      
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    log_container: {
        margin: 30,
        backgroundColor: 'red',
    },
})