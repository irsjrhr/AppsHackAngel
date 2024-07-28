import React from 'react';
import { StyleSheet } from "react-native"

let Style = StyleSheet.create({

    // Login
    bg_container : {
        flex: 1, 
        position: "absolute",
        width: "100%", 
        height: "100%", 
        top:0,
        left:0, 
        backgroundColor: "red",
        flex: 1
    },
    container_login:{
        position: "absolute",
        width: "100%",
        height:"100%",
        left: 0,    
        padding: 20,
    },  
    login_header:{
        fontSize: 50,
        color: "white",
        textAlign: "left",
        // marginLeft: -10,
    },
    login_subHeader:{
        fontSize: 20,
        color: "white",
        textAlign: "left",
        // marginLeft: -10,
        marginBottom:40,
        marginTop:40,
        lineHeight:30
        
    },
    box_login:{


    },

    box_img:{
        flexDirection:"row", 
        justifyContent:"center",
        marginBottom: 50,
        marginTop: 50
    },
    img_icon:{
        textAlign: "center",
        width: 230,
        height: 230
    },
    box_input:{
        backgroundColor: "#fff",
        // borderBottomColor: "black",
        padding: 20,
        paddingLeft: 15,
        marginBottom: 20,
        borderRadius: 10,
        input_place : {
            fontSize: 17,
        }
        
        
    },

    box_badge: {
        // backgroundColor: "rgba(0,0,0,0.4)",
        // paddingBottom: 10,
        // paddingTop: 10,
        // textAlign: "center",
        // borderRadius: 20
  
    },
    text_badge:{
        textAlign:"center",
        color: "white",
        fontSize: 20,
        // fontWeight:"bold"
    },
    


    // Maps
    maps_frame:{
        flex:1,
        // backgroundColor: "red"
    },
    map:{
        flex: 1
    },
    
    

    // Popup
    box_popup:{
        position: "absolute",
        width: "100%",
        height: "auto",
        bottom: 0,
        left: 0,
        backgroundColor: "#fff",
        borderRadius: 4,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,

    },
    text_box_header:{
        marginBottom: 50,
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "poppins"
    },
    maps_direction:{
        paddingLeft: 10,
        marginBottom: 50
    },
    box_direct:{
        flexDirection: "row",
        marginBottom: 50,
        padding: 20,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 30,
        img_icon_direct:{
            width: 28,
            height: 28,
            marginRight: 20,
        },
        text_detail:{
            fontSize: 17
        },
        borderWidth: 2,
        borderColor: "#f5f5f5f5"

    },
    btn_order:{
        flexDirection: "row",
        backgroundColor:"black",
        padding: 2,
        borderRadius:40,
        paddingLeft: 20,
        paddingRight: 5,
        text_btn:{
            color: "white",
            marginTop: 10,
            fontSize: 17
        },
        box_icon:{
            flex: 1,
            flexDirection: "row",
            // backgroundColor: "red",
            justifyContent: "flex-end"
        },
        icon_btn:{
            width: 50,
            height: 50
        },
        item_maps:{
            // flexDirection: "row",
            margin:100

        },
        icon_item:{
            width: 28,
            height:28
        },
        detail_item:{
            // flex: 1,

        }

        

    }

    








    


})



export default Style;