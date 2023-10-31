<template>
    <div class="day">
      <p class="weekday">{{ data.day }}</p>
      <img :src="data.icon" :alt="data.condition" class="icon">
      <p class="condition">{{ data.condition }}</p>
      <p class="temperature">{{ data.temperature }}°C</p>
      <p class="uv">UV Index: {{ data.uvIndex }}</p>
      <p class="chanceOfRain">Chance of Rain: {{ data.chanceOfRain }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "DayData",
    props: {
      data: Object, // Define the data prop to receive the day's data
    },
  };
  </script>
  
  <style>
  .day {
    display: flex;
    gap: 40px;
    align-items: center;
    justify-content: left;
    overflow: auto;
  }
  
  .day::-webkit-scrollbar {
    display: none;
  }
  </style>
  