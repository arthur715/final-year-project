<template>
  <div id="moveLeftBlock">
    {{blockNameProp}}
  </div>        
</template>

<script>
export default {
  name: 'move-left-block',
  components:{
  },
  props:{
    blockNameProp:{
      type: String,
      default: "Move Left",
      required: false,
    },
		blockIDProp:{
      type: Number,
      default: 0,
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
        blockName: "Move Left",
        blockID: 0,
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
#moveLeftBlock{
  background-color: lightcoral;
  padding:12px 20px;
  color: white;
  cursor: grab;
}
</style>