<template>
  <div id="nosotros">
    <section class="abouts maxcontainer">
      <div class="about_item">
        <h2>Nosotros</h2>
        <div v-html="info.nosotros"></div>
      </div>
      <div class="about_item" v-show="info.mision">
        <h2>Misión</h2>
        <div v-html="info.mision"></div>
      </div>
      <div class="about_item">
        <h2>Visión</h2>
        <div v-html="info.vision"></div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    info(){
      return this.$store.state.tienda;
    }
  },
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
    text-align: justify;
    transition: all .5s;
    z-index: 2;
  }
  .about_item:first-of-type{
    z-index: 1;
  }
  .about_item:last-of-type{
    z-index: 1;
  }
</style>
