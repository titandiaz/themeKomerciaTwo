<template>
  <div id="contacto">
    <header>
        <header-menu></header-menu>
    </header>
    <div id="map"></div>
    <div class="contact" :style="styles.borderColor">
        <input type="text" placeholder="Nombres" value="">
        <input type="text" placeholder="Correo Electronica" value="">
        <input type="text" placeholder="Celular" value="">
        <textarea rows="8" placeholder="Comentrario"></textarea>
    </div>
  </div>
</template>

<script>
import headerMenu from './menu2.vue';

export default {
  components: { headerMenu },
  mounted(){
    this.makeMap();
  },
  watch: {
    '$store.state.geolocalizacion': function(){
      this.makeMap();
    },
  },
  computed: {
    geolocalizacion(){
      return this.$store.state.geolocalizacion;
    },
    styles(){
      return {
        borderColor:{borderColor: this.$store.state.colorPrincipal},
      }
    }
  },
  methods: {
    makeMap(){
      let place = this.geolocalizacion[0];
      var firstPlace = {lat: place.latitud, lng: place.longitud};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: firstPlace
      });
      for(let place of this.geolocalizacion){
        var marker = new google.maps.Marker({
          position: {lat: place.latitud, lng: place.longitud},
          map: map
        });
      }
    }
  }
}
</script>

<style scoped>
  #contacto{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  header{
    position: relative;
    width: 100%;
    height: 90px;
    background-color: #e4e4e4;
    padding: 0 20px;
  }
  #map {
    width: 98%;
    height: 500px;
    margin-top: 10px;
    background-color: #EEE;
  }
  .contact{
    position: absolute;
    max-width: 700px;
    width: 96%;
    margin: 0 auto;
    bottom: 10px;
    background-color: #FFF;
    padding: 0px 16px;
    border-radius: 12px;
    border-width: 1px;
    border-style: solid;
    box-shadow: 0 14px 31px 6px rgba(121, 121, 121, 0.3);
  }
  .contact input, .contact textarea{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 10px;
    background-color: #FFF;
    border-radius: 8px;
    overflow: hidden;
    /*margin: 0 10px;*/
    outline: none;
    border-style: none;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
    border: solid 0.5px #e8e9ed;
    margin: 16px 0;
    resize: none;
  }
  .contact input:focus, .contact textarea:focus{
    border: solid 1px #cecfd0;
  }
  .contact input{
    max-width: 350px;
    height: 40px;
  }
  .contact textarea{
    padding: 15px 10px;
  }
</style>
