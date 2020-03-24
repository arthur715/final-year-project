<template>
  <div id="mainBlock">
    
    <div id=mainBlockTitle>MainBlock</div>

    <div id="mainBlockBody">
      <div v-for="(arr, index) in rootObj.children" :key="index">
        <BlockHolder :blockHolderNodeArray="arr" :blockHolderOrderNo="index" blockHolderRegion="Main"></BlockHolder>
      </div>
    </div>

    <div id="mainBlockButton">
      <div id="add" v-on:click="addBlockHolder"><h3>+</h3></div>
      <div id="minus" v-on:click="removeBlockHolder"><h3>–</h3></div>
      <b-button size="lg" block variant="warning" @click="executeScript(rootObj)">Execute</b-button>
    </div>

  </div>
</template>

<script>
import BlockHolder from './BlockHolder.vue'
//import GameMap from './GameMap.vue'

export default {
  name: 'MainBlock',
  components:{
    BlockHolder, 
  },
  data: function(){
    return{
      rootObj:{
        blockName: "Main",
        blockID: 4,
        blockType: "control",
        parent: null,
        children: [],
        checkDirection: null,
        loopTimes: null,
        state: null,
        uid: null,
      },
      currentLevel: 1,
      goalCompleted: false,
      looperCount: 0,
      sequencerCount: 0,
      movingBlocksCount: 0,
      moveLeftCount: 0,
      moveRightCount: 0,
      moveUpCount: 0,
      moveDownCount: 0,
      putStarCount: 0,
      putCrossCount: 0,
      mazeMovementCount: 0,
      ndeMovementCount: 0,
      totalBlocksCount: 0, 
      vmCodeCompiled: null,
    }
  },
  methods:{
    addBlockHolder: function(){
      this.rootObj.children.push([])
    },
    removeBlockHolder: function(){
      if(this.rootObj.children.length > 0){
        this.rootObj.children.pop();
      }
    },
    executeScript: async function(blockObj){
      this.goalCompleted = false
      this.looperCount = 0
      this.sequencerCount = 0
      this.movingBlocksCount = 0
      this.totalBlocksCount = 0
      this.moveLeftCount = 0
      this.moveRightCount = 0
      this.moveUpCount = 0
      this.moveDownCount = 0
      this.putStarCount = 0
      this.putCrossCount = 0
      this.mazeMovementCount = 0
      this.ndeMovementCount = 0

      var vm = null
      for(let i = 0; i < this.$parent.$children.length; i++){
        if(this.$parent.$children[i].$options._componentTag == "GameMap"){
          vm = this.$parent.$children[i]
        }
      }
      vm.stop = false
      vm.currentSpeed = 0
      vm.resetGameState()
      //this.vmCodeCompiled.codeArray = []
      //this.vmCodeCompiled.generatingCodeArray(blockObj)
      this.checkBlockInScript(blockObj)

      if(this.currentLevel == 1){
        this.goalCompleted = true
      }
      else if(this.currentLevel == 2){
        if(this.totalBlocksCount <= 4){
          this.goalCompleted = true
        }
        else{
          let warnMsg = "You have used " + this.totalBlocksCount + " blocks. The program should not be more than 4 blocks" 
          this.$swal({
            text: warnMsg,
            icon: 'warning',
          })
        }
      }
      else if(this.currentLevel == 3){
        if(this.totalBlocksCount <= 5){
          this.goalCompleted = true
        }
        else{
          let warnMsg = "You have used " + this.totalBlocksCount + " blocks. The program should not be more than 5 blocks" 
          this.$swal({
            text: warnMsg,
            icon: 'warning',
          })
        }
      }
      else if(this.currentLevel == 4){
        if(this.totalBlocksCount <= 16){
          this.goalCompleted = true
        }
        else{
          let warnMsg = "You have used " + this.totalBlocksCount + " blocks. The program should not be more than 16 blocks" 
          this.$swal({
            text: warnMsg,
            icon: 'warning',
          })
        }
      }
      else if(this.currentLevel == 5){
        this.goalCompleted = true
      }
      else if(this.currentLevel == 6){
        if(this.looperCount > 1){
          let warnMsg = "You have used " + this.looperCount + " looper. You should not use more than 1 looper." 
          this.$swal({
            text: warnMsg,
            icon: 'warning',
          })
        }
        else if(this.totalBlocksCount > 16){
          let warnMsg = "You have used " + this.totalBlocksCount + " blocks. The program should not be more than 16 blocks" 
          this.$swal({
            text: warnMsg,
            icon: 'warning',
          })
        }
        else{
          this.goalCompleted = true
        }
      }
      else if(this.currentLevel == 7){
        if(this.looperCount > 1){
          let warnMsg = "You have used " + this.looperCount + " looper. You should not use more than 1 looper." 
          this.$swal({
            text: warnMsg,
            icon: 'warning',
          })
        }
        else if(this.totalBlocksCount > 28){
          let warnMsg = "You have used " + this.totalBlocksCount + " blocks. The program should not be more than 28 blocks" 
          this.$swal({
            text: warnMsg,
            icon: 'warning',
          })
        }
        else{
          this.goalCompleted = true
        }
      }
      else if(this.currentLevel == 8){
        this.goalCompleted = true
      }
      else if(this.currentLevel == 9){
        if(this.mazeMovementCount != 0){
          let warnMsg = "You cannot use 'Maze Movement' block at this level !" 
          this.$swal({
            text: warnMsg,
            icon: 'warning',
          })
        }
        else if(this.moveLeftCount>1 || this.moveRightCount > 1 || this.moveUpCount > 1 || this.moveDownCount >1){
          let warnMsg = "You have used: <br>" + this.moveLeftCount + " 'Move Left' block <br>" + this.moveRightCount + " 'Move Right' block <br>" + this.moveUpCount + " 'Move Up' block <br>" + this.moveDownCount + " 'Move Down' block <br>"
          warnMsg += "You can only use 1 of each only!<br> Use the 'NDE Movement block for non dead end movement! " 
          this.$swal({
            html: warnMsg,
            icon: 'warning',
            width: "100px",
          })
        } 
        else{
          this.goalCompleted = true
        }
      }
      else if(this.currentLevel == 10){
        if(this.ndeMovementCount == 0){
          this.goalCompleted = true
        }
        else{
          let warnMsg = "You cannot use 'NDE Movement' block at this level !" 
          this.$swal({
            text: warnMsg,
            icon: 'warning',
          })
        }
      }

      if(this.goalCompleted){
        await this.sleepMS(200)
        this.updateCodeCompiled()
        this.traverseTree(blockObj, vm)
      }
    },
    checkBlockInScript: function(blockObj){

      if(blockObj.blockID == 0){
        this.movingBlocksCount++
        this.totalBlocksCount++
        this.moveLeftCount++
      }
      if(blockObj.blockID == 1){
        this.movingBlocksCount++
        this.totalBlocksCount++
        this.moveRightCount++
      }
      if(blockObj.blockID == 2){
        this.movingBlocksCount++
        this.totalBlocksCount++
        this.moveUpCount++
      }
      if(blockObj.blockID == 3){
        this.movingBlocksCount++
        this.totalBlocksCount++
        this.moveDownCount++
      }
      if(blockObj.blockID == 4){
        if(blockObj.blockName != "Main"){
          this.sequencerCount++
          this.totalBlocksCount++
        }
        for(let i in blockObj.children){
          if(blockObj.children[i].length > 0){
            this.checkBlockInScript(blockObj.children[i][0])
          }
        }
      }
      if(blockObj.blockID == 5){
        this.looperCount++
        this.totalBlocksCount++
        for(let i in blockObj.children){
          if(blockObj.children[i].length > 0){
            this.checkBlockInScript(blockObj.children[i][0])
          }
        }
      }
      if(blockObj.blockID == 6){
        this.totalBlocksCount++
        this.putStarCount++
      }
      if(blockObj.blockID == 7){
        this.totalBlocksCount++
        this.putCrossCount++
      }
      if(blockObj.blockID == 9){
        this.totalBlocksCount++
        for(let i in blockObj.children){
          if(blockObj.children[i].length > 0){
            this.checkBlockInScript(blockObj.children[i][0])
          }
        }
      }
      if(blockObj.blockID == 12){
        this.totalBlocksCount++
        for(let i in blockObj.children){
          if(blockObj.children[i].length > 0){
            this.checkBlockInScript(blockObj.children[i][0])
          }
        }
      }
      if(blockObj.blockID == 13){
        this.totalBlocksCount++
        this.mazeMovementCount++
      }
      if(blockObj.blockID == 14){
        this.totalBlocksCount++
        this.ndeMovementCount++
      }

    },
    traverseTree: async function(blockObj, vm){
      window.console.log(blockObj.blockName)
      
      if(blockObj.blockID == 0){
        let codeObj = null
        if(!vm.stop){
          for(let i = 0; i < this.vmCodeCompiled.codeArray.length; i++){
            if(this.vmCodeCompiled.codeArray[i].codeObjUID == blockObj.uid){
              codeObj = this.vmCodeCompiled.codeArray[i]
            }
          }
          codeObj.codeObjStr += "\0 \0 <==="
          vm.moveLeft()
          await this.sleepMS(200)
        }
        if(!vm.stop && codeObj != null){
          codeObj.codeObjStr = codeObj.codeObjStr.replace("\0 \0 <===", "")
        }
      }
      if(blockObj.blockID == 1){
        let codeObj = null
        if(!vm.stop){
          for(let i = 0; i < this.vmCodeCompiled.codeArray.length; i++){
            if(this.vmCodeCompiled.codeArray[i].codeObjUID == blockObj.uid){
              codeObj = this.vmCodeCompiled.codeArray[i]
            }
          }
          codeObj.codeObjStr += "\0 \0 <==="
          vm.moveRight()
          await this.sleepMS(200)
        }
        if(!vm.stop && codeObj != null){
          codeObj.codeObjStr = codeObj.codeObjStr.replace("\0 \0 <===", "")
        }
      }
      if(blockObj.blockID == 2){
        let codeObj = null
        if(!vm.stop){
          for(let i = 0; i < this.vmCodeCompiled.codeArray.length; i++){
            if(this.vmCodeCompiled.codeArray[i].codeObjUID == blockObj.uid){
              codeObj = this.vmCodeCompiled.codeArray[i]
            }
          }
          codeObj.codeObjStr += "\0 \0 <==="
          vm.moveUp()
          await this.sleepMS(200)
        }
        if(!vm.stop && codeObj != null){
          codeObj.codeObjStr = codeObj.codeObjStr.replace("\0 \0 <===", "")
        }
      }
      if(blockObj.blockID == 3){
        let codeObj = null
        if(!vm.stop){
          for(let i = 0; i < this.vmCodeCompiled.codeArray.length; i++){
            if(this.vmCodeCompiled.codeArray[i].codeObjUID == blockObj.uid){
              codeObj = this.vmCodeCompiled.codeArray[i]
            }
          }
          codeObj.codeObjStr += "\0 \0 <==="
          vm.moveDown()
          await this.sleepMS(200)
        }
        if(!vm.stop && codeObj != null){
          codeObj.codeObjStr = codeObj.codeObjStr.replace("\0 \0 <===", "")
        }
      }
      if(blockObj.blockID == 13){
        let codeObj = null
        if(!vm.stop){
          for(let i = 0; i < this.vmCodeCompiled.codeArray.length; i++){
            if(this.vmCodeCompiled.codeArray[i].codeObjUID == blockObj.uid){
              codeObj = this.vmCodeCompiled.codeArray[i]
            }
          }
          codeObj.codeObjStr += "\0 \0 <==="
          vm.performMazeMovement()
          await this.sleepMS(200)
        }
        if(!vm.stop && codeObj != null){
          codeObj.codeObjStr = codeObj.codeObjStr.replace("\0 \0 <===", "")
        }
      }
      if(blockObj.blockID == 14){
        let codeObj = null
        if(!vm.stop){
          for(let i = 0; i < this.vmCodeCompiled.codeArray.length; i++){
            if(this.vmCodeCompiled.codeArray[i].codeObjUID == blockObj.uid){
              codeObj = this.vmCodeCompiled.codeArray[i]
            }
          }
          codeObj.codeObjStr += "\0 \0 <==="
          vm.ndeMovement()
          await this.sleepMS(200)
        }
        if(!vm.stop && codeObj != null){
          codeObj.codeObjStr = codeObj.codeObjStr.replace("\0 \0 <===", "")
        }
      }
      if(blockObj.blockID == 4){
        let i
        for(i in blockObj.children){
          if(blockObj.children[i].length > 0){
            if(!vm.stop){
              await this.traverseTree(blockObj.children[i][0], vm)
            }
          }
        }
        if(blockObj.blockName=="Main"){
          vm.stop = false
        }
      }
      if(blockObj.blockID == 5){
        let i
        for(i = 0; i < blockObj.loopTimes; i++){
          for(let j in blockObj.children){
            if(blockObj.children[j].length > 0){
              if(!vm.stop){
                await this.traverseTree(blockObj.children[j][0], vm)
              }
            }
          }
        }
      }
      if(blockObj.blockID == 6){
        let codeObj = null
        if(!vm.stop){
          for(let i = 0; i < this.vmCodeCompiled.codeArray.length; i++){
            if(this.vmCodeCompiled.codeArray[i].codeObjUID == blockObj.uid){
              codeObj = this.vmCodeCompiled.codeArray[i]
            }
          }
          codeObj.codeObjStr += "\0 \0 <==="
          vm.putStar()
          await this.sleepMS(50)
        }
        if(!vm.stop && codeObj != null){
          codeObj.codeObjStr = codeObj.codeObjStr.replace("\0 \0 <===", "")
        }
      }
      if(blockObj.blockID == 7){
        let codeObj = null
        if(!vm.stop){
          for(let i = 0; i < this.vmCodeCompiled.codeArray.length; i++){
            if(this.vmCodeCompiled.codeArray[i].codeObjUID == blockObj.uid){
              codeObj = this.vmCodeCompiled.codeArray[i]
            }
          }
          codeObj.codeObjStr += "\0 \0 <==="
          vm.putCross()
          await this.sleepMS(50)
        }
        if(!vm.stop && codeObj != null){
          codeObj.codeObjStr = codeObj.codeObjStr.replace("\0 \0 <===", "")
        }
      }
      if(blockObj.blockID == 8){
        var isFire = vm.checkIsFire(blockObj)
        if(isFire){
          if(blockObj.children[0].length > 0){
            if(!vm.stop){
              await this.traverseTree(blockObj.children[0][0], vm)
            }
          }
        }
        else{
          if(blockObj.children[1].length > 0){
            if(!vm.stop){
              await this.traverseTree(blockObj.children[1][0], vm)
            }
          }
        }
      }
      if(blockObj.blockID == 9){
        var isStar = vm.checkIsStar(blockObj)
        if(isStar){
          if(blockObj.children[0].length > 0){
            if(!vm.stop){
              await this.traverseTree(blockObj.children[0][0], vm)
            }
          }
        }
        else{
          if(blockObj.children[1].length > 0){
            if(!vm.stop){
              await this.traverseTree(blockObj.children[1][0], vm)
            }
          }
        }
      }
      if(blockObj.blockID == 10){
        var isCross = vm.checkIsCross(blockObj)
        if(isCross){
          if(blockObj.children[0].length > 0){
            if(!vm.stop){
              await this.traverseTree(blockObj.children[0][0], vm)
            }
          }
        }
        else{
          if(blockObj.children[1].length > 0){
            if(!vm.stop){
              await this.traverseTree(blockObj.children[1][0], vm)
            }
          }
        }
      }
      if(blockObj.blockID == 11){
        var isExit = vm.checkIsExit(blockObj)
        if(isExit){
          if(blockObj.children[0].length > 0){
            if(!vm.stop){
              await this.traverseTree(blockObj.children[0][0], vm)
            }
          }
        }
        else{
          if(blockObj.children[1].length > 0){
            if(!vm.stop){
              await this.traverseTree(blockObj.children[1][0], vm)
            }
          }
        }
      }
      if(blockObj.blockID == 12){
        var isFireOrX = vm.checkIsFireOrX(blockObj)
        if(isFireOrX){
          if(blockObj.children[0].length > 0){
            if(!vm.stop){
              await this.traverseTree(blockObj.children[0][0], vm)
            }
          }
        }
        else{
          if(blockObj.children[1].length > 0){
            if(!vm.stop){
              await this.traverseTree(blockObj.children[1][0], vm)
            }
          }
        }
      }
      

    },
    sleepMS: function(millieSecond){
      return new Promise(function(resolve){
        setTimeout(resolve, millieSecond)
      })
    },
    updateCodeCompiled: function(){
      this.vmCodeCompiled.codeArray = []
      //this.vmCodeCompiled.codeArray.push("function Main(){")
      //this.vmCodeCompiled.codeArray.push("}")
      this.vmCodeCompiled.lineCount = 0
      this.vmCodeCompiled.indentCount = 0
      this.vmCodeCompiled.generatingCodeArray(this.rootObj)
    },
  },
  mounted: function(){
    this.currentLevel = this.$root.$children[0].currentLevel

    for(let i = 0; i < this.$parent.$children.length; i++){
      if(this.$parent.$children[i].$options._componentTag == "CodeCompiled"){
        this.vmCodeCompiled = this.$parent.$children[i]
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#mainBlock{
    background-color: azure;
    width: 18%;
    height: 100%;
    /*height: inherit;*/
    /*padding: 30px 30px 30px 30px;*/
    margin: 0px 0px 0px 0px;
    float: left;
    position: absolute;
    max-height: 800px;
}
#mainBlockTitle{
  background-color: lightsalmon;
  font-size: 125%
}
#mainBlockBody{
  background-color: azure;
  width:100%;
  padding: 0px 30px 0px 30px;
  display: block;
  height:90%;
  overflow: scroll;
  max-height: 686px;
}
#mainBlockButton{
  width:100%;
  background-color: lightcoral;
  margin:0px;
  padding: 0px;
}
#add{
  background-color: beige;
  height: 100%;
  width:50%;
  float: left;
  margin: 0px 0px 0px 0px;
  border: 1px solid lightgray;
  cursor: pointer;
}
#minus{
  background-color: beige;
  width: 50%;
  float: left;
  margin: 0px 0px 0px 0px;
  border: 1px solid lightgray;
  cursor: pointer;
}
h3{
  margin: 0px;
}
</style>