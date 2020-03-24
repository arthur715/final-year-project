<template>
  <div id="moveRightBlock">
    {{blockNameProp}}
  </div>        
</template>

<script>
export default {
  name: 'move-right-block',
  components:{
  },
  props:{
    blockNameProp:{
      type: String,
      default: "Move Right",
      required: false,
    },
		blockIDProp:{
      type: Number,
      default: 1,
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
        blockName: "Move Right",
        blockID: 1,
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
#moveRightBlock{
  background-color: rgb(240, 178, 128);
  padding:12px 20px;
  color: white;
  cursor: grab;
}
</style>