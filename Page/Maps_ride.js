import { useState, useEffect } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Style from '../assets/Style';

const Maps_ride = ( {navigation} ) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState({
    latitude: -6.9175,
    longitude: 107.6191,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const routeCoords = await getRouteFromGraphHopper(
        { latitude: location.coords.latitude, longitude: location.coords.longitude },
        destination
      );
      setRouteCoordinates(routeCoords);
      setLoading(false);
    })();
  }, [destination]);

  const getRouteFromGraphHopper = async (origin, destination) => {
    const apiKey = 'YOUR_GRAPHHOPPER_API_KEY'; // Ganti dengan API key Anda
    const url = `https://graphhopper.com/api/1/route?point=${origin.latitude},${origin.longitude}&point=${destination.latitude},${destination.longitude}&vehicle=car&key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.paths && data.paths.length > 0) {
      const points = data.paths[0].points.coordinates;
      const coords = points.map(point => {
        return {
          latitude: point[1],
          longitude: point[0],
        };
      });
      return coords;
    }
    return [];
  };

  if (loading || !origin) {
    return (
      <View style={Style.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flexDirection: "column", flex: 1 }}>
      {/* Maps */}
      <View style={Style.maps_frame}>
        <MapView
          style={Style.map}
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={destination} title="Origin" />
          <Marker coordinate={origin} title="origin">
                <Image
                source={require('../assets/motor.png')} // Ganti dengan path gambar Anda
                style={{ width: 40, height: 40 }} // Ganti warna dengan tintColor
            />
          </Marker>
          <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="blue" />
        </MapView>
      </View>
      {/* Maps */}

      {/* Box Popup */}
      <View style={Style.box_popup}>
        <Text style={Style.text_box_header}> Choose your ride </Text>
        
        {/* Maps Direction */}
        <View style={Style.maps_direction}>
        
          <View style={Style.box_direct}>
          
          </View>


        </View>
        {/* Maps Direction */}

       <TouchableOpacity onPress={()=>navigation.navigate("Driver_wait")}>
          <View style={Style.btn_order}>
            <Text style={Style.btn_order.text_btn}> Next </Text>
            <View style={Style.btn_order.box_icon}>
              <Image
                style={Style.btn_order.icon_btn}
                source={require('../assets/icon_arrow_order.png')}
              />
            </View>
          </View>
       </TouchableOpacity>
      </View>
      {/* Box Popup */}
    </View>
  );
};

export default Maps_ride;
