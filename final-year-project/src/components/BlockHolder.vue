<template>
  <div :style="blockHolderStyle" id="blockHolder">
    <draggable 
      class="dragArea list-group"
      :list="blockHolderNodeArray"
      :group="{ name: 'blockHolder', pull: function(){return !hasToggled}, put: function(to, from){
                                                                                  if(to.el.children.length == 1){
                                                                                    return false;
                                                                                  }else{
                                                                                    return true;
                                                                                  }
                                                                                } 
              }"
      @add="updateParentProp"
      @remove="updateCodeCompiled"
    >

      <div v-for="(block,index) in blockHolderNodeArray" :key="index">
        
        <div class="list-group-item" v-if="block.blockID==0">
          <MoveLeftBlock :blockNameProp="blockHolderNodeArray[0].blockName"
                         :blockIDProp="blockHolderNodeArray[0].blockID"
                         :blockTypeProp="blockHolderNodeArray[0].blockType"
                         :parentProp="blockHolderNodeArray[0].parent"
                         :stateProp="blockHolderNodeArray[0].state"
                         :uidProp="blockHolderNodeArray[0].uid"
          >
          </MoveLeftBlock>
        </div>

        <div class="list-group-item" v-else-if="block.blockID==1">
          <MoveRightBlock :blockNameProp="blockHolderNodeArray[0].blockName"
                          :blockIDProp="blockHolderNodeArray[0].blockID"
                          :blockTypeProp="blockHolderNodeArray[0].blockType"
                          :parentProp="blockHolderNodeArray[0].parent"
                          :stateProp="blockHolderNodeArray[0].state"
                          :uidProp="blockHolderNodeArray[0].uid"
          >
          </MoveRightBlock>
        </div>

        <div class="list-group-item" v-else-if="block.blockID==2">
          <MoveUpBlock :blockNameProp="blockHolderNodeArray[0].blockName"
                       :blockIDProp="blockHolderNodeArray[0].blockID"
                       :blockTypeProp="blockHolderNodeArray[0].blockType"
                       :parentProp="blockHolderNodeArray[0].parent"
                       :stateProp="blockHolderNodeArray[0].state"
                       :uidProp="blockHolderNodeArray[0].uid"
          >
          </MoveUpBlock>
        </div>

        <div class="list-group-item" v-else-if="block.blockID==3">
          <MoveDownBlock :blockNameProp="blockHolderNodeArray[0].blockName"
                         :blockIDProp="blockHolderNodeArray[0].blockID"
                         :blockTypeProp="blockHolderNodeArray[0].blockType"
                         :parentProp="blockHolderNodeArray[0].parent"
                         :stateProp="blockHolderNodeArray[0].state"
                         :uidProp="blockHolderNodeArray[0].uid"
          >
          </MoveDownBlock>
        </div>

        <div class="list-group-item" id="sequencerBlockBody" v-else-if="block.blockID==4">
            <div v-on:click="toggleControlBlockBody" v-b-toggle="`${blockHolderNodeArray[0].uid}`">
              <SequencerBlock :blockNameProp="blockHolderNodeArray[0].blockName"
                              :blockIDProp="blockHolderNodeArray[0].blockID"
                              :blockTypeProp="blockHolderNodeArray[0].blockType"
                              :parentProp="blockHolderNodeArray[0].parent"
                              :childrenProp="blockHolderNodeArray[0].children"
                              :stateProp="blockHolderNodeArray[0].state"
                              :uidProp="blockHolderNodeArray[0].uid"
              >
              </SequencerBlock>
            </div>
            <b-collapse :id="`${blockHolderNodeArray[0].uid}`">
              <div v-for="(childrenNodeArray, index) in block.children" :key="index">
                <block-holder :blockHolderNodeArray="childrenNodeArray" :blockHolderOrderNo="index" blockHolderRegion="Sequencer"></block-holder>
              </div> 
              <div class="addSequencerHolder" v-on:click="addControlBlockHolder"><h3>+</h3></div>
              <div class="minusSequencerHolder" v-on:click="removeControlBlockHolder"><h3>–</h3></div>
            </b-collapse>
        </div>

        <div class="list-group-item" id="looperBlockBody" v-else-if="block.blockID==5">
            <div v-on:click="toggleControlBlockBody" v-b-toggle="`${blockHolderNodeArray[0].uid}`">
              <LooperBlock  :blockNameProp="blockHolderNodeArray[0].blockName"
                            :blockIDProp="blockHolderNodeArray[0].blockID"
                            :blockTypeProp="blockHolderNodeArray[0].blockType"
                            :parentProp="blockHolderNodeArray[0].parent"
                            :childrenProp="blockHolderNodeArray[0].children"
                            :loopTimesProp="blockHolderNodeArray[0].loopTimes"
                            :stateProp="blockHolderNodeArray[0].state"
                            :uidProp="blockHolderNodeArray[0].uid"
              >
              </LooperBlock>
            </div>
            <b-collapse :id="`${blockHolderNodeArray[0].uid}`">
              <div class="looperRepeatTimes" @click="changeLoopTimes"><h6>Loop Times: {{blockHolderNodeArray[0].loopTimes}}</h6></div>
              <div v-for="(childrenNodeArray, index) in block.children" :key="index">
                <block-holder :blockHolderNodeArray="childrenNodeArray" :blockHolderOrderNo="index" blockHolderRegion="Looper"></block-holder>
              </div>
            </b-collapse>
        </div>

        <div class="list-group-item" v-else-if="block.blockID==6">
          <PutStarBlock :blockNameProp="blockHolderNodeArray[0].blockName"
                        :blockIDProp="blockHolderNodeArray[0].blockID"
                        :blockTypeProp="blockHolderNodeArray[0].blockType"
                        :parentProp="blockHolderNodeArray[0].parent"
                        :stateProp="blockHolderNodeArray[0].state"
                        :uidProp="blockHolderNodeArray[0].uid"
          >
          </PutStarBlock>
        </div>

        <div class="list-group-item" v-else-if="block.blockID==7">
          <PutCrossBlock  :blockNameProp="blockHolderNodeArray[0].blockName"
                          :blockIDProp="blockHolderNodeArray[0].blockID"
                          :blockTypeProp="blockHolderNodeArray[0].blockType"
                          :parentProp="blockHolderNodeArray[0].parent"
                          :stateProp="blockHolderNodeArray[0].state"
                          :uidProp="blockHolderNodeArray[0].uid"
          >
          </PutCrossBlock>
        </div>

        <div class="list-group-item" id="selectorBlockBody" v-else-if="block.blockID==8">
            <div v-on:click="toggleControlBlockBody" v-b-toggle="`${blockHolderNodeArray[0].uid}`">
              <CheckFireBlock :blockNameProp="blockHolderNodeArray[0].blockName"
                              :blockIDProp="blockHolderNodeArray[0].blockID"
                              :blockTypeProp="blockHolderNodeArray[0].blockType"
                              :parentProp="blockHolderNodeArray[0].parent"
                              :childrenProp="blockHolderNodeArray[0].children"
                              :checkDirectionProp="blockHolderNodeArray[0].checkDirection"
                              :loopTimesProp="blockHolderNodeArray[0].loopTimes"
                              :stateProp="blockHolderNodeArray[0].state"
                              :uidProp="blockHolderNodeArray[0].uid"
              >
              </CheckFireBlock>
            </div>
            <b-collapse :id="`${blockHolderNodeArray[0].uid}`">
              <div class="selectorCheckDirection" @click="changeCheckDirection"><h6>Check Direction: {{blockHolderNodeArray[0].checkDirection}}</h6></div>
              <div v-for="(childrenNodeArray, index) in block.children" :key="index">
                <h6 v-if="index==0">True</h6>
                <h6 v-else>False</h6>
                <block-holder :blockHolderNodeArray="childrenNodeArray" :blockHolderOrderNo="index" blockHolderRegion=" Is Fire"></block-holder>
              </div>
            </b-collapse>
        </div>

        <div class="list-group-item" id="selectorBlockBody" v-else-if="block.blockID==9">
            <div v-on:click="toggleControlBlockBody" v-b-toggle="`${blockHolderNodeArray[0].uid}`">
              <CheckStarBlock :blockNameProp="blockHolderNodeArray[0].blockName"
                              :blockIDProp="blockHolderNodeArray[0].blockID"
                              :blockTypeProp="blockHolderNodeArray[0].blockType"
                              :parentProp="blockHolderNodeArray[0].parent"
                              :childrenProp="blockHolderNodeArray[0].children"
                              :checkDirectionProp="blockHolderNodeArray[0].checkDirection"
                              :loopTimesProp="blockHolderNodeArray[0].loopTimes"
                              :stateProp="blockHolderNodeArray[0].state"
                              :uidProp="blockHolderNodeArray[0].uid"
              >
              </CheckStarBlock>
            </div>
            <b-collapse :id="`${blockHolderNodeArray[0].uid}`">
              <div class="selectorCheckDirection" @click="changeCheckDirection"><h6>Check Direction: {{blockHolderNodeArray[0].checkDirection}}</h6></div>
              <div v-for="(childrenNodeArray, index) in block.children" :key="index">
                <h6 v-if="index==0">True</h6>
                <h6 v-else>False</h6>
                <block-holder :blockHolderNodeArray="childrenNodeArray" :blockHolderOrderNo="index" blockHolderRegion=" Is Fire"></block-holder>
              </div>
            </b-collapse>
        </div>

        <div class="list-group-item" id="selectorBlockBody" v-else-if="block.blockID==10">
            <div v-on:click="toggleControlBlockBody" v-b-toggle="`${blockHolderNodeArray[0].uid}`">
              <CheckCrossBlock  :blockNameProp="blockHolderNodeArray[0].blockName"
                                :blockIDProp="blockHolderNodeArray[0].blockID"
                                :blockTypeProp="blockHolderNodeArray[0].blockType"
                                :parentProp="blockHolderNodeArray[0].parent"
                                :childrenProp="blockHolderNodeArray[0].children"
                                :checkDirectionProp="blockHolderNodeArray[0].checkDirection"
                                :loopTimesProp="blockHolderNodeArray[0].loopTimes"
                                :stateProp="blockHolderNodeArray[0].state"
                                :uidProp="blockHolderNodeArray[0].uid"
              >
              </CheckCrossBlock>
            </div>
            <b-collapse :id="`${blockHolderNodeArray[0].uid}`">
              <div class="selectorCheckDirection" @click="changeCheckDirection"><h6>Check Direction: {{blockHolderNodeArray[0].checkDirection}}</h6></div>
              <div v-for="(childrenNodeArray, index) in block.children" :key="index">
                <h6 v-if="index==0">True</h6>
                <h6 v-else>False</h6>
                <block-holder :blockHolderNodeArray="childrenNodeArray" :blockHolderOrderNo="index" blockHolderRegion=" Is Fire"></block-holder>
              </div>
            </b-collapse>
        </div>

        <div class="list-group-item" id="selectorBlockBody" v-else-if="block.blockID==11">
            <div v-on:click="toggleControlBlockBody" v-b-toggle="`${blockHolderNodeArray[0].uid}`">
              <CheckExitBlock :blockNameProp="blockHolderNodeArray[0].blockName"
                              :blockIDProp="blockHolderNodeArray[0].blockID"
                              :blockTypeProp="blockHolderNodeArray[0].blockType"
                              :parentProp="blockHolderNodeArray[0].parent"
                              :childrenProp="blockHolderNodeArray[0].children"
                              :checkDirectionProp="blockHolderNodeArray[0].checkDirection"
                              :loopTimesProp="blockHolderNodeArray[0].loopTimes"
                              :stateProp="blockHolderNodeArray[0].state"
                              :uidProp="blockHolderNodeArray[0].uid"
              >
              </CheckExitBlock>
            </div>
            <b-collapse :id="`${blockHolderNodeArray[0].uid}`">
              <div class="selectorCheckDirection" @click="changeCheckDirection"><h6>Check Direction: {{blockHolderNodeArray[0].checkDirection}}</h6></div>
              <div v-for="(childrenNodeArray, index) in block.children" :key="index">
                <h6 v-if="index==0">True</h6>
                <h6 v-else>False</h6>
                <block-holder :blockHolderNodeArray="childrenNodeArray" :blockHolderOrderNo="index" blockHolderRegion=" Is Fire"></block-holder>
              </div>
            </b-collapse>
        </div>

        <div class="list-group-item" id="selectorBlockBody" v-else-if="block.blockID==12">
            <div v-on:click="toggleControlBlockBody" v-b-toggle="`${blockHolderNodeArray[0].uid}`">
              <CheckFireOrCrossBlock  :blockNameProp="blockHolderNodeArray[0].blockName"
                                      :blockIDProp="blockHolderNodeArray[0].blockID"
                                      :blockTypeProp="blockHolderNodeArray[0].blockType"
                                      :parentProp="blockHolderNodeArray[0].parent"
                                      :childrenProp="blockHolderNodeArray[0].children"
                                      :checkDirectionProp="blockHolderNodeArray[0].checkDirection"
                                      :loopTimesProp="blockHolderNodeArray[0].loopTimes"
                                      :stateProp="blockHolderNodeArray[0].state"
                                      :uidProp="blockHolderNodeArray[0].uid"
              >
              </CheckFireOrCrossBlock>
            </div>
            <b-collapse :id="`${blockHolderNodeArray[0].uid}`">
              <div class="selectorCheckDirection" @click="changeCheckDirection"><h6>Check Direction: {{blockHolderNodeArray[0].checkDirection}}</h6></div>
              <div v-for="(childrenNodeArray, index) in block.children" :key="index">
                <h6 v-if="index==0">True</h6>
                <h6 v-else>False</h6>
                <block-holder :blockHolderNodeArray="childrenNodeArray" :blockHolderOrderNo="index" blockHolderRegion=" Is Fire/X"></block-holder>
              </div>
            </b-collapse>
        </div>

        <div class="list-group-item" v-else-if="block.blockID==13">
          <MazeMovementBlock :blockNameProp="blockHolderNodeArray[0].blockName"
                         :blockIDProp="blockHolderNodeArray[0].blockID"
                         :blockTypeProp="blockHolderNodeArray[0].blockType"
                         :parentProp="blockHolderNodeArray[0].parent"
                         :stateProp="blockHolderNodeArray[0].state"
                         :uidProp="blockHolderNodeArray[0].uid"
          >
          </MazeMovementBlock>
        </div>

        <div class="list-group-item" v-else-if="block.blockID==14">
          <NDEMovementBlock :blockNameProp="blockHolderNodeArray[0].blockName"
                         :blockIDProp="blockHolderNodeArray[0].blockID"
                         :blockTypeProp="blockHolderNodeArray[0].blockType"
                         :parentProp="blockHolderNodeArray[0].parent"
                         :stateProp="blockHolderNodeArray[0].state"
                         :uidProp="blockHolderNodeArray[0].uid"
          >
          </NDEMovementBlock>
        </div>

      </div>

    </draggable>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import MoveLeftBlock from "./blocks/MoveLeftBlock.vue"
