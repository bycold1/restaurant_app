import React, {useState} from "react";
import Rating from 'react-native-easy-rating';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import * as Style from "../assets/styles";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  ApplicationProvider,
  IconRegistry,
  Icon
} from "@ui-kitten/components";
import * as eva from "@eva-design/eva";

const Restaurant = ({navigation, ...props}) => {
  const [searchRest, setSearchRest] = useState();
  function search(){
    if(searchRest===''){
      Alert.alert('Type something in the search box');
    }else if(searchRest!==''){
      props.restaurants.forEach((item, index) =>{
        if(item.restaurantName === searchRest){
          let searchItem = [...props.restaurants];
          let first = searchItem[0];
          let index = [...props.restaurants].indexOf(item);
          searchItem[0] = item;
          searchItem[index] = first;
          props.setRestaurants(searchItem);
        }if(item.restaurantTags === searchRest){
          let searchItem = [...props.restaurants];
          let first = searchItem[0];
          let index = [...props.restaurants].indexOf(item);
          searchItem[0] = item;
          searchItem[index] = first;
          props.setRestaurants(searchItem);
        }
      })
    }
    setSearchRest('');
    Keyboard.dismiss();
  }
  return (
    <View style={styles.restaurantContainer}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Restaurant Lists</Text>
      </View>
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddRestaurant') }>
          <Text>Add New</Text>
        </TouchableOpacity>
        <View style={[styles.searchContainer, {marginTop:15}]}>
            <TextInput
            placeholder="enter restaurant name or tag..."
            style={[styles.input, { borderWidth: 3 }]}
            ></TextInput>
            <TouchableOpacity style={[styles.searchButton, { width: 30 }]} onPress={()=>search()}>
                <IconRegistry icons={EvaIconsPack}/>
                    <ApplicationProvider {...eva} theme={eva.light}>
                    <Icon name="search" fill="white" style={{ width: 25, height: 40 }}/>
                    </ApplicationProvider>
            </TouchableOpacity>
            <TouchableOpacity style={styles.searchButton}>
                <Text style={styles.searchButtonText}>Clear</Text>
            </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scrollView} showsHorizontalScrollIndicator={false}>
        {props.restaurants.length == 0
        ?
        <View style={styles.emptyRestaurantContainer}>
            <Text style={styles.emptyRestaurantText}>There is no restaurant on the list yet!</Text>
        </View>
        :
        props.restaurants.map((item,index) => 
            <View style={styles.item} key={index}>
                <View>
                <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetails', {id: index, restaurant: item})}>
                      <Text style={styles.index}>{index+1}. Name: {item.newRestaurantName}</Text>
                      <Text style={styles.index}>Google Address: {item.newRestaurantAddress.value}</Text>
                      <Text style={styles.index}>Phone: {item.newRestaurantPhone}</Text>
                      <Text style={styles.index}>Tags: {item.newRestaurantTags}</Text>
                      <Text style={styles.index}>Description: {item.newRestaurantDesc}</Text>
                      <Rating rating={item.newRating}
                        max={5}
                        iconWidth={24}
                        iconHeight={24}
                        editable={false} />
                </TouchableOpacity>

                  <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('Directions', {id: index, restaurant: item})}>
                    <Text style={styles.editButtonText}>Get Directions</Text>
                  </TouchableOpacity>
                </View>
              
            </View>
        )
        }
      </ScrollView>
    </View>
  );
};
export const styles = StyleSheet.create({
  restaurantContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    marginBottom: 70,
    opacity: 0.9,
    backgroundColor: 'blanchedalmond'
  },
  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: Style.color,
  },
  divider: {
    width: "100%",
    height: 2,
    backgroundColor: Style.color,
    marginTop: 5,
    marginBottom: 5,
  },
  item: {
    marginBottom: 20,
    padding: 15,
    color: "black",
    opacity: 0.8,
    marginTop: 10,
    shadowColor: Style.color,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderColor: Style.color,
    borderWidth: 2,
    borderRadius: 5,
    borderLeftWidth: 15,
  },
  index: {
    fontSize: 20,
    fontWeight: "800",
  },
  headingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "white",
    width: 150,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
  },
  buttonText: {
    color: "white",
    fontSize: 32,
    fontWeight: "800",
  },
  scrollView: {
    marginBottom: 70,
  },
  restaurant: {
    flexDirection: "row",
    width: "75%",
  },
  text: {
    fontWeight: "700",
    fontSize: 17,
    alignSelf: "center",
  },
  delete: {
    color: Style.color,
    fontWeight: "700",
    fontSize: 15,
  },
  input: {
    height: 40,
    paddingHorizontal: 20,
    width: "77%",
    fontSize: 19,
    color: "black",
    fontWeight: "600",
    opacity: 0.8,
    shadowColor: Style.color,
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: "white",
    borderColor: Style.color,
    borderWidth: 2,
    borderRadius: 5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  searchButton: {
    backgroundColor: Style.color,
    alignItems: "center",
    justifyContent: 'center',
    width: 50,
    borderRadius: 5,
    height: 40,
  },
  searchButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
  },
  emptyRestaurantContainer: {
    alignItems: "center",
    marginTop: 240,
  },
  emptyRestaurantContainerText: {
    color: Style.color,
    fontWeight: "600",
    fontSize: 15,
  },
  formContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
export default Restaurant;
