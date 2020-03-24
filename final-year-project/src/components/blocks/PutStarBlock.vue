<template>
  <div id="putStarBlock">
    {{blockNameProp}}
  </div>        
</template>

<script>
export default {
  name: 'put-star-block',
  components:{
  },
  props:{
    blockNameProp:{
      type: String,
      default: "Put Star",
      required: false,
    },
		blockIDProp:{
      type: Number,
      default: 6,
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
        blockName: "Put Star",
        blockID: 6,
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
#putStarBlock{
  background-color: rgb(218, 158, 143);
  padding:12px 20px;
  color: white;
  cursor: grab;
}
</style>