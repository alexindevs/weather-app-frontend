<template>
    <h1 class="header"> 3 day Forecast</h1>
    <div class="forecast">
      <DayData v-for="dayData in data" :key="dayData.day" :data="dayData" />
    </div>
  </template>
  
  <script>
  import DayData from './Day.vue'; // Make sure to import the Day component
  
  export default {
    name: 'ForecastData',
    components: {
      DayData, 
    },
    props: {
      data: Array,
    },
  };
  </script>
  
  <style scoped>
    .header {
        color: white;
    font-family: 'Outfit';
    padding: 10px 0;
    text-align: center;
    }

  .forecast {
    width: 90%;
    padding: 20px 0;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    color: white;
    font-family: 'Outfit';
    gap: 20px;
    justify-content: center;
  }
  </style>
  