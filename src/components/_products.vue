<template>
	<div id="products">
		<router-view></router-view>
		<order></order>
		<header>
			<header-menu></header-menu>
		</header>
		<div class="header_fixed">
			<i class="material-icons toggleFilters" v-on:click="toggleFilters">filter_list</i>
			<label for="searchProduct" class="header__search"><i class="material-icons">search</i><input type="text" id="searchProduct" placeholder="Buscar producto" v-model="search"></label>
			<div v-on:click="openOrderComponent" class="header__cart" :style="styles.colorPrincipal">
				<i class="material-icons">shopping_cart</i>
				<p>{{ productsCart }}</p>
			</div>
		</div>
		<div class="products">
			<aside class="shortcuts" id="shortcuts">
				<div class="sticky">
					<ul class="categorias">
						<li class="categorias_item" v-for="categoria in categorias">
							<p v-on:click="selectCat(categoria)">{{categoria.nombre_categoria_producto}}</p>
							<ul class="subcategorias" v-show="categoria.id == selCat">
								<li class="subcategorias_item" v-for="subcategoria in subcategorias" v-if="subcategoria.categoria == categoria.id">
									<p v-on:click="selectSubcat(subcategoria)">{{subcategoria.nombre_subcategoria}}</p>
								</li>
							</ul>
						</li>
						<li class="categorias_item">
							<p v-on:click="allSelectCat">Todos los Productos</p>
						</li>
					</ul>
					<div class="shortcuts_shopping_cart">
						<h3>Carrito de compras</h3>
						<p>Añade tus productos favoritos al carrito</p>
						<div>
							<img src="../assets/shopping.png">
							<p v-on:click="openOrderComponent" :style="">Ir al Carrito</p>
						</div>
					</div>
				</div>
			</aside>
			<section class="products_list">
				<product v-if="filteredProducts" v-for="product in filteredProducts" :data="product" :key="product.id"></product>
				<product  v-if="!filteredProducts" v-for="product in productsData" :data="product" :key="product.id"></product>
			</section>
		</div>
	</div>
</template>
<script>
	import headerMenu from './menu2.vue';
  import product from './product.vue';
	import Order from './order.vue';

	export default {
		components: { product, Order, headerMenu },
		created(){
				window.addEventListener('scroll', this.handleScroll);
		},
		destroyed(){
			window.removeEventListener('scroll', this.handleScroll);
		},
		data(){
			return {
				search: '',
				selCat: 0,
				filteredProducts: null,
				products: null,
				moreProducts: 40,
			}
		},
		watch: {
			search: function () {
				this.searchProduct();
			},
	    productsData: function (value) {
				this.$store.commit('productsPurchased');
	    }
  	},
		computed: {
			productsCart(){
				return	this.$store.state.productsCart.length;
			},
			styles(){
				return {
					colorPrincipal:{backgroundColor: this.$store.state.colorPrincipal},
					colorSecundario: {backgroundColor: this.$store.state.colorSecundario}
				}
			},
			productsData() {
				return this.$store.state.productos
			},
			info() {
				return this.$store.state.tienda
			},
			categorias() {
				return this.$store.state.categorias
			},
			subcategorias() {
				return this.$store.state.subcategorias
			}
		},
		methods: {
			handleScroll(){
				if (document.body.scrollTop > 60) {
					document.getElementById("shortcuts").classList.add('effectScroll');
				} else {
					document.getElementById("shortcuts").classList.remove('effectScroll');
				}
			},
			openOrderComponent(){
				  this.$store.state.orderComponent = true;
			},
			toggleFilters(){
				document.getElementById('shortcuts').classList.toggle('toggleFilter');
			},
			searchProduct(){
				let search = this.search;
				search = search.toLowerCase()
				let filters = this.productsData.filter(product => product.nombre.toLowerCase().includes(search))
				this.filteredProducts = filters;
			},
			selectCat(categoria){
				this.selCat = categoria.id;
				let filters = this.productsData.filter(product => product.categoria == categoria.nombre_categoria_producto);
				this.filteredProducts = filters;
			},
			allSelectCat(){
				this.filteredProducts = null;
			},
			selectSubcat(subcategoria){
				let filters = this.productsData.filter(product => product.subcategoria == subcategoria.id)
				this.filteredProducts = filters;
			}
		}
	}
