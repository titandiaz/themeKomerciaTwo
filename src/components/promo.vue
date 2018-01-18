<template>
  <div class="container-promo">
      <div class="promo-item promo-item-left promo-imagen" :style="{backgroundImage:`url(https://brainmakers.net/productos/${products[2].foto})`}">
          <!-- <div class="promo-imagen" :style="{backgroundImage:`url(https://brainmakers.net/tumb/${products[5].foto})`}"></div> -->
          <div class="border-promo"></div>
          <div class="promo-info">
              <h2 class="title-promo">{{products[2].nombre}}</h2>
              <p class="description-promo">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti facilis magnam quasi omnis ut rem aspernatur dolor laboriosam.</p>

          </div>
      </div>
      <div class="promo-item promo-item-center">
          <div class="promo-item-center-top promo-item-center-imagen" :style="{backgroundImage:`url(https://brainmakers.net/tumb/${products[0].foto})`}">
          <div class="border-item-center"><h1 class="title-promo-center">{{products[0].nombre}}</h1></div></div>
          <div class="promo-item-center-bottom promo-item-center-imagen" :style="{backgroundImage:`url(https://brainmakers.net/tumb/${products[1].foto})`}">
          <div class="border-item-center"><h1 class="title-promo-center">{{products[1].nombre}}</h1></div></div>
      </div>
      <div class="promo-item promo-item-right promo-imagen" :style="{backgroundImage:`url(https://brainmakers.net/productos/${products[3].foto})`}">
          <!-- <div class="promo-imagen" :style="{backgroundImage:`url(https://brainmakers.net/tumb/${products[0].foto})`}" ></div> -->
          <div class="border-promo"></div>
          <div class="promo-info">
              <h2 class="title-promo">{{products[3].nombre}}</h2>
              <p class="description-promo">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti facilis magnam quasi omnis ut rem aspernatur dolor laboriosam.</p>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    computed: {
        products() {
            return this.$store.state.productos.slice(0, 6)
        }
    }
}
</script>

<style>
.title-promo-center {
    text-align: center;
    color: #fff;
    font-size: 18px;
    display: flex;
}
.promo-item-center-imagen:hover {
    background-size: 450px;
}
.promo-item-center-imagen:hover .border-item-center {
    background-color: rgba(2, 8, 22, 0.315);
    height: 200px;
    bottom: 30px;
    opacity: 1;
}
.border-item-center {
    position: absolute;
    bottom: 50%; 
    width: 300px;
    height: 0;
    border: 1px solid var(--color_principal);
    opacity: 0;
    transition: all .3s;
    display: flex;
    justify-content: center;
    align-items: center;
}
.promo-item-center-imagen {
    background-size: 350px;
    background-position: center;
    position: relative;
    display: flex;
    justify-content: center;
    transition: all .5s;
}
.promo-imagen:hover .border-promo {
    background-color: rgba(2, 8, 22, 0.315);
    height: 500px;
    bottom: 30px;
    opacity: 1;
}
.promo-imagen:hover .promo-info {
    bottom: calc(50% - 95px);
}
.promo-imagen:hover {
    background-size: 630px;
}
.border-promo {
    position: absolute;
    bottom: 50%;
    width: 300px;
    height: 0px;
    border: 1px solid var(--color_principal);
    opacity: 0;
    transition: all .5s;
}
.description-promo {
    text-align: center;
    font-family: 'Helvetica', sans-serif;
    padding: 10px 30px;
    font-size: 15px;;
}
.title-promo {
    font-size: 16px;;
    max-width: 270px;
    text-transform: uppercase;
    text-align: center;
}
.promo-imagen {
    background-size: 560px;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    transition: all .8s;
}
.promo-info {
    /* z-index: 999; */
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;;
    height: 190px;
    background: var(--color_principal);
    bottom: 30px;
    transition: all .3s;
}
[class*=promo-item-center] {
    width: 100%;
    height: 265px;
    margin-bottom: 30px;
}
.promo-item {
    width: 360px;
    height: 560px;
    /* background: red; */
    margin: 60px 15px;
}
.promo-item-center {
    background: transparent;
}
.container-promo {
    display: flex;
    max-width: 1200px;
}
</style>
