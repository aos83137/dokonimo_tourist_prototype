import React , {useState, useEffect } from 'react';
import {Text ,View,StyleSheet, Image, Alert, Dimensions, TouchableHighlight,TouchableOpacity} from 'react-native';
import { Button,Overlay,Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon5 from 'react-native-vector-icons/Fontisto';

import  colors from '../styles/colors'
import DateTimePickerModal from "react-native-modal-datetime-picker";

//props 안에 navigation, route가  들어가있음 {navigation, route} 이렇게 써도 되고 props.navigatio으로 써도됨
const DateSetting = (props)=>{   
    const [bagCnt, setbagCnt] = useState(props.route.params?.bagCnt ? props.route.params?.bagCnt :0);
    const [carrCnt, setCarrCnt] = useState(props.route.params?.carrCnt ? props.route.params?.carrCnt:0);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isCheckoutDatePickerVisible, setCheckOutDatePickerVisibility] = useState(false);
    const [checkIn, setCheckIn] = useState(props.route.params?.checkIn ? props.route.params?.checkIn:new Date());
    const [checkOut, setcheckOut] = useState(props.route.params?.checkOut ? props.route.params?.checkOut :new Date());
    const [keeper_id, setKeeper_id] = useState(props.route.params?.keeper_id);
    const [keeper, setKeeper] = useState(props.route.params?.keeper);
    const whereScreen = props.route.params?.whereScreen;
    const coord = props.route.params?.coord;
    const [visible, setVisible] = useState(false);
    const [carrVisible, setCarrVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
      };
    const toggleCarrOverlay=()=>{
        setCarrVisible(!carrVisible);
    }

    const showDatePicker = (check) => {
        if(check === 'checkIn'){
            setDatePickerVisibility(true);
        }else if(check==='checkOut'){
            setCheckOutDatePickerVisibility(true);
        }
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        setCheckOutDatePickerVisibility(false);
    };
    

    const checkInHandleConfirm = date => {
        hideDatePicker();

        setCheckIn(date)
        return date;
    };
    const checkOutHandleConfirm = date =>{
        hideDatePicker();

        setcheckOut(date)

        return date;
    }
    const getFormatDate = date=>{
        let month = (1 + date.getMonth());          //M
        month = month >= 10 ? month : '0' + month;  //month 두자리로 저장
        let day = date.getDate();                   //d
        day = day >= 10 ? day : '0' + day;          //day 두자리로 저장
        let hour = date.getHours();                 //h
        let ampm = '오전';
        if(hour>=12){
            hour= hour -12;
            ampm = '오후';
        }
        let min = date.getMinutes();                //m
        if(min<10) min = '0' + min;
        return  '' + month + '.' + day + '. ' + ampm + ' ' + hour+':'+min;
    }

    let button;
    if(whereScreen === 'date'){
        button=<Button buttonStyle={{backgroundColor:colors.green01}} title="검색" 
            onPress={()=>{props.navigation.navigate('Home',{
                    checkIn,
                    checkOut,
                    bagCnt,
                    carrCnt,
                })
            }}/>
    }else if(whereScreen==='info'){
        button=<Button buttonStyle={{backgroundColor:colors.green01}} title="예약 내역 확인" 
            onPress={()=>{props.navigation.navigate('Reservation',{
                    checkIn,
                    checkOut,
                    bagCnt,
                    carrCnt,
                    keeper_id,
                    coord,
                    data:keeper,
                    whereScreen:'reservation',
                })
            }}/>
    }
    // console.log(keeper_id);
    
        return(
            <View style = {styles.container}> 
                <Overlay overlayStyle={styles.overlay} isVisible={carrVisible} onBackdropPress={toggleCarrOverlay}>
                    <View style={styles.overlayStyle}>
                        <View style = {styles.title}>
                            <Text style={styles.checkText1}>수트케이스 사이즈</Text>    
                            <Text style={styles.luggageText1}>길이가 45cm 이상인 수하물</Text>    
                        </View>
                        <View style={styles.elem}>
                            <Avatar
                                size="large"
                                rounded
                                containerStyle={styles.avatarStyle}
                            />
                            <Avatar
                                size="large"
                                rounded
                                containerStyle={styles.avatarStyle}
                            />
                            <Avatar
                                size="large"
                                rounded
                                containerStyle={styles.avatarStyle}
                            />
                        </View>
                        <View style={styles.footer}>
                            <Button type="clear" title={'OK'} onPress={toggleCarrOverlay}/>
                        </View>
                    </View>
                </Overlay>
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View style={styles.overlayStyle}>
                        <View style = {styles.title}>
                            <Text style={styles.checkText1}>가방 사이즈</Text>    
                            <Text style={styles.luggageText1}>길이가 45cm 이하인 수하물</Text>    
                        </View>
                        <View style={styles.elem}>
                            <Avatar
                                size="large"
                                rounded
                                containerStyle={styles.avatarStyle}
                            />
                            <Avatar
                                size="large"
                                rounded
                                containerStyle={styles.avatarStyle}
                            />
                            <Avatar
                                size="large"
                                rounded
                                containerStyle={styles.avatarStyle}
                            />
                        </View>
                        <View style={styles.footer}>
                            <Button type="clear" title={'OK'} onPress={toggleOverlay}/>
                        </View>                
                    </View>
                </Overlay>
                <View style={styles.backIcon}>
                    <TouchableOpacity onPress={()=>{props.navigation.goBack()}}>
                        <Icon name='keyboard-arrow-left' size={24}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.dateView}>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="datetime"
                        onConfirm={checkInHandleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <DateTimePickerModal
                        isVisible={isCheckoutDatePickerVisible}
                        mode="datetime"
                        onConfirm={checkOutHandleConfirm}
                        onCancel={hideDatePicker}
                    />
                    <TouchableOpacity onPress={()=>{showDatePicker('checkIn')}}>
                        <View>
                            <Text style={styles.checkText1}>체크인</Text>
                            <Text style={styles.checkText2}>{getFormatDate(checkIn)}</Text>
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Icon name='keyboard-arrow-right' size={30}/>
                    </View>
                    <TouchableOpacity onPress={()=>{showDatePicker('checkOut')}}>
                        <View>
                            <Text style={styles.checkText1}>체크아웃</Text>
                            <Text style={styles.checkText2}>{getFormatDate(checkOut)}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.luggageView}>
                    <View style={styles.luggageWrap}>
                        <View style={styles.elem}>
                            <Icon
                                name = "card-travel"
                                color={colors.green01}
                                size={30}
                                style={styles.icon}
                            />
                            <Text style={styles.luggageText1}>가방 사이즈</Text>
                            <TouchableOpacity
                            onPress={toggleOverlay}>
                                <Icon2
                                    name="question-circle-o"
                                    size = {20}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonElem}>
                            <Button icon={
                                <Icon2
                                    name='minus'
                                    size={15}
                                    color={colors.white}
                                />
                            } buttonStyle={styles.buttonStyle}
                            onPress={()=>{ bagCnt? setbagCnt(bagCnt-1) : false}}/>
                            <Text> {bagCnt? bagCnt: 0} </Text>
                            <Button icon={
                                <Icon2
                                    name='plus'
                                    size={15}
                                    color={colors.white}
                                />
                            } buttonStyle={styles.buttonStyle}
                            onPress={()=>{setbagCnt(bagCnt+1)}}
                            />
                        </View>
                    </View>
                    <View style={styles.luggageWrap}>
                        <View style={styles.elem}>
                            <Icon5
                                name = "suitcase"
                                color={colors.green01}
                                size={30}
                                style={styles.icon}
                            />
                            <Text style={styles.luggageText1}>슈트케이스의 사이즈</Text>
                            <TouchableOpacity
                            onPress={toggleCarrOverlay}
                            >
                                <Icon2
                                    name="question-circle-o"
                                    size = {20}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonElem}>
                            <Button icon={
                                <Icon2
                                    name='minus'
                                    size={15}
                                    color={colors.white}
                                />
                            } buttonStyle={styles.buttonStyle} 
                            onPress={()=>{carrCnt?setCarrCnt(carrCnt-1):false}}
                            />
                            <Text> {carrCnt? carrCnt: 0} </Text>
                            <Button icon={
                                <Icon2
                                    name='plus'
                                    size={15}
                                    color={colors.white}
                                />
                            } buttonStyle={styles.buttonStyle}
                            onPress={()=>{setCarrCnt(carrCnt+1)}}/>
                        </View>
                    </View>
                </View>
                <View style={styles.footer}>
                    {button}
                </View>
            </View>
        );
    }

    
