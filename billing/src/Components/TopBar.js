import React from 'react';
import { Container, Header, Title, Left, Right, Body, Icon, } from 'native-base';
import { TouchableOpacity } from 'react-native';


export default function TopBar(props){
    const handlePress=(e)=>{
        e.preventDefault();
        props.navigation.toggleDrawer();
    }
    return(
        <Container>
            <Header>
          <Left>
            <TouchableOpacity onPress={e=>handlePress(e)} >
              <Icon name='menu' />
            </TouchableOpacity>
          </Left>
          <Body>
            <Title>{props.name}</Title>
          </Body>
          <Right />
        </Header>
        </Container>
    )
}