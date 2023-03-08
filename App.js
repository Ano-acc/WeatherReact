import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let addr = await Location.reverseGeocodeAsync(location.coords);
      console.log(addr[0].city);
      setLocation(location);
      setCoords(location.coords);
      setAddress(addr);
      console.log("before fetch");
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=661c79edb8daf3538b485b968c687ece`)
          .then(response => response.json())
          .then(data => setWeather(data));
      //const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&appid=661c79edb8daf3538b485b968c687ece`);
      console.log("after fetch");
      //setWeather(await response.json());
    })();
  }, []);

  const getWeatherData = async () => {
    console.log("1");
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=661c79edb8daf3538b485b968c687ece`);
    console.log("2");
    let data = await response.json();
    console.log("3");
    console.log(data);
    data = "";
  }

  return (
      <View style = {{
        backgroundColor: 'white',
        position: 'absolute', left: '15%', top: '30%',
        alignItems: 'center',
        width: '70%'
      }} >
        <Text>a</Text>
        <TouchableOpacity onPress={() => getWeatherData()}>
          <Ionicons name="ios-close-circle" size={20} color="red" />
        </TouchableOpacity>
      </View>
  );
}