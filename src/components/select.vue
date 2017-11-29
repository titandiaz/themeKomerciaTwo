<template>
  <div class="ko-select">

    <div class="ko-select_input_comodin"
          v-on:click="openOptions">
          <i class="material-icons">keyboard_arrow_down</i>
    </div>

    <input type="text"
           disabled
           :placeholder="placeholder"
           class="ko-select_input"
           v-model="valueInput">

    <ul class="ko-select_options"
        v-show="showList">
      <li class="ko-select_options_item"
          v-for="option in options"
          v-on:click="selectedOption(option)">
          {{option.value}}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  props: ['placeholder', 'options'],
  data(){
    return {
      showList: false,
      valueInput: '',
    }
  },
  methods: {
    openOptions(e){
        document.addEventListener("click", () => {
            this.showList = false;
        });
      setTimeout(() => {
        this.showList = !this.showList;
      }, 100)
      this.rotateIcon();
    },
    selectedOption(option){
      this.valueInput = option.value;
      this.showList = false;
    },
    rotateIcon(){
      if(this.showList){
        document.querySelector('.ko-select_input_comodin i').classList.add('rotate');
      }else{
        document.querySelector('.ko-select_input_comodin i').classList.remove('rotate');
      }
    }
  }
}
</script>

<style scoped>
  .ko-select{
    position: relative;
    width: 250px;
    height: 40px;
  }
  .ko-select_input_comodin{
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 0 5px;
    align-items: center;
    background-color: rgba(0,0,0,0);
    z-index: 2;
    cursor: pointer;
  }
  #keyboardArrow{
    pointer-events: none;
    transition: .3s;
  }
  #keyboardArrow.rotate{
    transform: rotate(180deg);
  }
  .ko-select_input{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    border-style: none;
    border: 1px solid #d8dce5;
    border-radius: 4px;
    padding: 0 10px;
  }
  .ko-select_input:disabled{
    background-color: #FFF;
  }
  .ko-select_options{
    position: absolute;
    top: calc(100% + 10px);
    width: 250px;
    background-color: #FFF;
    list-style: none;
    border: 1px solid #dfe4ed;
    border-radius: 4px;
    cursor: pointer;
    z-index: 3
  }
  .ko-select_options_item{
    padding: 3px 10px;
  }
  .ko-select_options_item:hover{
    background-color: #dfe4ed;
  }
</style>