</script>
<style scoped>
	header{
		position: relative;
		width: 100%;
		height: 90px;
		background-color: #e4e4e4;
		padding: 0 20px;
	}
	.header_fixed{
		position: sticky;
		top: 0px;
		width: 100%;
		height: 60px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #e4e4e4;
		z-index: 2;
		padding: 0 10px;
	}
	.header_fixed > span{
		width: 200px;
		height: 1px;
	}
	.header__search{
		max-width: 350px;
		width: 100%;
		height: 40px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 10px;
		background-color: #FFF;
		border-radius: 8px;
		overflow: hidden;
		margin: 0 10px;
	}
	.header__search i{
		color: #5c5c5c;
	}
	.header__search input{
		width: 91%;
		height: 100%;
		outline: none;
		border-style: none;
	}
	.header__cart{
		color: #FFF;
		display: flex;
		align-items: center;
		border-radius: 8px;
		overflow: hidden;
		cursor: pointer;
		flex: none;
	}
	.header__cart i{
		padding-left: 10px;
		font-size: 1.2em;
	}
	.header__cart p{
		height: 40px;
		display: flex;
		align-items: center;
		background-color: rgba(0,0,0,0.4);
		padding: 0 10px;
		margin-left: 10px;
		font-size: 1em;
	}
	.material-icons.toggleFilters{
		cursor: pointer;
	}
	.products{
		display: flex;
		width: 100%;
		min-height: calc(100vh - 366px)
	}
	.shortcuts{
		position: relative;
		width: 300px;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		/*background-color: #EEE;*/
	}
	.sticky{
		position: sticky;
		top: 10px;
		margin-top: -50px;
		z-index: 3;
	}
	.categorias{
		position: sticky;
		width: 200px;
		padding: 10px;
		border-radius: 12px;
		box-shadow: 0 14px 31px 6px rgba(121, 121, 121, 0.1);
		background-color: #FFF;
		list-style: none;
	}
	.categorias_item{
		margin-left: 20px;
		cursor: pointer;
		padding: 6px 0;
	}
	.subcategorias{
		list-style: none;
	}
	.subcategorias_item{
		margin-left: 20px;
		cursor: pointer;
		padding: 5px 0;
		font-size: 13px;
	}
	.shortcuts_shopping_cart{
		width: 200px;
		display: flex;
		flex-direction: column;
		margin-top: 15px;
		padding: 10px 15px;
		border-radius: 12px;
		box-shadow: 0 14px 31px 6px rgba(121, 121, 121, 0.1);
		background-color: #FFF;
		text-align: center;
	}
	.shortcuts_shopping_cart h3{
		font-size: 16px;
	}
	.shortcuts_shopping_cart > p{
		font-size: 13px;
		margin: 6px 0;
	}
	.shortcuts_shopping_cart div{
		margin-top: 3px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.shortcuts_shopping_cart div img{
		max-width: 35px;
		margin-right: 10px;
	}
	.shortcuts_shopping_cart div p{
		color: #e66a07;
		font-size: 13px;
		font-weight: bold;
		cursor: pointer;
	}
	.products_list{
		width: calc(100% - 300px);
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	@media(max-width: 950px){
		.products_list{
			width: 100%;
		}
		.shortcuts{
			position: fixed;
			top: 150px;
			left: -300px;
			height: calc(100vh - 90px);
			background-color: #e4e4e4;
			z-index: 4;
			transition: left .3s;
		}
		.shortcuts.toggleFilter{
			left: 0;
		}
		.shortcuts.effectScroll{
			top: 60px;
			height: 100vh;
		}
		.shortcuts .sticky{
			position: initial;
			margin-top: 0px;
		}
	}
	@media(max-width: 300px){
		.header_fixed{
			flex-wrap: wrap;
			justify-content: space-between;
			height: initial;
		}
		.header__search{
			width: 100%;
			order: 3;
			margin: 5px 0;
		}
		.material-icons.toggleFilters{
			order: 1;
		}
		.header__cart{
			order: 2;
			margin-top: 5px;
		}
	}
</style>
