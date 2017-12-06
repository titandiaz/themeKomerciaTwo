<template>
  <div id="contacto">
    <div :class="{message: true, openMessage: message.open}">
      <i class="material-icons">done_all</i>
      <p>{{message.text}}</p>
    </div>
    <div class="contacto_content">
      <div class="maps">
        <div id="map"></div>
        <!-- <div class="map_degrade"></div> -->
      </div>
      <div class="contact">
        <input type="text" placeholder="Nombres" v-model="nombre">
        <input type="text" placeholder="Correo electrónico" v-model="email">
        <input type="text" placeholder="Celular" v-model="numberphone">
        <textarea rows="8" placeholder="Comentrario" v-model="comment"></textarea>
        <button class="submitContact" v-on:click="submitContact">Enviar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  mounted(){
    this.makeMap();
  },
  watch: {
    geolocalizacion() {
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
      axios.post(`${this.$urlHttp}/api/front/mensaje-contacto`, json).then(() =>{
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
      if(this.geolocalizacion && this.geolocalizacion.length != 0){
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
    min-height: calc(100vh - 306px);
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
  .contacto_content{
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 20px 0;
  }
  .maps{
    position: relative;
    max-width: 480px;
    width: 100%;
    max-height: 480px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    margin: 0 10px;
  }
  #map {
    max-width: 480px;
    width: 100%;
    height: 480px;

    background-color: #EEE;
  }
  .map_degrade{
    pointer-events: none;
    position: absolute;
    width: 580px;
    height: 580px;
    background: rgba(255,255,255,0);
    background: -moz-radial-gradient(center, ellipse cover, rgba(255,255,255,0) 0%, rgba(192,202,51,0.74) 45%, rgba(192,202,51,1) 61%);
    background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%, rgba(255,255,255,0)), color-stop(45%, rgba(192,202,51,0.74)), color-stop(61%, rgba(192,202,51,1)));
    background: -webkit-radial-gradient(center, ellipse cover, rgba(255,255,255,0) 0%, rgba(192,202,51,0.74) 45%, rgba(192,202,51,1) 61%);
    background: -o-radial-gradient(center, ellipse cover, rgba(255,255,255,0) 0%, rgba(192,202,51,0.74) 45%, rgba(192,202,51,1) 61%);
    background: -ms-radial-gradient(center, ellipse cover, rgba(255,255,255,0) 0%, rgba(192,202,51,0.74) 45%, rgba(192,202,51,1) 61%);
    background: radial-gradient(ellipse at center, rgba(255,255,255,0) 0%, rgba(192,202,51,0.74) 45%, rgba(192,202,51,1) 61%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#ffffff', endColorstr='#c0ca33', GradientType=1 );
  }
  .contact{
    max-width: 700px;
    width: 96%;
    bottom: 10px;
    background-color: #FFF;
    padding: 0px 16px;
    border-radius: 12px;
    border-width: 1px;
    border-style: solid;
    border-color: var(--color_principal);
    box-shadow: 0 3px 12px 3px rgba(0, 0, 0, 0.1);
    margin: 0 10px;
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
    cursor: pointer;
    background-color: var(--color_principal);
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
  @media(max-width: 920px){
    .contacto_content{
      flex-direction: column;
    }
    .maps{
      margin-bottom: 10px;
    }
  }
</style>
