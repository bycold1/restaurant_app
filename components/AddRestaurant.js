import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import React, {useState} from "react";
import { Text, StyleSheet, ScrollView, Keyboard, TextInput, View, TouchableOpacity, Image, Alert } from "react-native";
import  Rating from 'react-native-easy-rating'; 
import * as Style from "../assets/styles";


const AddRestaurant = ({navigation, ...props}) =>{
    return(
        <ScrollView keyboardShouldPersistTaps="handled">
        <View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{padding:20, justifyContent:'space-evenly'}}>
                    <TextInput style={[styles.input]} placeholder='Enter Name' value={props.restaurantName} onChangeText={(text) => props.setRestaurantName(text)}></TextInput>
                    
                    <GooglePlacesAutocomplete
                        placeholder="Type a place"
                        query={{key: "AIzaSyBo_rPeEwPDVE_a0dib_IuTGivH43TSvAE", language: 'en'}}
                        onPress={(data, details ) => {
                            props.setRestaurantAddress({ value: data.description, coordinates: details.geometry.location })
                        }}
                        fetchDetails={true}
                        onFail={error => console.log(error)}
                        onNotFound={() => console.log('no results')}
                        text={props.restaurantAddress}
                        listEmptyComponent={() => (
                        <View style={{flex: 1}}>
                            <Text>No results were found</Text>
                        </View>
                        )}
                    />

                    <TextInput style={[styles.input]} placeholder='Phone Number...' value={props.restaurantPhone} onChangeText={(text) => props.setRestaurantPhone(text)}></TextInput>
                    <TextInput style={[styles.input]} placeholder='Tag ie;#vegan' value={props.restaurantTags} onChangeText={(text) => props.setRestaurantTags(text)}></TextInput>
                    <TextInput style={[styles.input, {height: 80} ]} placeholder='Description' value={props.restaurantDesc} onChangeText={(text) => props.setRestaurantDesc(text)}></TextInput>
                    <Text style={styles.ratingText}>Rating:  </Text>
                    <Rating rating={props.rating}
                        max={5}
                        iconWidth={24}
                        iconHeight={24}
                        onRate={props.setRating}/>

                    <TouchableOpacity style={styles.button} onPress={() => {
                        if(props.restaurantName===''){
                            Alert.alert('Please type something');
                        }if(props.restaurantAddy===''){
                            Alert.alert('Please type something');
                        }if(props.restaurantPhone===''){
                            Alert.alert('Please type something');
                        }if(props.restaurantTags===''){
                            Alert.alert('Please type something');
                        }if(props.restaurantDesc===''){
                            Alert.alert('Please type something');
                        }
                        else{
                            props.handleRestaurant();
                            navigation.navigate('Restaurant')
                        }
                    }}><Text style={styles.buttonText} onPress={()=> props.handleRestaurant()}>Add</Text></TouchableOpacity>           
                </View>
            </TouchableWithoutFeedback>

            </View>

        </ScrollView>
    )
}

export const styles = StyleSheet.create({
    AddRestaurantContainer:{
        paddingHorizontal: 20,
        marginTop:20,
        alignItems:"center",
        justifyContent:'center',
    },
    input:{
        padding:20,
        paddingTop:20,
        marginBottom:20,
        width:'100%',
        fontSize: 15,
        color: 'black',
        fontWeight: '600',
        opacity: 0.8,
        shadowColor: Style.color,
        shadowOpacity: 0.4,
        shadowOffset: {width:0, height:4},
        shadowRadius:8,
        elevation: 5,
        backgroundColor: 'white',
        borderColor: Style.color,
        borderWidth: 2,
        borderRadius:5,
        height: 60
    },
    ratingText:{
        paddingTop:10,
        width:'100%',
        fontSize: 20,
        fontWeight: '600',
        height: 60
    },
    button:{
        backgroundColor:Style.color,
        width:'40%',
        borderRadius:100,
        justifyContent:'center',
        alignItems:'center',
        height:40,
        alignSelf:'center',
        marginTop:20
    },
    buttonText:{
        color:'white',
        fontSize:20,
        fontWeight:'700',
    },
    customRating:{
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 30
    },
    starImgStyle:{
        width:40,
        height:40,
        resizeMode:'cover'
    }
})

export default AddRestaurant;