<template>
	<div class="menu">
		<ul class="maxcontainer">
			<li><router-link to="/">Inicio</router-link></li>
			<li><router-link to="/catalogo">Catalogo</router-link></li>
			<router-link to="/" class="logo_full">
				<figure class="logo">
					<img v-if="info.logo" :src="`https://komercia.co/logos/${info.logo}`" alt="">
				</figure>
			</router-link>
			<li><router-link to="/pedido">Carrito</router-link></li>
			<li><router-link to="/contacto">Contacto</router-link></li>
		</ul>
	</div>
</template>
<script>
	export default{
		computed: {
			info() {
				return this.$store.state.tienda
			},
		}
	}
</script>
<style scoped>
	.menu{
		position: absolute;
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 10px;
		z-index: 3;
		background-color: rgba(0,0,0,0.3);
	}
	ul{
		width: 100%;
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		align-items: center;
	}
	li{
		padding: 10px 20px;
		color: #FFF;
	}
	a{
		color: #FFF;
		font-weight: bold;
	}
	.menu li:first-child{
		border: 2px solid #FFF;
	}
	.logo{
		max-width: 80px;
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    overflow: hidden;
    background-color: #FFF;
    box-shadow: 0px 0px 0px 4px rgba(255,255,255, 0.5);
	}
	.logo img{
		width: 100%;
    height: auto;
	}
	@media(max-width: 800px){
		.menu{
			position: initial;
		}
	}
	@media(max-width: 650px){
		.logo_full{
			width: 100%;
			display: flex;
			justify-content: center;
		}
		.logo_full{
			order: -1;
		}
	}
</style>
