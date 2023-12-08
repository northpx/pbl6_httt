import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import { point } from '@turf/helpers';
import destination from '@turf/destination';
import * as Location from 'expo-location';

export default class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      south: null,
      west: null,
      north: null,
      east: null,
      latitude: 35.681236,
      longitude: 139.767125,
    };
  }

  updateState(location) {
    this.setState({
      ...this.state,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  }

  async componentDidMount() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      this.updateState(location);
    } catch (error) {
      console.log(error);
    }
  }

  onRegionChangeComplete = (region) => {
    const center = point([region.longitude, region.latitude]);

    const verticalMeter = (111 * region.latitudeDelta) / 2;
    const horizontalMeter = (111 * region.longitudeDelta) / 2;
    const options = { units: 'kilometers' };
    const south = destination(center, verticalMeter, 180, options);
    const west = destination(center, horizontalMeter, -90, options);
    const north = destination(center, verticalMeter, 0, options);
    const east = destination(center, horizontalMeter, 90, options);
    this.setState({
      south: south.geometry.coordinates[1],
      west: west.geometry.coordinates[0],
      north: north.geometry.coordinates[1],
      east: east.geometry.coordinates[0],
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  fetchToilet = async () => {
    const reverseGeocodeLocation = await Location.reverseGeocodeAsync({
      latitude: this.state.latitude,
      longitude: this.state.longitude,
    });

    console.log(reverseGeocodeLocation);
  };
  render() {
    return (
      <View style={styles.container}>
        <MapView
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.mapView}
          showsUserLocation
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          {this.state.elements.map((element) => {
            let title = '保育園';
            if (element.tags['name'] !== undefined) {
              title = element.tags['name'];
            }
            return (
              <MapView.Marker
                coordinate={{
                  latitude: element.lat,
                  longitude: element.lon,
                }}
                title={title}
                key={'id_' + element.id}
              />
            );
          })}
        </MapView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.fetchToilet()}
            style={styles.button}
          >
            <Text style={styles.buttonItem}>保育園取得</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  mapView: {
    ...StyleSheet.absoluteFillObject,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },

  button: {
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,235,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },

  buttonItem: {
    textAlign: 'center',
  },
});
