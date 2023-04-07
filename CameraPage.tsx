import {Camera, CameraType, FlashMode} from 'expo-camera'
import { useState } from 'react';
import {Text, View, TouchableOpacity} from 'react-native'
let camera: Camera

export default function CameraPage({setPreviewVisible , setCapturedImage}:{setPreviewVisible:any, setCapturedImage:any}) {
    const [flashMode, setFlashMode] = useState(FlashMode.off)

    const __handleFlashMode = () => {
        if (flashMode === 'on') {
          setFlashMode(FlashMode.off)
        } else if (flashMode === 'off') {
          setFlashMode(FlashMode.on)
        } else {
          setFlashMode(FlashMode.auto)
        }
    }
    
    const __takePicture = async () => {
        const photo: any = await camera.takePictureAsync()
        console.log(photo)
        setPreviewVisible(true)
        //setStartCamera(false)
        setCapturedImage(photo)
    }

    return (
            <Camera
              type={CameraType.back}
              flashMode={flashMode}
              style={{flex: 1}}
              ref={(r) => {
                camera = r
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    left: '5%',
                    top: '10%',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <TouchableOpacity
                    onPress={__handleFlashMode}
                    style={{
                      backgroundColor: flashMode === 'off' ? '#000' : '#fff',
                      height: 25,
                      width: 25
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20
                      }}
                    >
                      ⚡️
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={__takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
)}
