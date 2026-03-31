import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview'
import { useState, useEffect } from 'react';
import PopUp from '../components/PopUp';

export default function Live({ route }){
    const [currentStream, setCurrentStream] = useState('cam')
    const [logs, setLogs] = useState([])
    const [batchData, setBatchData] = useState([])
    const [modelData, setModelData] = useState({'size': '-', 'group':'-'})
    const [statesPop, setStatesPop ] = useState({
        visible: false,
        title: '',
        description: '',
        status: 'success'
    })
    const colorGroup = {"ELVER" : '#00D4FF',
                        "KUROKO" : '#00FF41',
                        'TABLE': '#FF3131',
                        'NONE': 'white',
                        '-': 'white'}

    const currColor = colorGroup[modelData.group]
    const { baseUrl } = route.params

    const STREAMS = {
        'cam': `${baseUrl}/cam/`,
        'processed': `${baseUrl}/processed/`
    }

    const injectedJavaScript = `
        function hideVideoControls() {
            const video = document.querySelector("video");
            if (video) {
            video.controls = false; // Hides the controls
            video.autoplay = true; // Ensure autoplay is set
            video.muted = true; // Mute is often required for autoplay
            video.playsInline = true; // For iOS inline playback
            video.style.objectFit = "cover"; // Ensures video fills the container
            video.play().catch(error => {
                // Autoplay might be blocked, but controls should still be hidden
                console.log("Autoplay prevented:", error);
            });
            }
        }
            
        hideVideoControls();
        const intervalId = setInterval(hideVideoControls, 500); // Check every 500ms
        setTimeout(() => clearInterval(intervalId), 5000); // Stop after 5 seconds
        true; 
        `;

    useEffect(() => {
        const fetchLiveData = async () => {
            const response = await fetch(`${baseUrl}/api/dt/live_eel`)
            const data = await response.json()

            setModelData(data)

            if ( data.size !== 0 && data.group !== 'NONE'){

                setBatchData(prevBatch => {
                    const isDuplicate = prevBatch[0] && 
                                        prevBatch[0].size === data.size &&
                                        prevBatch[0].group === data.group
                    
                    if (isDuplicate) {
                        return prevBatch
                    }

                    return [{ size: data.size, group: data.group }, ...prevBatch]
                })

                setLogs(prevLogs => {
                    const timestamp = new Date().toLocaleTimeString([], { hour12:false })
                    const newEntry = `${timestamp} - Detected : ${data.size} in as ${data.group}`

                    const lastEntry = prevLogs[0]?.split(' - ')[1]
                    const currentEntry = `Detected : ${data.size} in as ${data.group}`

                    if (lastEntry === currentEntry){
                        return prevLogs
                    }

                    return [newEntry, ...prevLogs].slice(0, 7)

                })
            }
        }

        const intervalId = setInterval(fetchLiveData, 100)

        return () => clearInterval(intervalId)
    }, [])

    const saveBatch = async() => {
        if ( logs.length > 0 ) {
            console.log('API Called')
            const response = await fetch(`${baseUrl}/api/eelsdb/save_batch`,
            {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify({
                    batch_logs: logs
                })
            })
            const data = await response.json()
            console.log(data)
            console.log(response.status)
        } else {
            setStatesPop({
            visible: true,
            title: 'Huh? Where?',
            description: 'There is Nothing to save in this batch!',
            status: 'warning'
        })
        }
    }

    const resetBatch = () => {
        setBatchData([])
        setLogs([])
        setModelData({'size': '-', 'group':'-'})
        setStatesPop({
            visible: true,
            title: 'Reset Successful',
            description: 'Recorded batch is successfully cleared!',
            status: 'success'
        })
        setTimeout(()=>{
                    setStatesPop({...statesPop, visible: false}
                    )}, 1500)
    }

    return (
        <View style={styles.live_container}>
            <View style={styles.web_view}>
                <WebView
                    source={{ uri: STREAMS[currentStream],
                            headers: { 'ngrok-skip-browser-warning': 'true' }
                    }}
                    style={{ flex:1 }}
                    scrollEnabled={true}
                    mediaPlaybackRequiresUserAction={false}
                    allowsInlineMediaPlayback={true}
                    injectedJavaScript={injectedJavaScript}
                />
                <View style={styles.no_touch_zone}>
                    <View style={styles.text_container}>
                    <Text style={styles.pos_text}>/{currentStream}</Text>
                </View>
                <View style={styles.button_container}>
                    <TouchableOpacity style={styles.button} onPress={() => {setCurrentStream(currentStream === 'cam' ? 'processed' : 'cam')}}>
                        <MaterialCommunityIcons name="camera-switch" color={'gray'} size={20}/>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            <View style={styles.info_container}>
                <View style={styles.size_container}>
                    <Text style={[styles.info_text, {color: currColor}]}>
                        {modelData.size === 0 ? "-" : modelData.size}
                    </Text>
                    <View style={styles.info_title_container}>
                        <Text style={styles.info_title_text}>
                            Size (inch)
                        </Text>
                    </View>
                </View>
                <View style={styles.group_container}>
                    <Text style={[styles.info_text, {color: currColor}]}>
                        {modelData.group === "NONE" ? "-" : modelData.group}
                    </Text>
                    <View style={styles.info_title_container}>
                        <Text style={styles.info_title_text}>
                            Group Size
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.log_container}>
                <View style={styles.log_summary_container}>
                    <Text style={styles.log_summary_text}>
                        Counter: {batchData.length}
                    </Text>
                    <Text style={styles.log_summary_text}>
                        Average Size: {batchData.length > 0 ? (batchData.reduce((sum, item) => sum + item.size, 0) / batchData.length).toFixed(2) : 0} in
                    </Text>
                </View>
                <View style={styles.log_text_container}>
                    {logs.map((log, index) => {
                        const [pref, group] = log.split(' as ')
                        return (
                        <Text key={index} style={styles.log_text}>
                            {`-> ${pref} as `}
                            <Text style={{ color: colorGroup[group]}}>
                                {group}
                            </Text>
                        </Text>
                        )
                    })}
                </View>
                <View style={styles.log_title_container}>
                    <Text style={styles.log_title}>
                        Batch Summary
                    </Text>
                </View>
            </View>
            <View style={styles.batch_button_container}>
                <TouchableOpacity style={[styles.batch_button, {backgroundColor: 'green'}]} onPress={saveBatch}>
                    <Text style={styles.batch_button_text}>
                        Save Batch
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.batch_button, {backgroundColor: 'red'}]} onPress={resetBatch}>
                    <Text style={styles.batch_button_text}>
                        Reset Batch
                    </Text>
                </TouchableOpacity>
            </View>

            <PopUp states={statesPop} setStates={setStatesPop}/>
        </View>
    )
}


