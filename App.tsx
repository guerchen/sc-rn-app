import {StatusBar} from 'expo-status-bar'
import { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data';
import * as FileSystem from 'expo-file-system';
import {StyleSheet, Text, View, TouchableOpacity, Alert} from 'react-native'
import {Camera} from 'expo-camera'
import CameraPage from './CameraPage';
import CameraPreview from './CameraPreview';
import LoadingScreen from './LoadingScreen';

export default function App() {
  const [startCamera, setStartCamera] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState<any>(null)
  const [waitingResponse, setWaitingResponse] = useState(false)
  const [likelyMelanoma, setLikelyMelanoma] = useState(null)

  const __startCamera = async () => {
    const {status} = await Camera.requestCameraPermissionsAsync()
    console.log(status)
    if (status === 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert('Access denied')
    }
  }

  const payloadBuilder = async () => {
    const base64 = await FileSystem.readAsStringAsync(capturedImage.uri, { encoding: 'base64' });
    let data = JSON.stringify({
      "image": base64
    })
    return data
  }

  const __savePhoto = async () => {
    setWaitingResponse(true)

    const headers = {'Authorization': 'pessach'};
    const payload = await payloadBuilder();

    await axios.post('https://sc-detector-api-jpezawplgq-rj.a.run.app/predict', payload ,{headers})
    .then((response) => {
      console.log(response);
      setLikelyMelanoma(response.data.melanoma);
      setWaitingResponse(false);
    })
    .catch((e)=>{
      console.log(e);
      setWaitingResponse(false);
    })
  }
  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  return (
    <View style={styles.container}>
      {startCamera ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        > 
        {waitingResponse ? <LoadingScreen/> :
          previewVisible && capturedImage ? (
            <CameraPreview photo={capturedImage} savePhoto={__savePhoto} retakePicture={__retakePicture} />
          ) : (
            <CameraPage setPreviewVisible={setPreviewVisible} setCapturedImage={setCapturedImage} />
          )
        }

        </View>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <TouchableOpacity
            onPress={__startCamera}
            style={{
              width: 130,
              borderRadius: 4,
              backgroundColor: '#14274e',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})