const styles = StyleSheet.create({
    container:{
        padding:'3%',
        flex:1,
        alignItems:'center',
    },
    backIcon:{
        width:'100%',
        marginBottom:'3%',
    },
    dateView:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:'3%',
    },
    checkText1:{
        fontSize:18,
        fontWeight:'bold',
    },
    checkText2:{
        fontSize:24,
        fontWeight:'bold',
        color:colors.green01
    },
    luggageView:{
        width:'100%',
        paddingBottom:'4%',
        borderTopWidth:3,
        borderColor:"rgba(33,33,33,0.3)",
        borderBottomWidth:3,
    },
    luggageText1:{
        margin:'2%',
        fontSize:16,
        color: colors.black,
    },
    luggageWrap:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingTop:'2%',
        paddingBottom:'2%',
    },
    buttonStyle:{
        backgroundColor:colors.green01,
        height:30,
        width:30,
    },
    elem:{
        flexDirection:'row',
        alignItems:'center',
    },
    buttonElem:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        width:'25%',
    },
    footer:{
        width:'80%',
        marginTop:'10%',
    },
    title:{
        alignItems:'center',
        marginBottom:'10%',
    },
    overlayStyle:{
        alignItems:'center',
        padding:20
    },
    overlay:{
        width:'75%',
        height:'40%',
    },
    avatarStyle:{
        marginLeft:10,
        marginRight:10,
    },
});

export default DateSetting;