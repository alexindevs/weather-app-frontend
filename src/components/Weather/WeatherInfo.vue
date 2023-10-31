<template>
    <div class="weatherDisplay">
      <img :src="info.icon" alt="" class="icon">
      <h2 class="description">{{ info.description }}</h2>
      <br>
      <p class="temperature">It feels like it's {{ info.temperature }} degrees Celsius where you are.</p>
      <p class="location">You are in {{ info.place }}, {{ info.region }}, {{ info.country }}.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'WeatherDisplay',
    props: {
      info: Object, // Define the prop to receive the WeatherInfo object
    },
  }
  </script>
  
  <style scoped>
  .weatherDisplay {
    text-align: center;
    color: white;
    margin: 30px;
    font-family: 'Outfit', sans-serif;
  }
  
  .weatherDisplay img  {
    width: 80px;
    height: 80px;
  }
  </style>
  