import React , {Component} from 'react';
import {Text ,View, StyleSheet, Image, Alert, Dimensions,Button,TouchableHighlight} from 'react-native';

import MapView, {Marker,PROVIDER_GOOGLE,Circle,Callout } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import {CurrentLocationButton} from '../../components/buttons/CurrentLocationButton';
import {ShowDeliveryButton} from '../../components/buttons/ShowDeliveryButton';
import {UserAndDeliveryCenterButton} from '../../components/buttons/UserAndDeliveryCenterButton';

export default class DeliveryFindScreen extends Component{
    constructor(props){
        super(props);
        this.state = {
            storeRegion:{
                latitude : 35.8843,
                longitude: 128.6323,
            },
            delivery:{
                latitude:35.8944, 
                longitude: 128.6115
            },
            error: null,
        };        
    }
    componentDidMount() {
        // Instead of navigator.geolocation, just use Geolocation.

            Geolocation.getCurrentPosition(
                (position) => {
                    let initialRegion = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.015,
                    }
                    this.setState({
                        initialRegion,
                        error: null,
                    })
                },
                (error) => {
                    // See error code charts below.
                    this.setState({error:error.message});
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                //정확도, 타임아웃, 최대 연령
            );

            // this.watchID = Geolocation.watchPosition((lastPosition) => {
            //     var { distanceTotal, record } = this.state;
            //     this.setState({lastPosition});
            //     if(record) {
            //         var newLatLng = {latitude:lastPosition.coords.latitude, longitude: lastPosition.coords.longitude};
     
            //         this.setState({ track: this.state.track.concat([newLatLng]) });
            //         this.setState({ distanceTotal: (distanceTotal + this.calcDistance(newLatLng)) });
            //         this.setState({ prevLatLng: newLatLng });
            //     }
            // },
            // (error) => alert(JSON.stringify(error)),
            // {enableHighAccuracy: true, timeout: 15000, maximumAge: 0});
    }
    static getDerivedStateFromProps(props, state) {
        // Store prevId in state so we can compare when props change.
        // Clear out previously-loaded data (so we don't render stale stuff).
        if (props.id !== state.prevId) {
          return console.log('update');
          ;
        }
        // No state update necessary
        return null;
      }
    centerMap(){
        const {
            latitude, 
            longitude, 
            latitudeDelta, 
            longitudeDelta} = this.state.initialRegion
        this._map.animateToRegion({
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta
        })
    }
    goDelivery(){
        const {
            latitude, 
            longitude, } = this.state.delivery
        this._map.animateToRegion({
            latitude,
            longitude,
            latitudeDelta:0.015,
            longitudeDelta:0.015
        })
    }
    zoomOut(){
        const userRegion ={
            latitude: this.state.initialRegion.latitude,
            longitude:this.state.initialRegion.longitude,
        }
        const storeRegion = this.state.storeRegion
        const zoomOutLat = (userRegion.latitude + storeRegion.latitude)/2;
        const zoomOutLon = (userRegion.longitude + storeRegion.longitude)/2;
        console.log('userRegion : ' +JSON.stringify(userRegion));
        console.log('storeRegion : ' +JSON.stringify(storeRegion));
        
        console.log('zoomOutLat :'+zoomOutLat);
        console.log('zoomOutLon : '+zoomOutLon);
        
        this._map.animateToRegion({
            latitude:zoomOutLat,
            longitude:zoomOutLon,
            latitudeDelta:0.015,
            longitudeDelta:0.015,
        })
    }
    center
    render(){     
        console.log('1'+this.state.initialRegion);
        
        return(
            <View style={styles.container}>
                <CurrentLocationButton
                    cb={()=>{this.centerMap()}}
                />
                <ShowDeliveryButton
                    cb={()=>{this.goDelivery()}}
                />
                <UserAndDeliveryCenterButton
                    cb={()=>{this.zoomOut()}}
                />
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    ref={map=> {this._map = map}}
                    initialRegion={this.state.initialRegion}
                    showsUserLocation={true}
                    showsMyLocationButton = {true}
                    showsCompass = {true}
                    rotateEnabled={false}
                >   
                    {this.state.initialRegion&&
                        <Marker
                            coordinate={this.state.initialRegion}
                        >
                        </Marker>
                    }
                    <Marker
                        coordinate={this.state.storeRegion}
                    >
                    </Marker>
                    <Marker
                        coordinate={this.state.delivery}
                    ></Marker>
                </MapView>
                <View style = {styles.flat}>

                </View>

            </View>
        );
    } 
}

const styles = StyleSheet.create({
    container:{
        flex : 1,
        flexDirection:'column',
        alignItems:"center"
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        //(position: 'absolute', left: 0, right: 0, top: 0, bottom: 0)
    },
    header: {
        width:'100%',
        alignItems: 'center',
        backgroundColor: '#9aa9ff',
    },
    title : {
        alignItems: 'center',
        width:'90%',
    },
    titleSearchButton:{
        width:'100%',
    },
    content : {
        flex : 4,
        alignItems:'center',
    },
    footer: {
        width:'100%',
    },
    marker:{
        width:5,
        height:5,
    },
    carousel:{
        position:'absolute',
        bottom: 0,
        marginBottom: 48
    },
    cardContainer:{
        backgroundColor: 'rgba(0,0,0,0.6)',
        height:200,
        width:300,
        padding:24,
        borderRadius:24
    },
    cardImage:{
        height:120,
        width:300,
        bottom:0,
        position:'absolute',
        borderBottomLeftRadius:24,
        borderBottomRightRadius:24,
    },
    cardTitle:{
        color:'white',
        fontSize:22,
        alignSelf:'center'

    },
    nextButton : {
    }
});