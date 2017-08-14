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
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>facebook2</title>
              <path d="M29 0h-26c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h13v-14h-4v-4h4v-2c0-3.306 2.694-6 6-6h4v4h-4c-1.1 0-2 0.9-2 2v2h6l-1 4h-5v14h9c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3z"></path>
              </svg>
            </a>
            <a v-show="instagram" :href="instagram" target="_blank" class="footer_content_social_item">
              <img src="../assets/SVG/instagram.svg">
            </a>
            <a v-show="youtube" :href="youtube" target="_blank" class="footer_content_social_item">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>youtube</title>
              <path d="M31.681 9.6c0 0-0.313-2.206-1.275-3.175-1.219-1.275-2.581-1.281-3.206-1.356-4.475-0.325-11.194-0.325-11.194-0.325h-0.012c0 0-6.719 0-11.194 0.325-0.625 0.075-1.987 0.081-3.206 1.356-0.963 0.969-1.269 3.175-1.269 3.175s-0.319 2.588-0.319 5.181v2.425c0 2.587 0.319 5.181 0.319 5.181s0.313 2.206 1.269 3.175c1.219 1.275 2.819 1.231 3.531 1.369 2.563 0.244 10.881 0.319 10.881 0.319s6.725-0.012 11.2-0.331c0.625-0.075 1.988-0.081 3.206-1.356 0.962-0.969 1.275-3.175 1.275-3.175s0.319-2.587 0.319-5.181v-2.425c-0.006-2.588-0.325-5.181-0.325-5.181zM12.694 20.15v-8.994l8.644 4.513-8.644 4.481z"></path>
              </svg>
            </a>
            <a v-show="twitter" :href="twitter" target="_blank" class="footer_content_social_item">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
              <title>twitter</title>
              <path d="M32 7.075c-1.175 0.525-2.444 0.875-3.769 1.031 1.356-0.813 2.394-2.1 2.887-3.631-1.269 0.75-2.675 1.3-4.169 1.594-1.2-1.275-2.906-2.069-4.794-2.069-3.625 0-6.563 2.938-6.563 6.563 0 0.512 0.056 1.012 0.169 1.494-5.456-0.275-10.294-2.888-13.531-6.862-0.563 0.969-0.887 2.1-0.887 3.3 0 2.275 1.156 4.287 2.919 5.463-1.075-0.031-2.087-0.331-2.975-0.819 0 0.025 0 0.056 0 0.081 0 3.181 2.263 5.838 5.269 6.437-0.55 0.15-1.131 0.231-1.731 0.231-0.425 0-0.831-0.044-1.237-0.119 0.838 2.606 3.263 4.506 6.131 4.563-2.25 1.762-5.075 2.813-8.156 2.813-0.531 0-1.050-0.031-1.569-0.094 2.913 1.869 6.362 2.95 10.069 2.95 12.075 0 18.681-10.006 18.681-18.681 0-0.287-0.006-0.569-0.019-0.85 1.281-0.919 2.394-2.075 3.275-3.394z"></path>
              </svg>
            </a>
          </div>
        <div class="footer_actions">
          <input type="text" class="footer_actions_email" placeholder="Correo electronico">
          <button class="footer_actions_subscribe">Suscribete</button>
        </div>
        <div class="footer_about_legal">
          <router-link to="/manejo-de-datos">Politicas de manejo de datos</router-link>
          <!-- <router-link to="">Politicas de reembolso</router-link> -->
          <router-link to="/garantias">Politicas de garantia</router-link>
          <!-- <router-link to="">Politicas de privacidad</router-link> -->
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
.footer_content_social_item svg{
  fill: #616061;
  transform: scale(3);
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
