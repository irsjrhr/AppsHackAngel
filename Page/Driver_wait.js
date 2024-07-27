

import {useState} from 'react'
import { TextInput, Text, View, Button, Image, TouchableOpacity  } from 'react-native';
import Style from '../assets/Style'



var Driver_wait = ({ navigation }) => {

    let [ user, setUser ] = useState("");
    let [ password, setPassword ] = useState("");


    return (
        
        <View style={ { flexDirection: "column", flex: 1 } }>   

        
            <View style={ [Style.container_login, {paddingTop:50}] }> 


                
                <Text style ={ [Style.login_header, { color:"black" }] }> Driver Kamu Dalam Perjalanan </Text>


                <View style={ Style.box_img  }>

                    <Image 
                    style={Style.img_icon }
                    source={require('../assets/motor.png')} // Path ke gambar lokal
                    >
                        
                    </Image>

                </View>

                <TouchableOpacity onPress={()=> navigation.navigate("Login")}>

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



        </View>
    
    )

}


export default Driver_wait