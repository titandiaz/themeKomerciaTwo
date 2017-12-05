<template lang="html">
  <div class="ko-collapse">
    <div class="ko-collapse_tab"
         v-for="(tab, index) in data"
         v-show="tab.content != ''">
      <div class="ko-collapse_tab_header"
           v-on:click="toggleTab(tab, index)">
        <h3>{{tab.title}}</h3>
        <i :class="{'material-icons': true, rotate: !tab.showContent}">keyboard_arrow_right</i>
      </div>
      <div :class="{'ko-collapse_tab_content': true, hidden: tab.showContent}">
        <div v-html="tab.content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
    if(this.$store.state.politicas){
      this.data = this.politicas;
    }
  },
  data(){
    return {
      data: [],
    }
  },
  watch: {
    politicas(value){
      this.data = value;
    }
  },
  computed: {
    politicas(){
      let politicas = [
        {
          title: 'Politicas de envio',
          showContent: true,
          content: this.$store.state.politicas.envios
        },{
          title: 'Politicas de devoluciones y garantias',
          showContent: true,
          content: this.$store.state.politicas.garantia
        }
      ];
      return politicas;
    },
  },
  methods: {
    toggleTab(tab, index){
      tab.showContent = !tab.showContent;
    }
  }
}
</script>

<style lang="css">
  .ko-collapse{
    width: 100%;
    border-bottom: 1px solid #dedede;
  }
  .ko-collapse_tab_header{
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    border-top: 1px solid #dedede;
    cursor: pointer;
  }
  .ko-collapse_tab_header h3{
    font-size: 16px;
    font-weight: normal;
    color: #333;
  }
  .ko-collapse_tab_header .material-icons{
    transition: .3s;
    color: #333;
  }
  .ko-collapse_tab_header .material-icons.rotate{
    transform: rotate(90deg);
  }
  .ko-collapse_tab_content{
    opacity: 1;
    visibility: visible;
    transition: all .3s;
    color: #333;
  }
  .ko-collapse_tab_content p{
    color: #333;
  }
  .hidden{
    opacity: 0;
    visibility: hidden;
    height: 0px;
    overflow: hidden;
  }
</style>
