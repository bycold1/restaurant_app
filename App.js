import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Restaurant from './components/Restaurant';
import AddRestaurant from './components/AddRestaurant';
import { useState } from 'react';
import RestaurantDetails from './components/RestaurantDetails';
import Directions from './components/Directions';
import EditRestaurant from './components/EditRestaurant';
import About from './components/About';
import { Ionicons } from '@expo/vector-icons';


LogBox.ignoreAllLogs(true);

const aboutName = 'About'
const restaurantName = 'Restaurant'

const BottomStack = createNativeStackNavigator();
function AboutStackScreen() {
  return (
    <BottomStack.Navigator>
      <BottomStack.Screen name= {aboutName} component={About} options={{ headerShown: false }}/>
      <BottomStack.Screen name= {restaurantName} component={Restaurant} />
    </BottomStack.Navigator>
  )
}

const RestaurantStack = createNativeStackNavigator();
function RestaurantStackScreen() {
  const [restaurantName, setRestaurantName] = useState();

  const [restaurantPhone, setRestaurantPhone] = useState();
  const [restaurantAddress, setRestaurantAddress] = useState({ value: '', coordinates: null });
  const [restaurantTags, setRestaurantTags] = useState();
  const [rating, setRating] = useState(0);
  const [restaurantDesc, setRestaurantDesc] = useState();
  const[restaurants, setRestaurants] = useState([]);

  function handleRestaurant(){
    let newRestaurantName = restaurantName;
    let newRestaurantAddress = restaurantAddress;
    let newRestaurantPhone = restaurantPhone;
    let newRestaurantTags = restaurantTags;
    let newRating = rating;
    let newRestaurantDesc = restaurantDesc;
    let newRestaurants = [{newRestaurantName, newRestaurantAddress, newRestaurantPhone,newRestaurantTags, newRating ,newRestaurantDesc}, ...restaurants]
    setRestaurants(newRestaurants);
    setRestaurantName('')
    setRestaurantAddress({ value: '', coordinates: null });
    setRestaurantPhone('')
    setRestaurantTags('')
    setRating(0)
    setRestaurantDesc('')
  }

  return (
    <RestaurantStack.Navigator>
        <RestaurantStack.Screen name="Restaurant" options={{ headerShown: false }}>
          {props => <Restaurant{...props} restaurants={restaurants} setRestaurants={setRestaurants} 
                      restaurantName={restaurantName} 
                      restaurantAddress={restaurantAddress} 
                      restaurantPhone={restaurantPhone} 
                      restaurantTags={restaurantTags} 
                      rating={rating} 
                      restaurantDesc={restaurantDesc} 
                      setRestaurantName={setRestaurantName} 
                      setRestaurantAddress={setRestaurantAddress}  
                      setRestaurantPhone={setRestaurantPhone} 
                      setRestaurantTags={setRestaurantTags} 
                      setRating={setRating} 
                      setRestaurantDesc={setRestaurantDesc} />}
        </RestaurantStack.Screen>
        <RestaurantStack.Screen name='AddRestaurant'>
          {props => <AddRestaurant{...props} 
                      restaurantName={restaurantName}                   
                      restaurantAddress={restaurantAddress}
                      restaurantPhone={restaurantPhone} 
                      restaurantTags={restaurantTags} 
                      rating={rating} 
                      restaurantDesc={restaurantDesc} 
                      setRestaurantName={setRestaurantName} 
                      setRestaurantAddress={setRestaurantAddress} 
                      setRestaurantPhone={setRestaurantPhone} 
                      setRestaurantTags={setRestaurantTags} 
                      setRating={setRating}
                      setRestaurantDesc={setRestaurantDesc} 
                      handleRestaurant={handleRestaurant}/>}
        </RestaurantStack.Screen>
        <RestaurantStack.Screen name='RestaurantDetails'>
          {props => <RestaurantDetails {...props} restaurants={restaurants} setRestaurants={setRestaurants}  />}
        </RestaurantStack.Screen>
        <RestaurantStack.Screen name='Directions'>
          {props => <Directions {...props} />}
        </RestaurantStack.Screen>
        <RestaurantStack.Screen name='EditRestaurant'>
          {props => <EditRestaurant {...props} restaurants={restaurants} setRestaurants={setRestaurants} 
                      restaurantName={restaurantName} 
                      restaurantAddress={restaurantAddress}
                      restaurantPhone={restaurantPhone} 
                      restaurantTags={restaurantTags} 
                      rating={rating} 
                      restaurantDesc={restaurantDesc} 
                      setRestaurantName={setRestaurantName} 
                      setRestaurantAddress={setRestaurantAddress} 
                      setRestaurantPhone={setRestaurantPhone} 
                      setRestaurantTags={setRestaurantTags} 
                      setRating={setRating}
                      setRestaurantDesc={setRestaurantDesc} />}
        </RestaurantStack.Screen> 
      </RestaurantStack.Navigator>
  );


}


const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <>
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === restaurantName) {
              return (
                <Ionicons
                  name={
                    focused
                      ? 'restaurant'
                      : 'restaurant-outline'
                  }
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === aboutName) {
              return (
                <Ionicons
                  name={focused ? 'information-outline' : 'information'}
                  size={size}
                  color={color}
                />
              );
            }
          },
          tabBarInactiveTintColor: 'gray',
          tabBarActiveTintColor: 'black',
        })}>
        <Tab.Screen name={restaurantName} component={RestaurantStackScreen} />
        <Tab.Screen name={aboutName} component={AboutStackScreen} />
      </Tab.Navigator>    
    </NavigationContainer>
    </>
    
  );
}


