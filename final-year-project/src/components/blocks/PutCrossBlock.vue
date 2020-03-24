<template>
  <div id="putCrossBlock">
    {{blockNameProp}}
  </div>        
</template>

<script>
export default {
  name: 'put-cross-block',
  components:{
  },
  props:{
    blockNameProp:{
      type: String,
      default: "Put Cross",
      required: false,
    },
		blockIDProp:{
      type: Number,
      default: 7,
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
        blockName: "Put Cross",
        blockID: 7,
        blockType: "action",
        parent: null,
        children: null,
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
#putCrossBlock{
  background-color: rgb(219, 177, 212);
  padding:12px 20px;
  color: white;
  cursor: grab;
}
</style>