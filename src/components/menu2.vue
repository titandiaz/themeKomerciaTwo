<template>
  <div class="header_main maxcontainer">
    <router-link to="/" class="header_brand">
        <figure class="header__logo">
          <img v-if="info.logo" :src="`https://komercia.co/logos/${info.logo}`" alt="">
        </figure>
        <h1 class="header__title">{{ info.nombre }}</h1>
    </router-link>
    <nav class="header_navigation">
      <ul class="header_navigation_list">
        <li class="header_navigation__item"><router-link to="/">Inicio</router-link></li>
        <li class="header_navigation__item"><router-link to="/catalogo">Catalogo</router-link></li>
        <li class="header_navigation__item"><router-link to="/pedido">Carrito</router-link></li>
        <li class="header_navigation__item"><router-link to="/contacto">Contacto</router-link></li>
      </ul>
    </nav>
    <i class="material-icons icon_menu" v-on:click="openMenuComponent">menu</i>
    <menu-lateral></menu-lateral>
  </div>
</template>

<script>
  import menuLateral from './menu_lateral.vue';

	export default {
    components: { menuLateral },
		data(){
			return {
			}
		},
		computed: {
			styles(){
				return {
					colorPrincipal:{backgroundColor: this.$store.state.colorPrincipal},
					colorSecundario: {backgroundColor: this.$store.state.colorSecundario}
				}
			},
			info() {
				return this.$store.state.tienda
			}
		},
    methods: {
      openMenuComponent(){
        this.$store.state.menuComponent = true;
      }
    }
	}
</script>

<style scoped>
  .header_main{
    height: 90px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: auto;
  }
  .header_brand{
    display: flex;
    align-items: center;
  }
  .header__logo{
    max-width: 70px;
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0px 10px 0 0;
    border-radius: 50%;
    overflow: hidden;
    background-color: #FFF;
    box-shadow: 0px 0px 0px 4px rgba(255,255,255, 0.5);
  }
  .header__logo img{
    width: 100%;
    height: auto;
  }
  .header__title{
    font-size: 1.25em;
    color: #FFF;
  }
  .icon_menu{
    display: none;
  }
  .header_navigation{
    height: 100%;
  }
  .header_navigation_list{
    height: 100%;
    list-style: none;
    display: flex;
  }
  .header_navigation__item{
    height: 100%;
    display: flex;
  }
  .header_navigation__item a{
    height: 100%;
    margin: 0 10px;
    display: flex;
    align-items: center;
    color: #FFF;
  }
  @media(max-width:700px){
    .header__logo{
      max-width: 55px;
      width: 100%;
      height: 55px;
    }
    .header__title{
      font-size: 1em;
      color: #FFF;
    }
    .icon_menu{
      display: flex;
      color: #FFF;
    }
    .header_navigation{
      display: none;
    }
  }
</style>
