<template>
  <div id="moveUpBlock">
    {{blockNameProp}}
  </div>        
</template>

<script>
export default {
  name: 'move-up-block',
  components:{
  },
  props:{
    blockNameProp:{
      type: String,
      default: "Move Up",
      required: false,
    },
		blockIDProp:{
      type: Number,
      default: 2,
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
        blockName: "Move Up",
        blockID: 2,
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
#moveUpBlock{
  background-color: rgb(214, 197, 119);
  padding:12px 20px;
  color: white;
  cursor: grab;
}
</style>