import React from 'react';
import {Image,StyleSheet,ScrollView,Dimensions,View} from 'react-native'


var img = require('../../assets/header.png')

const win = Dimensions.get('window');

export default function Print({route,navigation}){
    const {billno,date} = route.params;
    console.log(billno);
    console.log(date);
    console.log(win.width)
    console.log(img.width)
    return(
        <ScrollView style={styles.container}>
            <Image 
            style={styles.header}
            source={require('../../assets/header.png')} />
            <View style={styles.section}>
                <View style={styles.sectionA} >

                </View>
                <View style={styles.sectionB}>

                </View>
            </View>
            <View style={styles.sectionnew}>

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    header : {
        width:win.width
    },
    container:{
        width:win.width,
        flexDirection:"column",
        backgroundColor:"white",
        zIndex:-1
    },
    section:{
        width:"97%",
        height:40,
        left:7,
        top:3,
        borderColor:"black",
        borderWidth:1,
    },
    sectionA:{
        width:"60%",
        height:38,
        borderRightColor : "#000",
        borderRightWidth:1
    },
    sectionB:{
        width:"40%",
        height:38,
    },
    sectionnew:{
        borderColor:"black",
        borderWidth:1,
        left:7,
        top:4,
        height:15,
        backgroundColor:"red",
        width:"97%"
    }
})