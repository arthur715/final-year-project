<template>
  <div id="moveDownBlock">
    {{blockNameProp}}
  </div>        
</template>

<script>
export default {
  name: 'move-down-block',
  components:{
  },
  props:{
    blockNameProp:{
      type: String,
      default: "Move Down",
      required: false,
    },
		blockIDProp:{
      type: Number,
      default: 3,
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
        blockName: "Move Down",
        blockID: 3,
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
#moveDownBlock{
  background-color: rgb(175, 223, 137);
  padding:12px 20px;
  color: white;
  cursor: grab;
}
</style>
