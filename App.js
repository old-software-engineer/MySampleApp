/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView from 'react-native-maps';

let id = 0;

export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state = {
      region: { 
                latitude: 28.7041,
                longitude: 77.1025,
                latitudeDelta: 0.1,
                longitudeDelta: 0.1,
              },
      markers: [],        
    };
  }

  onRegionChangeComplete(region) {
    this.setState({ region: region });
  }

  onMapPress(e) {
    this.setState({
      markers: [
        {
          coordinate: e.nativeEvent.coordinate,
          key: id++,
        },
      ],
    });
    console.log(this.state.markers)    
    this.getCoordinatesApiAsync() 
    console.log(this.state.markers)   
  }

  getCoordinatesApiAsync() {
    return fetch('https://idkjxuvoli.localtunnel.me/contacts/all_lat_longitude.json')
      .then((response) => response.json())
      .then((responseJson) => {
           responseJson.map(coordinate => (
              
           ))
      })
      .catch((error) => {
        console.error(error);
      });
  }
    
  render() {
    return (
      <View style ={styles.container}>
        <MapView
          style={styles.map}
          region={this.state.region}
          onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
          onPress={this.onMapPress.bind(this)}
        >
        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.key}
            coordinate={marker.coordinate}
          />
        ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    right:0,
    left:0,
    top:0,
    bottom:0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position:'absolute',
    right:0,
    left:0,
    top:0,
    bottom:0,
  },
});
