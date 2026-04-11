import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'


export default function Information({ toggleInfo }) {
    return(
        <>
        <ScrollView>
            <View style={styles.info_container}>
                <Image source={require('../assets/logo.png')} style={styles.logo}/>
                <Text style={styles.title}>
                    "Sizing Made Simple."
                </Text>
                <Text style={styles.description}>
                    <Text style={styles.bold}>Eelytics</Text> is an innovative computer vision solution developed by <Text style={styles.bold}>Computer Engineering students from 
                    Techological Institute of the Philippines, Quezon City</Text>. Our mission is to <Text style={styles.bold}>modernize the local aquaculture industry</Text> by transitioning from 
                    traditional, labor-intensive measurement methods to an automated, high-precision system.
                    <Text style={styles.bold}> Specifically designed to meet the rigorous standards of BFAR FAO No. 242</Text>, Eelytics utilizes 
                    advanced image processing to <Text style={styles.bold}>ensure the accurate sizing of live eels</Text>. By reducing manual handling, 
                    we prioritize both operational efficiency and the welfare of the livestock, ensuring that compliance 
                    is both seamless and ethical.
                </Text>
                <Text style={styles.title}>
                    Creators
                </Text>
                <View style={styles.per_character}>
                    <View style={styles.character_border}>
                        <Image source={require('../assets/cris.png')} style={styles.character}/>
                    </View>
                    <View style={styles.character_info}>
                        <Text style={styles.name_character}>
                            Cris Adrian Badiango
                        </Text>
                        <Text style={styles.description_character}>
                            Railway Engineering
                        </Text>
                    </View>
                </View>
                <View style={styles.per_character}>
                    <View style={styles.character_info}>
                        <Text style={styles.name_character}>
                            Tracey Dee Bringuela
                        </Text>
                        <Text style={styles.description_character}>
                            System Administration
                        </Text>
                    </View>
                    <View style={styles.character_border}>
                        <Image source={require('../assets/tracey.png')} style={styles.character}/>
                    </View>
                </View>
                <View style={styles.per_character}>
                    <View style={styles.character_border}>
                        <Image source={require('../assets/nhaz.png')} style={styles.character}/>
                    </View>
                    <View style={styles.character_info}>
                        <Text style={styles.name_character}>
                            Nhazarin Bryant Ilumin
                        </Text>
                        <Text style={styles.description_character}>
                            Cyber Physical Systems
                        </Text>
                    </View>
                </View>
                <View style={styles.per_character}>
                    <View style={styles.character_info}>
                        <Text style={styles.name_character}>
                            Angelo Carl Olivera
                        </Text>
                        <Text style={styles.description_character}>
                            System Administration
                        </Text>
                    </View>
                    <View style={styles.character_border}>
                        <Image source={require('../assets/gelo.png')} style={styles.character}/>
                    </View>
                </View>
                <View style={styles.per_character}>
                    <View style={styles.character_border}>
                        <Image source={require('../assets/kurt.png')} style={styles.character}/>
                    </View>
                    <View style={styles.character_info}>
                        <Text style={styles.name_character}>
                            Kurt Russel Villamor
                        </Text>
                        <Text style={styles.description_character}>
                            Data Science
                        </Text>
                    </View>
                </View>
                <View style={styles.character_border}>
                        <Image source={require('../assets/engr_robin.png')} style={styles.character}/>
                </View>
                <View style={styles.character_info}>
                        <Text style={styles.name_character}>
                            Engr. Robin Valenzuela
                        </Text>
                        <Text style={styles.description_character}>
                            Adviser
                        </Text>
                </View>
            </View>
        </ScrollView>
        <TouchableOpacity onPress={toggleInfo} style={styles.gotit_button}>
                <Text style={styles.gotit_button_text}>
                    OK, Got It!
                </Text>
        </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    gotit_button: {
        margin: 5,
        backgroundColor: 'rgba(0, 122, 255, 0.9)',
        padding: 15,
        borderRadius: 10,
    },
    gotit_button_text: {
        color: 'white',
        fontWeight: 'bold'
    },
    info_container: {
        marginVertical: 15,
        marginHorizontal: 25,
        alignItems: 'center',
    },
    logo: {
        height: 150,
        width: 150
    },
    title: {
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 10,
        fontSize: 20
    },
    description: {
        textAlign: 'justify',
        color: 'gray',
        marginBottom: 10
    },
    bold: {
        color: 'white',
        fontWeight: 'bold'
    },
    character: {
        height: 100,
        width: 100
    },
    character_border: {
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 0.9)',
        borderRadius: 50,
        overflow: 'hidden',
    },
    per_character: {
        flexDirection: 'row',
        marginBottom: 15
    },
    character_info: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    name_character: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    },
    description_character: {
        color: 'grey'
    }
})