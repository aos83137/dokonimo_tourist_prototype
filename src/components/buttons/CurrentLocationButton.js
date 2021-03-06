import React,{Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const CurrentLocationButton = function(props){
    const cb = props.cb ? props.cb :()=> console.log('Callback function not passed to CurrnetLocatioinButton!');

    // console.log(props.bottom);
    const bottom = props.bottom ? props.bottom : 130;

    return(
        <View style={[styles.container , {top: HEIGHT - bottom}]}>
            <Icon2 
                name = 'user'
                color = "#000000"
                size = {25}
                onPress={()=>{
                    return cb()
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        zIndex: 9,
        position: 'absolute',
        width: 45,
        height: 45,
        backgroundColor: '#fff',
        left: WIDTH-70,
        borderRadius: 50,
        shadowColor: '#000000',
        shadowOpacity: 1.0,
        shadowRadius: 5,
        elevation: 7,
        justifyContent: 'space-around',
        alignItems: 'center',
    }
});