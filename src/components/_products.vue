<template>
	<div id="products">
		<!-- <div class="header_fixed">
			<i class="material-icons toggleFilters" v-on:click="toggleFilters">filter_list</i>
			<label for="searchProduct" class="header__search"><i class="material-icons">search</i><input type="text" id="searchProduct" placeholder="Buscar producto" v-model="search"></label>
			<div v-on:click="openOrderComponent" class="header__cart">
				<i class="material-icons">shopping_cart</i>
				<p>{{ productsCart }}</p>
			</div>
		</div> -->
		<div class="dropdown">
			<button class="dropbtn">Categorias &#9662;</button>
			<ul class="dropdown-content">
				<li v-for="categoria in categorias">
					<p v-on:click="selectCat($event, categoria)" class="paragraph-categorias-item">{{categoria.nombre_categoria_producto}}</p>
					<ul>
					  <li v-for="subcategoria in subcategorias" v-if="subcategoria.categoria == categoria.id">
              <p v-on:click="selectSubcat($event, subcategoria)">{{subcategoria.nombre_subcategoria}}</p>
            </li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="products maxcontainer">
			<aside class="shortcuts" id="shortcuts">
				<div class="sticky">
					<ul class="categorias">
						<li class="categorias_item" v-for="categoria in categorias">
							<p v-on:click="selectCat($event, categoria)" class="paragraph-categorias-item">{{categoria.nombre_categoria_producto}}</p>
							<ul class="subcategorias" v-show="categoria.id == selCat">
								<li class="subcategorias_item" v-for="subcategoria in subcategorias" v-if="subcategoria.categoria == categoria.id">
									<p v-on:click="selectSubcat($event, subcategoria)" class="paragraph-categorias-item">{{subcategoria.nombre_subcategoria}}</p>
								</li>
							</ul>
						</li>
						<li class="categorias_item">
							<p v-on:click="allSelectCat" class="paragraph-categorias-item">Todos los Productos</p>
						</li>
					</ul>
					<div class="shortcuts_shopping_cart">
						<h3>Carrito de compras</h3>
						<p>Añade tus productos favoritos al carrito</p>
						<div>
							<img src="../assets/shopping.png">
							<p v-on:click="openOrderComponent">Ir al Carrito</p>
						</div>
					</div>
				</div>
			</aside>
			<section class="products_list">
				<div v-if="products" class="pagination">
					<product v-for="product in products" v-show="product.foto != ''" :data="product" :key="product.id"></product>
					<div v-show="productsData.length != 0 & products.length == 0" class="empty_products">
						<p>No hay productos</p>
						<button v-on:click="allSelectCat">Ver todos los productos</button>
					</div>
					<infinite-loading @infinite="infiniteHandler" spinner="spiral">
						<span slot="no-more"></span>
					</infinite-loading>
				</div>
			</section>
		</div>
	</div>
</template>
<script>
import Product from "./product.vue";
import Order from "./order.vue";
import InfiniteLoading from "vue-infinite-loading";

