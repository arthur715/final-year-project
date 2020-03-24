<!-- repository have a fixed position, the body include the Blocks.vue where stores the actual blocks in the array -->
<template>
  <div id="repository">
    <div id="repositoryHead">Repository</div>
    <div id="repositoryBody">
      <Blocks ref="repositoryBlocks"></Blocks>
    </div>
    <div id="repositoryTail">
      <div id="tailTitle">Remove Block</div>
      <draggable 
        class="dragArea removeBlock"
        id="removeBlockArea"
        :group="{ name: 'remove', pull: false, put: ['blockHolder', 'customBlocks']}"
        @add="deleteBlock"
      >
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Blocks from "./Blocks.vue"

export default {
  name: "Repository",
  components: {
    draggable, Blocks
  },
  methods:{
    deleteBlock: function(){
    /* 
       this.$el: repository
       this.$el.lastChild : repositoryTail
       this.$el.lastChild.lastChild.innerHTML: html content inside draggable
    */
    this.$el.lastChild.lastChild.innerHTML = ""
    }
  }
};
</script>

<style scoped>
  #repository{
      background-color: lightgray;
      width: 18%;
      height: 100%;
      padding: 0px 0px 0px 0px;
      margin: 0px 0px 0px 0px;
      float: left;
      position:absolute;
      max-height: 800px;
  }
  #repositoryHead{
    background-color: lightcoral;
    font-size: 125%;
  }
  #repositoryBody{
    background-color: lightgoldenrodyellow;
    padding: 10px 30px 10px 30px;
    height:90%;
    overflow: scroll;
    max-height: 686px;
  }
  #repositoryTail{
    background-color: red;
    height:10%;
    padding: 0px;
  }
  .removeBlock{
    background-color: rgb(228, 82, 82);
    height: 90%;
    padding: 4px 30px 4px 30px;
    max-height: 60px;
  }
</style>