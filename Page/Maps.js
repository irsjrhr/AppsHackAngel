import { useState, useEffect } from 'react';
import { Alert, FlatList, ActivityIndicator, Image, Text, View, TextInput, TouchableOpacity} from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import Style from '../assets/Style';

const Maps = ( {navigation} ) => {






const [data, setData] = useState([]);
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
    set_input_search(text)
    
    if( text.length 
        > 0 ){

        fetchCities( text )
    }else{
        setData([]);
    }
}



let [ text_antar_btn, set_textAntarBtn ] = useState("Pilih lokasi pengantaran");
let [ text_jemput_btn , set_textJemputBtn ] = useState("Pilih lokasi penjemputan");

let [ displayJemput, set_displayJemput ] = useState("none");
let [ displayAntar, set_displayAntar ] = useState("none");

 let [input_search, set_input_search] = useState("");





 const [lokasi_jemput, setLokasi_jemput] = useState({
    latitude: -6.1815509,
    longitude: 106.8383853,
  });
const [lokasi_antar, setLokasi_antar] = useState({
    latitude: 0,
    longitude: 0,
  });



 async function isi_lokasi_jemput( item ) {
    // Parameter item berbentuk objek hasil kiriman json API

    
    // Alert.alert("Dijemput");
    // Alert.alert(item.name);

    var latitude = item.lat
    var long = item.long

    console.log("Dijemput");
    
    setLokasi_jemput( { latitude: latitude, longitude: long } );
    set_displayJemput("none");

    set_textJemputBtn( item.name );
   
 }

 async function isi_lokasi_antar( item ) {
    // Parameter item berbentuk objek hasil kiriman json API
    
    // Alert.alert("Diantar");
    // Alert.alert(item.name);

    var latitude = item.lat
    var long = item.long
    console.log("Diantar");


    setLokasi_jemput( { latitude: latitude, longitude: long } );
    set_displayAntar("none");
    set_textAntarBtn( item.name );




   
 }





const [loading, setLoading] = useState(true);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState({
    latitude: 0,
    longitude:0,
  });
  


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
          initialRegion={{
            latitude: origin.latitude,
            longitude: origin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={destination} title="Origin" />
          <Marker coordinate={lokasi_jemput} title="origin">
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
        <Text style={Style.text_box_header}> Mau kemana kamu hari ini ? </Text>
        {/* Maps Direction */}
        <View style={Style.maps_direction}>

          {/* Jemput */}
          <TouchableOpacity onPress={()=>set_displayJemput("block")}>
            <View style={Style.box_direct}>
                <Image
                style={Style.box_direct.img_icon_direct}
                source={require('../assets/circle_icon.png')}
                />
                <Text style={Style.box_direct.text_detail}> { text_jemput_btn } </Text>
            </View>
          </TouchableOpacity>

          {/* Antar */}
          <TouchableOpacity onPress={()=>set_displayAntar("block")}>
            <View style={Style.box_direct}>
                <Image
                style={[Style.box_direct.img_icon_direct, { width: 21, height: 28, marginRight: 28 }]}
                source={require('../assets/maps_icon.png')}
                />
                <Text style={Style.box_direct.text_detail}> { text_antar_btn } </Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Maps Direction */}
        <TouchableOpacity onPress={()=> navigation.navigate("Maps_ride")}>

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


    {/* Box Input Jemput */}
    <View style={[Style.box_popup, { height: "100%", paddingTop: 50, display: displayJemput }]}>
        <View style={{flexDirection:"row"}}>

            <Text style={[Style.text_box_header, { marginBottom:20 }]}> Jemput Dimana? </Text>
            <View style={{
                flex: 1,
                flexDirection:"row",
                justifyContent:"flex-end",
                // backgroundColor:"red"
            }}>
                <TouchableOpacity onPress={()=>{
                    set_displayJemput("none");
                }}>
                    <View>
                        <Text>Tutup</Text>
                    </View>

                </TouchableOpacity>

                
            </View>
        </View>

        <View style  ={ [Style.box_input, { borderWidth:2,borderRadius: 20,borderColor: "grey",marginBottom: 50}] } >
            <TextInput
                style={Style.box_input.input_place}
                placeholder="Mau di jemput dimana ?"
                onChangeText={handle_input_search}
                value={input_search}/>
                
        </View>
        

        <FlatList
            data={data}
            renderItem={({ item }) => (


                <TouchableOpacity onPress={()=>isi_lokasi_jemput( item )}>
                    <View style={{marginBottom: 30, flexDirection: "row"}}>

                        <Image
                            style={Style.icon_item}
                            source={require('../assets/maps_icon.png')}
                            >

                        </Image>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ marginBottom: 5, fontWeight:"bold" }}> { item.name } </Text>
                            <Text style={Style.alamat} > {item.display_name} </Text>
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
        <View style={{flexDirection:"row"}}>

            <Text style={[Style.text_box_header, { marginBottom:20 }]}> Antar Kemana ? </Text>
            <View style={{
                flex: 1,
                flexDirection:"row",
                justifyContent:"flex-end",
                // backgroundColor:"red"
            }}>
                <TouchableOpacity onPress={()=>{
                    set_displayAntar("none");
                }}>
                    <View>
                        <Text>Tutup</Text>
                    </View>

                </TouchableOpacity>

                
            </View>
        </View>

        <View style  ={ [Style.box_input, { borderWidth:2,borderRadius: 20,borderColor: "grey",marginBottom: 50}] } >
            <TextInput
                style={Style.box_input.input_place}
                placeholder="Mau di antar kemana ?"
                onChangeText={handle_input_search}
                value={input_search}/>
                
        </View>
        

        <FlatList
            data={data}
            renderItem={({ item }) => (


                <TouchableOpacity onPress={()=>isi_lokasi_antar( item )}>
                    <View style={{marginBottom: 30, flexDirection: "row"}}>

                        <Image
                            style={Style.icon_item}
                            source={require('../assets/maps_icon.png')}
                            >

                        </Image>
                        <View style={{ marginLeft: 10 }}>
                            <Text style={{ marginBottom: 5, fontWeight:"bold" }}> { item.name } </Text>
                            <Text style={Style.alamat} > {item.display_name} </Text>
                        </View>

                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
         />
    

      </View>
      {/* Box Input Tujuan */}





    </View>
  );
};


export default Maps;
