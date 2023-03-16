import * as React from 'react';
import { Text, View, StyleSheet, Image, TextInput, Switch, Button } from 'react-native';

export default function About() {
  return(
    <View style={styles.container}>
    <Text style={styles.paragraph}>Juan Carlos Rojas - 101202014</Text>
    <Text style={styles.paragraph}>Ellyn Francess Bibon - 101329235</Text>
    <Text style={styles.paragraph}>Janine Mae Usana - 101328279</Text>
    <Text style={styles.paragraph}>Marie Vianca Pagaduan - 101256979 </Text>
  </View>
  )
 
}

const styles = StyleSheet.create({
  paragraph: {
    marginTop: 5,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container: {
    marginVertical: 30,
    backgroundColor: 'blanchedalmond'
  }
 
});