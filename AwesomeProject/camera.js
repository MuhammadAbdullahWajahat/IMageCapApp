import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Button } from 'react-native-elements';
import PopupDialog, {ScaleAnimation,  DialogTitle} from 'react-native-popup-dialog';

const scaleAnimation = new ScaleAnimation();



export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    ratio: '16:9',
    ratios: [],
    url: '',
    loadingAnimation: false
  };

  async componentWillMount() {

    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

   getRatios = async function() {
    const ratios = await this.camera.getSupportedRatios();
    return ratios;
  };

  setRatio(ratio) {
    this.setState({
      ratio,
    });
  }

 snap = async () => {
  if (this.camera) {
    let photo = await this.camera.takePictureAsync(); 
    console.log(photo)
    this.setState({url: photo})
    // setInterval(() => {
    //   this.setState({
    //     loadingAnimation: !this.state.loadingAnimation
    //   });
    // }, 5000);
  }
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{
          flex: 1,
        }}  ref={ref => { this.camera = ref; }} type={this.state.type} ratio={this.state.ratio}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
                justifyContent: 'center'

              }}>
              <View style={{ alignSelf: 'flex-end'}}>
              <Button 
                 onPress={ () => {
                  this.snap();
                  this.popupDialog.show();

                 }}
                  raised
                  title='Take Picture'
                  backgroundColor='#397af8'
                style={{ alignSelf: 'flex-end', alignItems: 'center',}}
              />
              </View>

               <PopupDialog
                ref={(popupDialog) => { this.popupDialog = popupDialog; }}
                dialogAnimation={scaleAnimation}
                // dialogTitle={<DialogTitle title="Popup Dialog - Scale Animation" />}
                width = {0.75}

              >
                <View>
                  <Text>{this.state.url.uri}</Text>
                </View>
              </PopupDialog>
            </View>
          </Camera>
        </View>
      );
    }
  }
}