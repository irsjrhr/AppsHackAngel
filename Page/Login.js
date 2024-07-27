

import {useState} from 'react'
import { TextInput, Text, View, Button, Image, TouchableOpacity  } from 'react-native';
import Style from '../assets/Style'



var Login = ({ navigation }) => {

    let [ user, setUser ] = useState("");
    let [ password, setPassword ] = useState("");


    return (
        
        <View style={ { flexDirection: "column", flex: 1 } }>   

            <View style={ Style.bg_container }>
                <Image 
                style={{  }}
                source={require('../assets/bg_login.png')} // Path ke gambar lokal
                >
                    
                </Image>
            </View>

            <View style={ Style.container_login }> 


                
                <Text style ={ Style.login_header }> Log In </Text>


                <View style={ Style.box_img  }>

                    <Image 
                    style={Style.img_icon }
                    source={require('../assets/motor.png')} // Path ke gambar lokal
                    >
                        
                    </Image>

                </View>
                
                
                <View style={ Style.box_login }>
                    <View style  ={ Style.box_input } >
                        <TextInput
                        style={Style.box_input.input_place}
                        placeholder="Email Or Phone"
                        onChangeText={setUser}
                        value={user}/>
                    </View>
                    <View style  ={ Style.box_input } >
                        <TextInput
                        style={Style.box_input.input_place}
                        placeholder="Password"
                        onChangeText={setPassword}
                        value={password}/>
                    </View>
                    <TouchableOpacity onPress={()=> navigation.navigate("Maps")}>
                        <View style  ={ [ Style.box_input, { backgroundColor:"limegreen" } ] } >
                            <Text style={  { textAlign:"center", fontSize: 19, color:"white"} }>
                                Login
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>


                <View style={ Style.box_badge }>
                    <Text style={ Style.text_badge }> Connected With  </Text> 
                </View>

                <View style={ [Style.box_img, { marginTop: 30 }]  }>

                    <Image 
                    style={[Style.img_icon, { width: 50, height: 50 }] }
                    source={require('../assets/google.png')} // Path ke gambar lokal
                    >
                        
                    </Image>

                </View>
            </View>



        </View>
    
    )

}


export default Login