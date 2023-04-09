import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native';

export default function PredictionPage(
    {likelyMelanoma, setReceivedResponse,setPreviewVisible,setStartCamera}
    :{likelyMelanoma:boolean|null, setReceivedResponse:any,setPreviewVisible:any,setStartCamera:any}
    ) {

    const reset_all = () => {
        setReceivedResponse(false);
        setPreviewVisible(false);
        setStartCamera(false);
    }

    return (
        <View style={styles.container}>
            {likelyMelanoma ? <Text>Look for a doctor</Text> : <Text>Everything is fine</Text>}
            <TouchableOpacity
                onPress={reset_all}
                style={{
                    width: 130,
                    borderRadius: 4,
                    backgroundColor: '#14274e',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40
                }}
            ><Text>Reset</Text></TouchableOpacity>
        </View>
)}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })