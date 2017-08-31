<template>
  <div id="contacto">
    <div :class="{message: true, openMessage: message.open}">
      <i class="material-icons">done_all</i>
      <p>{{message.text}}</p>
    </div>
    <header>
        <header-menu></header-menu>
    </header>
    <div id="map"></div>
    <div class="contact" :style="styles.borderColor">
        <input type="text" placeholder="Nombres" v-model="nombre">
        <input type="text" placeholder="Correo Electronica" v-model="email">
        <input type="text" placeholder="Celular" v-model="numberphone">
        <textarea rows="8" placeholder="Comentrario" v-model="comment"></textarea>
        <button class="submitContact" :style="styles.backgroundColor" v-on:click="submitContact">Enviar</button>
    </div>
  </div>
</template>

<script>
import headerMenu from './menu2.vue';
import axios from 'axios';

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
  data(){
    return {
      nombre: '',
      email: '',
      numberphone: '',
      comment: '',
      message: {
        text: 'hola',
        open: false,
      },
    }
  },
  computed: {
    geolocalizacion(){
      return this.$store.state.geolocalizacion;
    },
    styles(){
      return {
        borderColor:{borderColor: this.$store.state.colorPrincipal},
        backgroundColor:{backgroundColor: this.$store.state.colorPrincipal},
      }
    }
  },
  methods: {
    submitContact(){
      let json = {
        nombre: this.nombre,
        correo: this.email,
        celular: this.numberphone,
        comentario: this.comment,
        tienda: this.$store.state.id,
      }
      axios.post('https://komercia.co/api/front/mensaje-contacto', json).then(() =>{
        this.nombre = '';
        this.email = '';
        this.numberphone = '';
        this.comment = '';
        this.$store.state.id = '';
           this.messageAction('Muy pronto te estaremos respondiendo a tu correo');
      })
    },
    messageAction(message){
      this.message.open = true;
      this.message.text = message;
      setTimeout(() => {
        this.message.open = false;
      }, 3000)
    },
    makeMap(){
      let place = {latitud:  4.14, longitud: -73.63};
      if(this.geolocalizacion){
        place = this.geolocalizacion[0];
      }
      var firstPlace = {lat: place.latitud, lng: place.longitud};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: firstPlace
      });
      if(this.geolocalizacion){
        for(let place of this.geolocalizacion){
          var marker = new google.maps.Marker({
            position: {lat: place.latitud, lng: place.longitud},
            map: map
          });
        }
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
    background-color: #9b9b9b;
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
  .contact .submitContact{
    border-style: none;
    padding: 10px 40px;
    margin: 0 10px 10px 0px;
    color: #FFF;
    border-radius: 15px;
    outline: none;
  }
  .message{
    position: absolute;
    max-width: 400px;
    height: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: black;
    background-color: #FFF;
    z-index: 3;
    box-shadow: 0 2px 4px rgba(0,0,0,.12), 0 0 6px rgba(0,0,0,.04);
    border-radius: 5px;
    overflow: hidden;
    transform: translateY(0px);
    opacity: 0;
    transition: .3s;
  }
  .message i{
    padding: 10px;
    background-color: #13ce66;
    color: #FFF;
  }
  .message p{
    margin: 0 10px;
    text-align: center;
    font-size: 15px;
    color: #656565;
  }
  .openMessage{
    height: initial;
    opacity: 1;
    transform: translateY(20px);
  }
</style>