const styles = StyleSheet.create({
    live_container: {
        flex: 1,
        alignItems: 'center'
    },
    web_view: {
        aspectRatio: 4/3,
        width: '85%',
        overflow: 'hidden',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'rgba(0, 122, 255, 1)',
        margin: 30
    },
    button_container: {
        position: 'absolute',
        flexDirection: 'row',
        top: 10,
        right: 10,
    },
    text_container: {
        position: 'absolute',
        flexDirection: 'row',
        bottom: 10,
        left: 10
    },
    no_touch_zone: {
         zIndex: 1, 
         backgroundColor: 'transparent', 
         position: 'absolute', 
         height: '100%', 
         width: '100%'
    },
    pos_text: {
        color: 'white',
        padding: 5,
        fontSize: 15,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'rgba(30, 30, 30, 1)',
        padding: 5,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: 'rgba(0, 122, 255, 1)'
    },
    info_container : {
        flexDirection: 'row',
        marginHorizontal: 35
    },
    size_container: {
        width: '50%',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        marginRight: 5,
        borderColor: 'rgba(0, 122, 255, 1)',
        backgroundColor: 'rgba(30, 30, 30, 0.8)'
    },
    group_container: {
        width: '50%',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: 5,
        borderColor: 'rgba(0, 122, 255, 1)',
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
    },
    info_title_container: {
        width: '65%',
        borderTopWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingBottom: 5,
        alignItems: 'center'
    },
    info_title_text: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        padding: 3,
    },
    info_text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        padding: 5
    },
    log_container: {
        margin: 20,
        height: "30%",
        backgroundColor: 'rgba(30, 30, 30, 0.8)',
        width: '85%',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: 'rgba(0, 122, 255, 1)',
        alignItems: 'center'
    },
    log_title_container: {
        width: '85%',
        borderTopWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        paddingBottom: 5,
        alignItems: 'center' 
    },
    log_text_container: {
        height: '65%',
        padding: 10
    },
    log_summary_container: {
        flexDirection: 'row',
        paddingTop: 15,
        width: '85%',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    log_summary_text: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 14,
        paddingHorizontal: 15,
        paddingBottom: 5
    },
    log_title: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        padding: 3,
    },
    log_text: {
        fontSize: 11,
        color: 'white',
        fontFamily: 'monospace',
    },
    batch_button_container: {
        flexDirection: 'row',
    },
    batch_button: {
        borderRadius: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    batch_button_text: {
        color: 'white',
        fontWeight: 'bold',
        padding: 5,
        fontSize: 14
    }
})