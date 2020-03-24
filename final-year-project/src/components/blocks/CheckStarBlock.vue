<template>
  <div id="checkStarBlock">
    
		<div v-if="parentProp == null">
			{{blockNameProp}}
		</div>

		<div v-else>
			{{checkDirectionProp}}{{blockNameProp}}
		</div>

  </div>
</template>

<script>
export default {
  name: 'check-star-block',
  components:{
  },
  props:{
    blockNameProp:{
      type: String,
      default: " Is Star?",
      required: false,
    },
		blockIDProp:{
      type: Number,
      default: 9,
      required: false,
    },
		blockTypeProp:{
      type: String,
      default: "control",
      required: false,
    },
		parentProp:{
      type: String,
      default: null,
      required: false,
    },
		childrenProp:{
      type: Array,
      default: function(){var arr=[[],[]];return arr;},
      required: false,
		},
		checkDirectionProp:{
			type: String,
			default: "Left",
			required: false,
		},
		stateProp:{
      type: String,
      default: null,
      required: false,
    },
    loopTimesProp:{
      type: [Number, String],
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
        blockName: " Is Star?",
        blockID: 9,
        blockType: "control",
        parent: null,
				children: [[],[]],
				checkDirection: "Left", 
        loopTimes: null,
        state: null,
        uid: null,
      },
      duplicateBlockNameInBlocksAlert: false,
		}
  },
  methods:{
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#checkStarBlock{
  background-color: rgb(158, 131, 253);
  padding: 12px 20px;
  color: white;
  cursor: grab;
}
</style>