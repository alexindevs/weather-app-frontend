<template>
  <TodayHeader />
  <WeatherDisplay :info="WeatherInfo"/>
  <ForecastData :data="ForecastData" />
</template>

<script> 
import TodayHeader from './components/Today.vue';
import WeatherDisplay from "./components/WeatherInfo.vue";
import ForecastData from "./components/Forecast.vue"
import axios from 'axios';

export default {
  name: 'App',
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

          this.fetchWeather(latitude, longitude);
          this.fetchForecast(latitude, longitude);
        });
      } else {
        console.error("Geolocation is not available in this browser.");
        alert("Geolocation is not available in this browser.");
      }
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
          chanceOfRain: dayData.day.daily_will_it_rain ? 'Likely' : 'Not',
          temperature: (dayData.day.maxtemp_c + dayData.day.mintemp_c) / 2,
          uvIndex: dayData.day.uv,
          icon: dayData.day.condition.icon,
        }));
      } catch (error) {
        console.error(error);
      }
    },
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
}
</style>
