import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import MapViewDirections from 'react-native-maps-directions';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';


export default function Directions({ route, ...props }) {
  const { id, restaurant } = route.params;
  const destination = { latitude: restaurant.newRestaurantAddress.coordinates.lat, longitude: restaurant.newRestaurantAddress.coordinates.lng };
  const [startAddress, setStartAddress] = useState(destination)

  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
                        placeholder="Your current Location"
                        query={{key: "AIzaSyBo_rPeEwPDVE_a0dib_IuTGivH43TSvAE", language: 'en'}}
                        onPress={(data, details ) => {
                            setStartAddress({ latitude: details.geometry.location.lat, longitude: details.geometry.location.lng })
                        }}
                        fetchDetails={true}
                        onFail={error => console.log(error)}
                        onNotFound={() => console.log('no results')}
                        listEmptyComponent={() => (
                        <View style={{flex: 1}}>
                            <Text>No results were found</Text>
                        </View>
                        )}
                    />

      <View style={styles.container}>
      <MapView style={StyleSheet.absoluteFill}
         initialRegion={{
      latitude: restaurant.newRestaurantAddress.coordinates.lat,
      longitude: restaurant.newRestaurantAddress.coordinates.lng,
      latitudeDelta: 0.0922,  
      longitudeDelta: 0.0421,
    }}>
      <MapViewDirections
    origin={startAddress}
    destination={destination}
    apikey={'AIzaSyA5PBfjz_EW-GhPIBwPYdyQzYds1tH9_bM'}
    onError={(msg) => console.log('directions error', msg)}
    strokeWidth={4}
    strokeColor="black"
    mode='DRIVING'
  />
    </MapView>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});