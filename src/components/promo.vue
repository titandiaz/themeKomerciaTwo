<template>
  <div class="container-promo">
      <div class="promo-item promo-item-left promo-imagen" :style="{backgroundImage:`url(${$urlHttp}/productos/${products[2].foto})`}">
          <!-- <div class="promo-imagen" :style="{backgroundImage:`url(${$urlHttp}/tumb/${products[5].foto})`}"></div> -->
          <div class="border-promo"></div>
          <div class="promo-info">
            <h2 class="title-promo">{{products[2].nombre}}</h2>
            <p class="description-promo">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti facilis magnam quasi omnis ut rem aspernatur dolor laboriosam.</p>

          </div>
      </div>
      <div class="promo-item promo-item-center">
          <div class="promo-item-center-top promo-item-center-imagen" :style="{backgroundImage:`url(${$urlHttp}/tumb/${products[0].foto})`}">
          <div class="border-item-center"><h1 class="title-promo-center">{{products[0].nombre}}</h1></div></div>
          <div class="promo-item-center-bottom promo-item-center-imagen" :style="{backgroundImage:`url(${$urlHttp}/tumb/${products[1].foto})`}">
          <div class="border-item-center"><h1 class="title-promo-center">{{products[1].nombre}}</h1></div></div>
      </div>
      <div class="promo-item promo-item-right promo-imagen" :style="{backgroundImage:`url(${$urlHttp}/productos/${products[3].foto})`}">
          <!-- <div class="promo-imagen" :style="{backgroundImage:`url(${$urlHttp}/tumb/${products[0].foto})`}" ></div> -->
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
      return this.$store.state.productos.slice(0, 6);
    },
  },
};
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
  transition: all 0.3s;
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
  transition: all 0.5s;
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
  transition: all 0.5s;
}
.description-promo {
  text-align: center;
  font-family: 'Helvetica', sans-serif;
  padding: 10px 30px;
  font-size: 15px;
}
.title-promo {
  font-size: 16px;
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
  transition: all 0.8s;
}
.promo-info {
  /* z-index: 999; */
  left: calc(50% - 150px);
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  height: 190px;
  background: var(--color_principal);
  bottom: 30px;
  transition: all 0.3s;
}
[class*='promo-item-center'] {
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
  max-width: 1100px;
}
@media screen and (max-width: 1100px) {
  .container-promo {
    display: block;
    width: 100%;
    margin: 60px 0;
  }
  .promo-item {
    height: 260px;
    width: auto;
  }
  .promo-imagen {
    width: 100%;
    height: 400px;
    background-size: auto;
    margin: 0;
  }
  .promo-imagen {
    background-color: var(--color_principal) !important;
    background-size: auto 100%;
    background-repeat: no-repeat;
  }
  .promo-item-center {
    /* width: 100%; */
    display: flex;
  }
  .promo-item-center-imagen {
    background-size: auto 100%;
    background-repeat: no-repeat;
    height: 100%;
    background-color: var(--color_principal);
  }
  .promo-item-center-imagen ~ .promo-item-center-imagen {
    margin-left: 40px;
  }
  /* .border-item-center {
    width: 50%;
    right: 0;
  } */
  .promo-item-center-imagen:hover {
    background-size: auto 100%;
    background-position-x: 0;
  }
  .title-promo-center {
    /* color: #fff; */
    font-size: 30px;
    text-transform: uppercase;
    line-height: 1;
    color: #4a4a4a;
  }
  .promo-item-center-imagen:hover .border-item-center {
    background-color: rgba(255, 255, 255, 0.555);
    height: 200px;
    bottom: 30px;
    opacity: 1;
    /* display: none; */
  }
  .promo-imagen:hover .border-promo {
    background-color: rgba(2, 8, 22, 0.315);
    height: 90%;
    width: 90%;
    bottom: 20px;
    opacity: 1;
    display: none;
  }
  .promo-imagen:hover {
    background-size: auto 100%;
    background-position-x: 0;
  }
  .promo-imagen:hover .promo-info {
    bottom: calc(50% - 95px);
    left: calc(75% - 150px);
    align-items: flex-end;
  }
  .promo-imagen:hover .description-promo {
    text-align: right;
  }
  .promo-imagen:hover .title-promo {
    font-size: 30px;
    line-height: 1;
    width: 100%;
    padding: 0 30px;
    text-align: right;
  }
}
@media screen and (max-width: 700px) {
  .promo-item-center {
    margin: 35px 0px;
  }
  .promo-item-center-imagen {
    background-position: center !important;
    background-size: cover !important;
  }
  .border-item-center {
    height: 70px !important;
    width: 100%;
    border: 0;
    bottom: 0px !important;
    background-color: rgba(255, 255, 255, 0.555);
    opacity: 1;
  }
  .title-promo-center {
    font-size: 20px;
  }
  .promo-imagen {
    height: 300px;
  }
  .promo-imagen {
    background-size: auto 100%;
    background-position-x: 0;
  }
  .promo-info {
    bottom: calc(50% - 95px);
    left: calc(75% - 150px);
    align-items: flex-end;
  }
  .description-promo {
    text-align: right;
  }
  .title-promo {
    font-size: 30px;
    line-height: 1;
    width: 100%;
    padding: 0 30px;
    text-align: right;
  }
  @media screen and (max-width: 500px) {
    .container-promo {
      margin-top: 30px;
    }
    .main-title-promo {
      padding: 0;
      font-size: 20px;
    }
    .description-promo {
      display: none;
    }
    .title-promo {
      font-size: 20px;
      text-align: center;
    }
    .promo-imagen:hover .title-promo {
      font-size: 20px;
      text-align: center;
    }
    .promo-info {
      justify-content: center;
      align-items: center;
      left: calc(50% - 120px);
      height: 50px;
    }
    .promo-imagen:hover .promo-info {
      justify-content: center;
      align-items: center;
      left: calc(50% - 120px);
    }
    .promo-item-center {
      flex-direction: column;
      height: 600px;
    }
    .promo-item-center-imagen ~ .promo-item-center-imagen {
      margin: 0;
    }
    .product {
      border: 0;
    }
    /* .promo-item-center-imagen {
      height: 150px ;
    } */
  }
}
</style>
