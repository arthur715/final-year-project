<template>
  <div id="selectorBlock">

    <div v-if="parentProp == null">
      {{blockNameProp}}
    </div>
    <div v-else>
      <div @contextmenu.prevent="$refs.ctxMenu.open">
        {{blockNameProp}}
      </div>
    </div>

    <context-menu id="context-menu1" ref="ctxMenu">
			<li class="ctx-item" @click="renameBlockNameProp"> Rename </li>
			<li class="ctx-item" @click="saveCustomSelector"> Save </li>
		</context-menu>
    
  </div>
</template>

<script>
import contextMenu from 'vue-context-menu'

export default {
  name: 'selector-block',
  components:{
    contextMenu,
  },
  props:{
    blockNameProp:{
      type: String,
      default: "Selector",
      required: false,
    },
		blockIDProp:{
      type: Number,
      default: 8,
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
        blockName: "Selector",
        blockID: 8,
        blockType: "control",
        parent: null,
        children: [[],[]],
        loopTimes: null,
        state: null,
        uid: null,
      },
      duplicateBlockNameInBlocksAlert: false,
		}
  },
  methods:{
    renameBlockNameProp: function(){
      var self = this
      this.$swal({  text: 'Rename the Selector', 
                    input: 'text', 
                    inputPlaceholder: this.blockNameProp, 
                    inputValidator: function(value){
                                      if (!self.hasText(value)){
                                        return 'Block name must be provided'
                                      }
                                    }
                 }).then( function(ans){
                            //window.console.log(ans.value)
                            if(ans.value){
                              self.$parent.$options.parent.blockHolderNodeArray[0].blockName = ans.value
                            }
                            else{
                              self.$parent.$options.parent.blockHolderNodeArray[0].blockName = self.blockNameProp
                            }
                          }
                        )
    },
    hasText: function(str){
      if(str.length == 0) return false
      
      var i;
      for(i = 0; i < str.length; i++){
        if(str[i] != " "){
          return true
        }
      }
      return false
    },
    saveCustomSelector: function(){
      if(this.blockNameProp == "Selector"){
        this.$swal({icon: 'error', text: 'Block must be renamed before save to repository'})
      }
      else{
        var i;
        for(i = 0; i < this.$root.$children[0].$refs.repository.$refs.repositoryBlocks.blocksList2D.length; i++){
          if(this.$root.$children[0].$refs.repository.$refs.repositoryBlocks.blocksList2D[i][0].blockName == this.blockNameProp){
            this.$swal({icon: 'error', text: 'Duplicate Block Name', footer: 'New name cannot be duplicated with the existed block name in the repository'})
            this.duplicateBlockNameInBlocksAlert = true
          }
        }
        for(i = 0; i < this.$root.$children[0].$refs.repository.$refs.repositoryBlocks.customBlocksList2D.length; i++){
          if(this.$root.$children[0].$refs.repository.$refs.repositoryBlocks.customBlocksList2D[i][0].blockName == this.blockNameProp){
            this.$swal({icon: 'error', text: 'Duplicate Block Name', footer: 'New name cannot be duplicated with the existed block name in the repository'})
            this.duplicateBlockNameInBlocksAlert = true
          }
        }
        if(!this.duplicateBlockNameInBlocksAlert){
          var newBlockObj = this.prepareNewBlockObjToRepository(this.$parent.$options.parent.blockHolderNodeArray[0])
          newBlockObj.parent = null
          this.$root.$children[0].$refs.repository.$refs.repositoryBlocks.customBlocksList2D.push([newBlockObj])
        }
        this.duplicateBlockNameInBlocksAlert = false
      }
    },
    prepareNewBlockObjToRepository: function(blockObj){
      var newBlockObj = {	blockName: null,
													blockID: null,
													blockType: null,
													parent: null,
                          children: null,
                          loopTimes: null,
													state: null,
													uid: null
                        }
      
      if(blockObj.children == null){
        newBlockObj.blockName = blockObj.blockName
        newBlockObj.blockID = blockObj.blockID
        newBlockObj.blockType = blockObj.blockType
        newBlockObj.parent = blockObj.parent
        newBlockObj.loopTimes = blockObj.loopTimes
        newBlockObj.state = blockObj.state

        return newBlockObj
      }

      if(blockObj.children.length > 0){
        var i
        newBlockObj.children = []
        for(i = 0; i < blockObj.children.length; i++){
          newBlockObj.children.push([])
          if(blockObj.children[i].length > 0){
            newBlockObj.children[i][0] = this.prepareNewBlockObjToRepository(blockObj.children[i][0])
          }
        }
      }
      
      newBlockObj.blockName = blockObj.blockName
      newBlockObj.blockID = blockObj.blockID
      newBlockObj.blockType = blockObj.blockType
      newBlockObj.parent = blockObj.parent
      newBlockObj.loopTimes = blockObj.loopTimes
      newBlockObj.state = blockObj.state

      return newBlockObj
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#selectorBlock{
  background-color: rgb(158, 131, 253);
  padding: 12px 20px;
  color: white;
  cursor: grab;
}
</style>