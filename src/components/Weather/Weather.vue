<template>
    <TodayHeader />
    <WeatherDisplay :info="WeatherInfo"/>
    <ForecastData :data="ForecastData" />
    <button class="rainToday" @click="getProbabilityOfRain(latitude, longitude)">?</button>
    <div class="RainProbability" v-if="WillItRain">
      <div class="text">
        <h1>The Probability of Rain is....</h1>
        <p>{{ WillItRain }}%</p>
      </div>
      <span @click="resetRainProbability">X</span>
    </div>
  </template>
  
  <script> 
  import TodayHeader from './Today.vue';
  import WeatherDisplay from "./WeatherInfo.vue";
  import ForecastData from "./Forecast.vue"
  import axios from 'axios';
  
  export default {
    name: 'WeatherPage',
    components: {
      TodayHeader, WeatherDisplay, ForecastData
    },
    data() {
      return {
        WeatherInfo: {
          place: '',
          region: '',
          country: '',
          description: '',
          icon: '',
          temperature: 0
        },
        ForecastData: null,
        WillItRain: null,
        latitude: null,
        longitude: null
      };
    },
    created() {
      this.getLocation();
    },
    methods: {
      getLocation() {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition((position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
  
            this.latitude = latitude;
            this.longitude = longitude;
  
            this.fetchWeather(latitude, longitude);
            this.fetchForecast(latitude, longitude);
          });
        } else {
          console.error("Geolocation is not available in this browser.");
          alert("Geolocation is not available in this browser.");
        }
      },
      async resetRainProbability() {
        this.WillItRain = null;
      },
      async fetchWeather(latitude, longitude) {
        try {
          const response = await axios.get(`http://localhost:3000/weather/today/${latitude}/${longitude}`);
          const weatherData = response.data;
  
          // Update the WeatherInfo object with API response
          this.WeatherInfo.place = weatherData.location.name;
          this.WeatherInfo.region = weatherData.location.region;
          this.WeatherInfo.country = weatherData.location.country;
          this.WeatherInfo.description = weatherData.current.condition.text;
          this.WeatherInfo.icon = weatherData.current.condition.icon;
          this.WeatherInfo.temperature = weatherData.current.feelslike_c;
        } catch (error) {
          console.error(error);
        }
      },
      async fetchForecast(latitude, longitude) {
        try {
          const response = await axios.get(`http://localhost:3000/weather/forecast/${latitude}/${longitude}`);
          this.ForecastData = response.data.map((dayData) => ({
            day: dayData.date,
            condition: dayData.day.condition.text,
            chanceOfRain: dayData.day.daily_will_it_rain ? 'Likely' : 'Not Likely',
            temperature: (dayData.day.maxtemp_c + dayData.day.mintemp_c) / 2,
            uvIndex: dayData.day.uv,
            icon: dayData.day.condition.icon,
          }));
        } catch (error) {
          console.error(error);
        }
      },
      async getProbabilityOfRain(latitude, longitude) {
        try {
          const response = await axios.get(`http://localhost:3000/weather/probabilityOfRain/${latitude}/${longitude}`);
          const forecastData = response.data.rainProbability;
          console.log(forecastData);
          this.WillItRain = forecastData;
        } catch (error) {
          console.error(error);
        }
      }
    },
  };
  
  /**
  * Day: response.data[0].date
  * Weather Condition: response.data[0].day.condition.text
  * Chance of Rain: Likely or Not : response.data[0].day.daily_will_it_rain
  * Temperature: average of response.data[0].day.maxtemp_c and response.data[0].day.mintemp_c
  * UV Index: response.data[0].day.uv
  * Icon: response.data[0].day.condition.icon
  */
  
  </script>
  
  
  
  <style>
  #app {
    background-color: black;
    font-family: 'Outfit', sans-serif;
  }
  
  .rainToday{
    position: absolute;
    top: 90%;
    left: 90%;
    background-color: rgb(0, 136, 255);
    border-radius: 100%;
    width: 60px;
    height: 60px;
    color: white;
    transform: translate(-90%, -90%);
    font-size: large;
    font-weight: bold;
    z-index: 4;
  }
  
  .RainProbability{
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    width: 100%;
    height: 100%;
    color: white;
    z-index: 7;
  }
  
  .RainProbability .text{
    position: absolute;
    top: 50%;
    text-align: center;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .RainProbability p{
    font-size: 24px;
    margin-top: 20px;
  }
  
  .RainProbability span{
    position: absolute;
    top: 10%;
    left: 90%;
    transform: translate(-90%, -10%);
    font-size: 50px;
    color: white;
  }
  
  </style>
  