export default {
  components: { Product, Order, InfiniteLoading },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    this.$store.commit("productsPurchased");
    this.products = this.productsData.slice(0, this.moreProducts);
  },
  data() {
    return {
      search: "",
      selCat: 0,
      filteredProducts: null,
      moreProducts: 0,
      paginationActions: true
    };
  },
  watch: {
    // 	search: function () {
    // 		this.searchProduct();
    // 		if(this.search == ''){
    // 			this.paginationActions = true;
    // 		}
    // 	},
    "$route.path": function() {
      this.$store.commit("productsPurchased");
    },
    productsData: function(value) {
      this.products = this.productsData.slice(0, 40);
      this.$store.commit("productsPurchased");
    }
  },
  computed: {
    products: {
      get() {
        return this.$store.state.searchProducts;
      },
      set(newValue) {
        this.$store.state.searchProducts = newValue;
      }
    },
    productsPlaceholder() {
      return this.$store.state.productsPlaceholder;
    },
    // productsCart() {
    //   return this.$store.state.productsCart.length;
    // },
    productsData() {
      return this.$store.state.productos;
    },
    info() {
      return this.$store.state.tienda;
    },
    categorias() {
      return this.$store.state.categorias;
    },
    subcategorias() {
      return this.$store.state.subcategorias;
    },
    searchProducts() {
      return this.$store.state.searchProducts;
    }
  },
  methods: {
    infiniteHandler($state) {
      let data = this.productsData.slice(
        this.moreProducts,
        this.moreProducts + 40
      );
      this.moreProducts += 40;
      this.products = this.products.concat(data);
      setTimeout(() => {
        if (this.productsData.length <= this.moreProducts) {
          $state.complete();
        } else {
          $state.loaded();
        }
      }, 1000);
    },
    handleScroll() {
      if (document.body.scrollTop > 60) {
        document.getElementById("shortcuts").classList.add("effectScroll");
      } else {
        document.getElementById("shortcuts").classList.remove("effectScroll");
      }
    },
    openOrderComponent() {
      this.$store.state.orderComponent = true;
    },
    toggleFilters() {
      document.getElementById("shortcuts").classList.toggle("toggleFilter");
    },
    // searchProduct(){
    // 	var options = {
    // 		shouldSort: true,
    // 		threshold: 0.6,
    // 		location: 0,
    // 		distance: 100,
    // 		maxPatternLength: 32,
    // 		minMatchCharLength: 1,
    // 		keys: [
    // 			"nombre",
    // 		]
    // 	};
    // 	this.$search(this.search, this.productsData, options).then(results => {
    // 		this.products = results;
    // 	})
    // 	this.paginationActions = false;
    // },
    selectCat(e, categoria) {
      // this.setSelected(e);
      this.paginationActions = false;
      this.selCat = categoria.id;
      this.filteredProducts = this.productsData.filter(
        product => product.categoria == categoria.nombre_categoria_producto
      );
      this.products = this.filteredProducts;
    },
    allSelectCat(e) {
      // this.setSelected(e);
      this.paginationActions = true;
      this.moreProducts = 40;
      this.pages = 1;
      this.products = this.productsData.slice(0, this.moreProducts);
    },
    selectSubcat(e, subcategoria) {
      // this.setSelected(e);
      this.paginationActions = false;
      this.filteredProducts = this.productsData.filter(
        product => product.subcategoria == subcategoria.id
      );
      this.products = this.filteredProducts;
    },
    setSelected(e) {
      if (document.querySelector(".categorias_item .selected")) {
        document
          .querySelector(".categorias_item .selected")
          .classList.remove("selected");
      }
      e.target.classList.add("selected");
      this.toggleFilters();
    }
  }
};
</script>
<style scoped>
.header_fixed {
  position: sticky;
  top: 0px;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 2;
  padding: 0 10px;
  background-color: var(--color_principal);
}
.header_fixed > span {
  width: 200px;
  height: 1px;
}
.header__search {
  max-width: 350px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 10px;
}
.header__search i {
  color: #5c5c5c;
}
.header__search input {
  width: 91%;
  height: 100%;
  outline: none;
  border-style: none;
}
.header__cart {
  color: #fff;
  display: flex;
  align-items: center;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  flex: none;
  background-color: rgba(0, 0, 0, 0.25);
}
.header__cart i {
  padding-left: 10px;
  font-size: 1.2em;
}
.header__cart p {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin-left: 10px;
  font-size: 1em;
}
.material-icons.toggleFilters {
  color: #fff;
  cursor: pointer;
}
.products {
  display: flex;
  margin: auto;
  width: 100%;
  min-height: calc(100vh - 366px);
}
.shortcuts {
  position: relative;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
.sticky {
  position: sticky;
  top: 10px;
  /* margin-top: -50px; */
  z-index: 3;
  padding-right: 15px;
  border-right: solid 1px var(--color_secundario);
}
.categorias {
  position: sticky;
  width: 200px;
  padding: 10px;
  /* border-radius: 12px; */
  /* box-shadow: 0 14px 31px 6px rgba(121, 121, 121, 0.1); */
  background-color: #fff;
  list-style: none;
}
.categorias_item {
  margin-left: 20px;
  cursor: pointer;
  padding: 6px 0;
}
.subcategorias {
  list-style: none;
}
.subcategorias_item {
  margin-left: 20px;
  cursor: pointer;
  padding: 5px 0;
  font-size: 13px;
}
/* .categorias_item .selected{
		padding: 5px;
		border-radius: 5px;
		transition: .1s;
		background: rgb(240,240,240);
		color: #FFF;
		background-color: var(--color_principal);

	} */
.paragraph-categorias-item:hover {
  padding-left: 10px;
  color: var(--color_secunadario);
}
.shortcuts_shopping_cart {
  width: 200px;
  display: flex;
  flex-direction: column;
  margin-top: 15px;
  padding: 10px 15px;
  /* border-radius: 12px; */
  /* box-shadow: 0 14px 31px 6px rgba(121, 121, 121, 0.1); */
  background-color: #fff;
  text-align: center;
}
.shortcuts_shopping_cart h3 {
  font-size: 16px;
}
.shortcuts_shopping_cart > p {
  font-size: 13px;
  margin: 6px 0;
}
.shortcuts_shopping_cart div {
  margin-top: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shortcuts_shopping_cart div img {
  max-width: 35px;
  margin-right: 10px;
}
.shortcuts_shopping_cart div p {
  color: #e66a07;
  font-size: 13px;
  font-weight: bold;
  cursor: pointer;
}
.products_list {
  width: calc(100% - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.products_list .pagination {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.pagination_actions {
  display: flex;
  align-items: center;
  margin: 10px 0 0 0;
}
.pagination_actions button {
  border-style: none;
  background-color: transparent;
  border: 1px solid #cfcfcf;
  border-radius: 4px;
  padding: 0px;
  margin: 0 2px;
  color: #585858;
  font-size: 1px;
  outline: none;
  cursor: pointer;
  transition: 0.3s;
}
.pagination_actions button:hover {
  transform: scale(1.1);
}
.pagination_actions button i {
  font-size: 19px;
  font-weight: bold;
}
.pagination_actions p {
  margin: 0 2px;
}
.products {
  margin-top: 60px;
}
.empty_products {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
}
.empty_products button {
  margin: 10px;
  padding: 5px 30px;
  cursor: pointer;
  color: var(--color_secundario);
  border-style: none;
  outline: none;
  transition: 0.3s;
  background-color: transparent;
}
.dropdown {
  display: none;
}

@media (max-width: 950px) {
  .maxcontainer {
    margin: 0;
    padding: 0;
  }
  .dropbtn {
    background-color: var(--color_secundario);
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border: none;
    cursor: pointer;
  }
  .dropdown {
    margin: 60px 0 40px;
    position: relative;
    display: inline-block;
    left: calc(50% - 60px);
    /* display: flex; */
    justify-content: center;
    /* left: 20px; */
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background: #f9f9f9;
    min-width: 120px;
    box-shadow: 0 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
  .dropdown-content li {
    color: black;
    padding: 8px 10px;
    text-decoration: none;
    display: block;
  }
  .dropdown-content a:hover {
    background-color: #f1f1f1;
  }
  .dropdown:hover .dropdown-content {
    display: block;
    position: absolute;
  }

  .dropdown:hover .dropbtn {
    background-color: var(--color_primario);
    color: var(--color_secundario);
  }
  .dropdown-content ul {
    display: none;
    position: absolute;
    background: #e7e7e7;
    min-width: 120px;
    box-shadow: 0 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 2;
    left: 70%;
  }
  .dropdown-content li:hover {
    background: rgb(240, 240, 240);
    cursor: pointer;
  }
  .dropdown-content li:hover ul {
    display: block;
  }
  .products_list {
    width: 100%;
  }
  .shortcuts {
    position: fixed;
    top: 150px;
    left: -300px;
    height: calc(100vh - 90px);
    background-color: #e4e4e4;
    z-index: 4;
    transition: left 0.3s;
    display: none;
  }
  .shortcuts.toggleFilter {
    left: 0;
  }
  .shortcuts.effectScroll {
    top: 60px;
    height: 100vh;
  }
  .shortcuts .sticky {
    position: initial;
    margin-top: 0px;
  }
}
@media (max-width: 300px) {
  .header_fixed {
    flex-wrap: wrap;
    justify-content: space-between;
    height: initial;
  }
  .header__search {
    width: 100%;
    order: 3;
    margin: 5px 0;
  }
  .material-icons.toggleFilters {
    order: 1;
  }
  .header__cart {
    order: 2;
    margin-top: 5px;
  }
}
</style>
