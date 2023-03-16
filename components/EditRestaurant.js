import React, {useState} from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import * as Style from "../assets/styles";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Icon
} from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import {styles} from './AddRestaurant';
import  Rating from 'react-native-easy-rating';


function EditRestaurant({route, navigation, ...props}) {
    const {i} = route.params;
    const[restaurantName, setEditName] = useState(props.restaurants[i].restaurantName);
    const[restaurantAddress, setEditAddress] = useState(props.restaurants[i].restaurantAddress);
    const[restaurantPhone, setEditPhone] = useState(props.restaurants[i].restaurantPhone);
    const[restaurantTags, setEditTag] = useState(props.restaurants[i].restaurantTags);
    const[restaurantDesc, setEditDesc] = useState(props.restaurants[i].restaurantDesc);
    const[restaurantRate, setEditRate] = useState(props.restaurants[i].rating);

    function editRestaurant(){
        let edited = props.restaurants;
        edited[i] = {restaurantName, restaurantAddress, restaurantPhone, restaurantTags, restaurantDesc}
        props.setRestaurants(edited);
        navigation.navigate('RestaurantDetails', {id: i});
    }
  return (
    <ScrollView>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{padding:20, justifyContent:'space-evenly'}}>
                    <TextInput style={[styles.input]} placeholder='Enter Name' value={restaurantName.toString()} onChangeText={(text)=>setEditName(text)} ></TextInput>
                    <TextInput style={[styles.input]} placeholder='Enter Address...' value={restaurantAddress.toString()} onChangeText={(text)=>setEditAddy(text)} ></TextInput>
                    <TextInput style={[styles.input]} placeholder='Phone Number...' value={restaurantPhone.toString()} onChangeText={(text)=>setEditPhone(text)}></TextInput>
                    <TextInput style={[styles.input]} placeholder='Tag ie;#vegan' value={restaurantTags.toString()} onChangeText={(text)=>setEditTag(text)}></TextInput>
                    <TextInput style={[styles.input, {height: 80} ]} placeholder='Description' value={restaurantDesc.toString()} onChangeText={(text)=>setEditDesc(text)}></TextInput>
                    {/* <Text style={styles.ratingText}>Rating:  </Text>
                    <Rating rating={restaurantRate}
                        max={5}
                        iconWidth={24}
                        iconHeight={24}
                        onRate={setEditRate}/> */}
                
                    <TouchableOpacity style={styles.button} onPress={() => {editRestaurant(); }}>
                        <Text style={styles.buttonText}>Save</Text></TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
  )
}

export default EditRestaurant