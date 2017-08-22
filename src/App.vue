<template>
  <div id="app" :style="stylesConf">
    <router-view></router-view>
    <footer-component></footer-component>
  </div>
</template>

<script>
import footerComponent from './components/footer.vue'
export default {
  name: 'app',
  components: { footerComponent },
  data() {
    return {
      stylesConf: {
        color: this.$store.state.colorTexto,
        backgroundImage: ()=>{
          if(this.$store.state.urlFondo){
            return`url(http://komercia.co/img/fondos/${this.$store.state.urlFondo})`;
          }else{
            return '';
          }
        },
      }
    }
  }
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
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
.pointer{
  cursor: pointer;
}
</style>
