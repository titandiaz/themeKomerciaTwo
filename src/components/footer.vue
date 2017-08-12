<template>
  <footer>
        <div class="footer_content">
          <div class="footer_info">
            <p><i class="material-icons">phone</i>312 3914 859</p>
            <p><i class="material-icons">location_on</i>Direccion: Calle 16 # 30, 19. Medellin -Colombia</p>
            <p><i class="material-icons">watch_later</i>Horario: Lunes a viernes 8:00 am a 6: pm</p>
          </div>
          <div class="footer_content_social">
            <a v-show="facebook" :href="facebook" target="_blank" class="footer_content_social_item">
              <img src="../assets/social/facebook.png">
            </a>
            <a v-show="instagram" :href="instagram" target="_blank" class="footer_content_social_item">
              <img src="../assets/social/instagram.png">
            </a>
            <a v-show="youtube" :href="youtube" target="_blank" class="footer_content_social_item">
              <img src="../assets/social/youtube.png">
            </a>
            <a v-show="twitter" :href="twitter" target="_blank" class="footer_content_social_item">
              <img src="../assets/social/twitter.png">
            </a>
          </div>
        <div class="footer_actions">
          <input type="text" class="footer_actions_email" placeholder="Correo electronico">
          <button class="footer_actions_subscribe">Suscribete</button>
        </div>
        <div class="footer_about_legal">
          <router-link to="">Terminos y condiciones</router-link>
          <router-link to="">Politicas de reembolso</router-link>
          <router-link to="">Politicas de garantia</router-link>
          <router-link to="">Politicas de privacidad</router-link>
        </div>
      </div>
        <div class="footer_last">
          <span class="effects"></span>
          <p class="text">Desarrollado por komercia.co</p>
          <img src="../assets/komercia.png">
        </div>
  </footer>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    computed: {
      facebook(){
        return this.$store.state.tienda.red_facebook;
      },
      instagram(){
        return this.$store.state.tienda.red_instagram;
      },
      youtube(){
        return this.$store.state.tienda.red_youtube;
      },
      twitter(){
        return this.$store.state.tienda.red_twitter;
      }
    }
  }
</script>
<style scoped>
footer{
  width: 100%;
}
.footer_content{
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 20px 50px;
}
.footer_info{
  display: flex;
  flex-direction: column;
}
.footer_info p{
  display: flex;
  align-items: center;
  margin: 5px 0;
}
.footer_info p i{
  margin-right: 5px;
  font-size: 17px;
}
.footer_content_social{
  display: flex;
}
.footer_content_social_item{
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #9b9b9b;
  padding: 20px;
  margin: 0 5px;
}
.footer_content_social_item img{
  width: 25px;
}
.footer_actions{
  display: flex;
  justify-content: center;
  padding: 30px 0;
}
.footer_actions button{
  margin: 0px 20px;
  outline: none;
}
.footer_actions_email{
  max-width: 250px;
  width: 100%;
  border-radius: 100px;
  border: solid 1px #9b9b9b;
  font-size: 14px;
  background-color: transparent;
  padding: 10px;
  text-align: center;
  outline: none;
}
.footer_actions_subscribe{
  max-width: 180px;
  width: 100%;
  border-style: none;
  border-radius: 100px;
  background-color: #616062;
  color: #FFF;
  padding: 10px 40px;
  box-shadow: 3px 4px 7px 0 rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: .3s;
}
.footer_actions_subscribe:hover{
  transform: scale(0.95);
}
.footer_about_legal{
  width: 100%;
  display: flex;
  justify-content: center;
}
.footer_about_legal a{
  margin: 0 6px;
  text-decoration: underline;
  color: initial;
}
.footer_last{
  width: 100%;
  height: 60px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 30px;
  background-color: #616061;
  color: #FFF;
}
.footer_last .effects{
  width: 50%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  border-right: 0px solid transparent;
  border-left: 60px solid transparent;
  border-top: 60px solid #4a4a4a;
}
.footer_last img{
  width: 120px;
  z-index: 2;
}
@media(max-width: 380px){
  .footer_actions{
    flex-direction: column;
    align-items: center;
  }
  .footer_actions button{
    margin: 6px 0px;
  }
}
</style>