import MoveRightBlock from "./blocks/MoveRightBlock.vue"
import MoveUpBlock from "./blocks/MoveUpBlock.vue"
import MoveDownBlock from "./blocks/MoveDownBlock.vue"
import SequencerBlock from "./blocks/SequencerBlock.vue"
import LooperBlock from "./blocks/LooperBlock.vue"
import PutStarBlock from "./blocks/PutStarBlock.vue"
import PutCrossBlock from "./blocks/PutCrossBlock.vue"
import CheckFireBlock from "./blocks/CheckFireBlock.vue"
import CheckStarBlock from "./blocks/CheckStarBlock.vue"
import CheckCrossBlock from "./blocks/CheckCrossBlock.vue"
import CheckExitBlock from "./blocks/CheckExitBlock.vue"
import CheckFireOrCrossBlock from "./blocks/CheckFireOrCrossBlock.vue"
import MazeMovementBlock from "./blocks/MazeMovementBlock.vue"
import NDEMovementBlock from "./blocks/NDEMovementBlock.vue"

export default {
  name: 'block-holder',
  components:{
    draggable, 
    SequencerBlock, 
    LooperBlock, 
    MoveLeftBlock, 
    MoveRightBlock, 
    MoveUpBlock, 
    MoveDownBlock, 
    PutStarBlock, 
    PutCrossBlock, 
    CheckFireBlock, 
    CheckStarBlock, 
    CheckCrossBlock,
    CheckExitBlock,
    CheckFireOrCrossBlock,
    MazeMovementBlock,
    NDEMovementBlock,
  },
  props:{
    blockHolderRegion:{
      type: String,
      required: true,
    },
    blockHolderOrderNo:{
      type: Number,
      required: true
    },
    blockHolderNodeArray:{
      type:Array, 
      required: true
    }
  },
  data: function(){
    return{
      vmCodeCompiled: null,
      vmMainBlock: null,
      hasToggled: false,
      blockHolderStyle: "text-align: center; border: 1px solid black; margin: 10px 0px 10px 0px; background-color: lightgray; height: 52px;",
    }
  },
  methods:{
    updateCodeCompiled: function(){
      this.vmCodeCompiled.codeArray = []
      this.vmCodeCompiled.lineCount = 0
      this.vmCodeCompiled.indentCount = 0
      this.vmCodeCompiled.generatingCodeArray(this.vmMainBlock.rootObj)
    },
    updateParentProp: function(){
      this.blockHolderNodeArray[0].parent = this.blockHolderRegion
      this.updateCodeCompiled()
    },
    addControlBlockHolder: function(){
      this.blockHolderNodeArray[0].children.push([]);
    },
    removeControlBlockHolder: function(){
      if(this.blockHolderNodeArray[0].children.length > 0){
        this.blockHolderNodeArray[0].children.pop()
      }
    },
    toggleControlBlockBody: function(){
      this.hasToggled = !this.hasToggled;
      if(this.hasToggled){
        this.blockHolderStyle = "text-align: center; border: 1px solid black; margin: 10px 0px 10px 0px; background-color: lightgray; height: auto;"
      }
      else{
        this.blockHolderStyle = "text-align: center; border: 1px solid black; margin: 10px 0px 10px 0px; background-color: lightgray; height: 52px;"
      }
    },
    changeLoopTimes: function(){
      var self = this
      this.$swal({text: 'Input how many times you want to loop',
                  input: 'text',
                  inputValidator: function(value){
                    var n = Number(value)
                    if(!Number.isInteger(n)){
                      return 'Loop times must an integer number(1,2,3,....), words("two) or floating point number (3.5) is not allowed'
                    }
                    if(n < 1){
                      return 'Loop times should be larger or equal to 1'
                    }
                    if(n > 1000000){
                      return 'The maximum loop times is 1000000'
                    }
                    self.blockHolderNodeArray[0].loopTimes = n
                    self.updateCodeCompiled()
                  },
                })
      /*
      this.$swal({text: 'Select loop times',
                  input: 'radio',
                  footer: 'Select "always" to keep looping, or select "Enter a number" to input the times you want to loop',
                  inputOptions: {
                    enterLoopTimes: 'Enter a number',
                    always: 'Always'
                  },
                  inputValidator: function(value){
                    if(!value){
                      return 'You have to select something!'
                    }
                  },
                }).then(function(ans){
                          //window.console.log(ans.value)
                          if(!ans.value){
                            return
                          }
                          else if(ans.value == "always"){
                            self.blockHolderNodeArray[0].loopTimes = "always"
                          }
                          else{
                            self.$swal({text: 'Enter the number of times you want to loop',
                                        input: 'text',
                                        inputValidator: function(value){
                                                          var n = Number(value)
                                                          if(!Number.isInteger(n)){
                                                            return 'Loop times must an integer number(1,2,3,....), words("two) or floating point number (3.5) is not allowed'
                                                          }
                                                          if(n < 1){
                                                            return 'Looper times should be larger or equal to 1'
                                                          }
                                                          self.blockHolderNodeArray[0].loopTimes = n
                                        },
                                      })
                          }
                        })*/
    },
    changeCheckDirection: function(){
      var self = this
      this.$swal({text: 'Select Check Direction',
                  input: 'radio',
                  footer: 'Choose the direction you want to check ',
                  inputOptions: {
                    Left: 'Left',
                    Right: 'Right',
                    Up: 'Up',
                    Down: 'Down',
                  },
                  inputValidator: function(value){
                    if(!value){
                      return 'You have to choose a direction you want to check!'
                    }
                  },
                }).then(function(ans){
                          //window.console.log(ans.value)
                          if(!ans.value){
                            return
                          }
                          else{
                            self.blockHolderNodeArray[0].checkDirection = ans.value
                            self.updateCodeCompiled()
                          }
                        })
    },

  },
  mounted: function(){
    for(let i = 0; i < this.$root.$children[0].$children[0].$children.length; i++){
      if(this.$root.$children[0].$children[0].$children[i].$options._componentTag == "CodeCompiled"){
        this.vmCodeCompiled = this.$root.$children[0].$children[0].$children[i]
      }
      if(this.$root.$children[0].$children[0].$children[i].$options._componentTag == "MainBlock"){
        this.vmMainBlock = this.$root.$children[0].$children[0].$children[i]
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group{
  width:100%;
  height:100%;
  background-color: blanchedalmond;
}
.list-group-item{
  background-color: white;
	padding: 0px;
}
#sequencerBlockBody{
  background-color: rgb(236, 194, 3);
  padding: 0px;
}
#looperBlockBody{
  background-color: rgb(87, 179, 255);
  padding: 0px;
}
#selectorBlockBody{
  background-color: rgb(158, 131, 253);
  padding: 0px;
}
h3{
  margin: 0px;
}
h6{
  margin: 0px;
  padding: 5px;
  color: black;
}
.addSequencerHolder{
  background-color: rgb(255, 228, 109);
  cursor: pointer;
}
.minusSequencerHolder{
  background-color: rgb(255, 237, 158);
  cursor: pointer;
}
.looperRepeatTimes{
  background-color: rgb(148, 207, 255);
  cursor: pointer;
}
.selectorCheckDirection{
  background-color: rgb(187, 168, 255);
  cursor: pointer;
}
</style>