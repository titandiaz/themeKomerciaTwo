<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f3f7fa;
  min-height: 100vh;
}
.block{
  font-weight: bold;
}
.text{
  font-size: 15px;
}
.detail{
  font-size: 12px;
}
a{
  text-decoration: none;
}
</style>
