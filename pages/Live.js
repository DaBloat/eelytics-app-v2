import { View, Text, StyleSheet} from 'react-native'
import { WebView } from 'react-native-webview'

export default function Live({ navigation }){
    const STREAMS = {
        'cam': 'https://unfauceted-irene-contextually.ngrok-free.dev/cam/',
        'processed': 'https://unfauceted-irene-contextually.ngrok-free.dev/processed/'
    }
    return (
        <View style={styles.live_container}>
            <Text>Live</Text>
            <View style={styles.web_view}>
                <WebView
                    source={{ uri: STREAMS.cam,
                            header: { 'ngrok-skip-browser-warning': 'true' }
                    }}
                    style={{ flex:1 }}
                    scrollEnabled={false}
                    mediaPlaybackRequiresUserAction={false}
                    allowsInlineMediaPlayback={true}
                />
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
    }
})