<template>
  <div id="mazeMovementBlock">
    {{blockNameProp}}
  </div>        
</template>

<script>
export default {
  name: 'maze-movement-block',
  components:{
  },
  props:{
    blockNameProp:{
      type: String,
      default: "Maze Movement",
      required: false,
    },
		blockIDProp:{
      type: Number,
      default: 13,
      required: false,
    },
		blockTypeProp:{
      type: String,
      default: "action",
      required: false,
    },
		parentProp:{
      type: String,
      default: null,
      required: false,
    },
		stateProp:{
      type: String,
      default: null,
      required: false,
    },
		uidProp:{
      type: Number,
      default: null,
      required: false,
    },
  },
  data: function(){
    return { 
      initialData:{
        blockName: "Maze Movement",
        blockID: 13,
        blockType: "action",
        parent: null,
        children: null,
        checkDirection: null,
        loopTimes: null,
        state: null,
        uid: null
      }
		}
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mazeMovementBlock{
  background-color: rgb(187, 187, 187);
  padding:12px 20px;
  color: white;
  cursor: grab;
}
</style>