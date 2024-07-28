import { useState, useEffect } from 'react';
import { Alert, FlatList, ActivityIndicator, Image, Text, View, TextInput, TouchableOpacity} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Style from '../assets/Style';

const Maps = ({ navigation }) => {
  const [data, setData] = useState([]);

  const [ display_content_input, set_display_content_input ] = useState("block");
  const [ display_content_ride, set_display_content_ride ] = useState("none");


  const fetchCities = async (query) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&countrycodes=ID&format=json`);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  function handle_input_search(text) {
    set_input_search(text);
    if (text.length > 0) {
      fetchCities(text);
    } else {
      setData([]);
    }
  }

  let [text_antar_btn, set_textAntarBtn] = useState("Pilih lokasi pengantaran");
  let [text_jemput_btn, set_textJemputBtn] = useState("Pilih lokasi penjemputan");
  let [displayJemput, set_displayJemput] = useState("none");
  let [displayAntar, set_displayAntar] = useState("none");
  let [input_search, set_input_search] = useState("");

  const [lokasi_jemput, setLokasi_jemput] = useState({
    latitude: -6.1761924,
    longitude: 106.6382161,
  });
  const [lokasi_antar, setLokasi_antar] = useState({
    latitude: -6.1902326,
    longitude: 106.64108465161493,
  });
  const [region, setRegion] = useState({
    latitude: -6.1761924,
    longitude: 106.6382161,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  async function isi_lokasi_jemput(item) {
    
    var latitude = parseFloat(item.lat);
    var long = parseFloat(item.lon);


    console.log( latitude );
    console.log( long );

    setLokasi_jemput({ latitude: latitude, longitude: long });
    setRegion({ ...region, latitude: latitude, longitude: long });
    set_displayJemput("none");
    set_textJemputBtn(item.name);

    if (lokasi_antar.latitude !== 0 && lokasi_antar.longitude !== 0) {
      updateRoute(latitude, long, lokasi_antar.latitude, lokasi_antar.longitude);
    }
  }

  async function isi_lokasi_antar(item) {
    var latitude = parseFloat(item.lat);
    var long = parseFloat(item.lon);


    console.log( latitude );
    console.log( long );

    setLokasi_antar({ latitude: latitude, longitude: long });
    setRegion({ ...region, latitude: latitude, longitude: long });
    set_displayAntar("none");
    set_textAntarBtn(item.name);



    if (lokasi_antar.latitude !== 0 && lokasi_antar.longitude !== 0) {
      updateRoute(latitude, long, lokasi_antar.latitude, lokasi_antar.longitude);
    }
  }

  const [loading, setLoading] = useState(true);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [origin, setOrigin] = useState(null);

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
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });

      // setLokasi_jemput( location.coords.latitude, location.coords.longitude )


      updateRoute(location.coords.latitude, location.coords.longitude, lokasi_antar.latitude, lokasi_antar.longitude);
      setLoading(false);
    })();
  }, [lokasi_antar]);

  const updateRoute = async (lat1, lon1, lat2, lon2) => {
    const routeCoords = await getRouteFromGraphHopper(
      { latitude: lat1, longitude: lon1 },
      { latitude: lat2, longitude: lon2 }
    );
    console.log('Route Coordinates:', routeCoords);
    setRouteCoordinates(routeCoords);
  };

  const getRouteFromGraphHopper = async (origin, destination) => {
    const apiKey = '53a1de2a-2ed2-4687-8795-145746a21c1b'; // Ganti dengan API key Anda
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
          region={region}
        >
          <Marker coordinate={lokasi_antar} title="Destination" />
          <Marker coordinate={lokasi_jemput} title="Origin">
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
      <View style={[Style.box_popup]}>


        {/* Content input */}
        <View style={ { display: display_content_input } }>
          <Text style={Style.text_box_header}> Mau kemana kamu hari ini? </Text>
          {/* Maps Direction */}
          <View style={Style.maps_direction}>
            {/* Jemput */}
            <TouchableOpacity onPress={() => set_displayJemput("block")}>
              <View style={Style.box_direct}>
                <Image
                  style={Style.box_direct.img_icon_direct}
                  source={require('../assets/circle_icon.png')}
                />
                <Text style={Style.box_direct.text_detail}> {text_jemput_btn} </Text>
              </View>
            </TouchableOpacity>

            {/* Antar */}
            <TouchableOpacity onPress={() => set_displayAntar("block")}>
              <View style={Style.box_direct}>
                <Image
                  style={[Style.box_direct.img_icon_direct, { width: 21, height: 28, marginRight: 28 }]}
                  source={require('../assets/maps_icon.png')}
                />
                <Text style={Style.box_direct.text_detail}> {text_antar_btn} </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* Maps Direction */}

          <TouchableOpacity onPress={() => { 
            set_display_content_ride("block") 
            set_display_content_input("none") 
            } }>
            <View style={Style.btn_order}>
              <Text style={Style.btn_order.text_btn}> Cari Driver </Text>
              <View style={Style.btn_order.box_icon}>
                <Image
                  style={Style.btn_order.icon_btn}
                  source={require('../assets/icon_arrow_order.png')}
                />
              </View>
            </View>
          </TouchableOpacity>
            
        </View>
        {/* Content input */}


        {/* Content Ride */}
        <View style={ { display: display_content_ride } }>
          <Text style={Style.text_box_header}> Ride </Text>
          {/* Maps Direction */}
          <View style={[Style.maps_direction, {padding:0}]}>
              <View style={[Style.box_direct, {padding: 0, borderWidth:0}]}>
                <Image
                  style={[Style.box_direct.img_icon_direct, { width: 86, height:57 }]}
                  source={require('../assets/male_ride.png')}
                />
                <View>
                  <Text style={Style.box_direct.text_detail}> Pak Hasan </Text>
                  <Text style={[Style.box_direct.text_detail, {marginTop:10, color: "grey"}]}> B 76546 BZ </Text>
                    
                </View>

                <View style={{flex:1,justifyContent:"flex-end",flexDirection:"row", paddingTop:0}}>
                  <Text style={Style.box_direct.text_detail}> Rp 70.000 </Text>
                    
                </View>

              </View>
          
          </View>
          {/* Maps Direction */}
          <TouchableOpacity onPress={() => navigation.navigate("Driver_wait") }>
            <View style={Style.btn_order}>
              <Text style={Style.btn_order.text_btn}> BOOK NOW </Text>
              <View style={Style.btn_order.box_icon}>
                <Image
                  style={Style.btn_order.icon_btn}
                  source={require('../assets/icon_arrow_order.png')}
                />
              </View>
            </View>
          </TouchableOpacity>
            
        </View>
        {/* Content Ride */}




      </View>
      {/* Box Popup */}












      {/* Box Input Jemput */}
      <View style={[Style.box_popup, { height: "100%", paddingTop: 50, display: displayJemput }]}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[Style.text_box_header, { marginBottom: 20 }]}> Jemput Dimana? </Text>
          <View style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}>
            <TouchableOpacity onPress={() => set_displayJemput("none")}>
              <View>
                <Text>Tutup</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[Style.box_input, { borderWidth: 2, borderRadius: 20, borderColor: "grey", marginBottom: 50 }]}>
          <TextInput
            style={Style.box_input.input_place}
            placeholder="Mau di jemput dimana?"
            onChangeText={handle_input_search}
            value={input_search}
          />
        </View>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => isi_lokasi_jemput(item)}>
              <View style={{ marginBottom: 30, flexDirection: "row" }}>
                <Image
                  style={Style.icon_item}
                  source={require('../assets/maps_icon.png')}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ marginBottom: 5, fontWeight: "bold" }}> {item.name} </Text>
                  <Text style={Style.alamat}> {item.display_name} </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      {/* Box Input Jemput */}

      {/* Box Input Antar */}
      <View style={[Style.box_popup, { height: "100%", paddingTop: 50, display: displayAntar }]}>
        <View style={{ flexDirection: "row" }}>
          <Text style={[Style.text_box_header, { marginBottom: 20 }]}> Antar Kemana? </Text>
          <View style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}>
            <TouchableOpacity onPress={() => set_displayAntar("none")}>
              <View>
                <Text>Tutup</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[Style.box_input, { borderWidth: 2, borderRadius: 20, borderColor: "grey", marginBottom: 50 }]}>
          <TextInput
            style={Style.box_input.input_place}
            placeholder="Mau di antar kemana?"
            onChangeText={handle_input_search}
            value={input_search}
          />
        </View>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => isi_lokasi_antar(item)}>
              <View style={{ marginBottom: 30, flexDirection: "row" }}>
                <Image
                  style={Style.icon_item}
                  source={require('../assets/maps_icon.png')}
                />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ marginBottom: 5, fontWeight: "bold" }}> {item.name} </Text>
                  <Text style={Style.alamat}> {item.display_name} </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      {/* Box Input Antar */}
    </View>
  );
};

export default Maps;
