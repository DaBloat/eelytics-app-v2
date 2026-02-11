import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview'
import { useState } from 'react';

export default function Live({ navigation }){
    const [currentStream, setCurrentStream] = useState('cam')
    const STREAMS = {
        'cam': 'https://unfauceted-irene-contextually.ngrok-free.dev/cam/',
        'processed': 'https://unfauceted-irene-contextually.ngrok-free.dev/processed/'
    }


    const INJECT_JS = `
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
                            }`;

    return (
        <View style={styles.live_container}>
            <View style={styles.web_view}>
                <WebView
                    source={{ uri: STREAMS[currentStream],
                            header: { 'ngrok-skip-browser-warning': 'true' }
                    }}
                    style={{ flex:1 }}
                    scrollEnabled={true}
                    mediaPlaybackRequiresUserAction={false}
                    allowsInlineMediaPlayback={true}
                    injectedJavaScript={INJECT_JS}
                />
                <View style={{ zIndex: 1, backgroundColor: 'transparent', position: 'absolute', height: '100%', width: '100%'}}>
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
        bottom: 10,
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
    }
})