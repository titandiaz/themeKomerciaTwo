<template>
  <div id="nosotros">
    <header>
        <header-menu></header-menu>
    </header>
    <section class="abouts">
      <div class="about_item" :style="{ 'boxShadow': styles.boxShadow, 'border': styles.border }">
        <h2>Nosotros</h2>
        <p>{{ info.nosotros | htmlToString}}</p>
      </div>
      <div class="about_item" :style="{ 'boxShadow': styles.boxShadow2, 'border': styles.border }" v-show="info.mision">
        <h2>Misión</h2>
        <p>{{ info. mision | htmlToString}}</p>
      </div>
      <div class="about_item" :style="{ 'boxShadow': styles.boxShadow3, 'border': styles.border }">
        <h2>Visión</h2>
        <p>{{ info.vision | htmlToString}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import headerMenu from './menu2.vue';

export default {
  components: { headerMenu },
  computed: {
    styles(){
      return {
        boxShadow: `35px 15px 0 0px ${this.$store.state.colorPrincipal}`,
        boxShadow2: `0px 15px 0 0px ${this.$store.state.colorPrincipal}`,
        boxShadow3: `-35px 15px 0 0px ${this.$store.state.colorPrincipal}`,
        border: `1px solid ${this.$store.state.colorPrincipal}`,
      }
    },
    info(){
      return this.$store.state.tienda;
    }
  },
  filters: {
    htmlToString(value){
      var html = value;
      var div = document.createElement("div");
      div.innerHTML = html;
      return div.textContent || div.innerText || "";
    }
  }
}
</script>

<style scoped>
  #nosotros{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  header{
    width: 100%;
    height: 90px;
    background-color: #9b9b9b;
    padding: 0 20px;
  }
  .abouts{
    width: 90%;
    min-height: calc(100vh - 306px);
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 30px 0;
  }
  .about_item{
    position: relative;
    max-width: 400px;
    align-self: center;
    padding: 10px;
    margin: 10px 10px 0 0;
    background-color: #FFF;
    border-radius: 3px;
    border: 1px solid peru;
    text-align: justify;
    box-shadow: 0px 15px 0 0px #e4e4e4;
    transition: all .5s;
    z-index: 2;
  }
  .about_item:first-of-type{
    box-shadow: 15px 5px 0 0px;
    z-index: 1;
  }
  .about_item:last-of-type{
    z-index: 1;
  }
</style>
