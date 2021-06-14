import * as React from 'react';
import { Appbar,Title,Button } from 'react-native-paper';
import { StyleSheet,Image } from 'react-native';

function TopBar(props) {
    const navigation = props.navigation;
    const billno = props.billno;
    const date = props.date;
    return (
        <Appbar style={styles.bottom}>
        <Appbar.Action
            icon="menu"
            />

        <Title>{props.name}</Title>
        {props.print?
        <Button 
        mode="contained" 
        icon={require('../../assets/printer-pos.png')}
        style={styles.image}
        onPress={()=>{
          console.log('click');
          navigation.navigate('print',{
            billno:billno,
            date:date
          })
        }}
        >
        Print
        </Button> 
        :<></>}
          
        </Appbar>
    );

}

export default TopBar;

const styles = StyleSheet.create({
  bottom: {
    left: 0,
    right: 0,
    top: 20,
  },
  image:{
    left:130
  }
});