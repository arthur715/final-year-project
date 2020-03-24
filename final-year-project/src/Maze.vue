<!-- layout of the app-->
<template>
  <div id="maze">
    <NavBar></NavBar>
    <div v-if="currentLevel==1">
      <Level1Instructions></Level1Instructions>
    </div>
    <div v-else-if="currentLevel==2">
      <Level2Instructions></Level2Instructions>
    </div>
    <div v-else-if="currentLevel==3">
      <Level3Instructions></Level3Instructions>
    </div>
    <div v-else-if="currentLevel==4">
      <Level4Instructions></Level4Instructions>
    </div>
    <div v-else-if="currentLevel==5">
      <Level5Instructions></Level5Instructions>
    </div>
    <div v-else-if="currentLevel==6">
      <Level6Instructions></Level6Instructions>
    </div>
    <div v-else-if="currentLevel==7">
      <Level7Instructions></Level7Instructions>
    </div>
    <div v-else-if="currentLevel==8">
      <Level8Instructions></Level8Instructions>
    </div>
    <div v-else-if="currentLevel==9">
      <Level9Instructions></Level9Instructions>
    </div>
    <div v-else-if="currentLevel==10">
      <Level10Instructions></Level10Instructions>
    </div>
    
    
    <CodeCompiled></CodeCompiled>
    <Repository ref="repository"></Repository>
    <div id="mazeBody">
      <MainBlock></MainBlock>
      <GameMap></GameMap>
    </div>
  </div>
</template>

<script>
import Repository from './components/Repository.vue'
import NavBar from './components/NavBar.vue'
import MainBlock from './components/MainBlock.vue'
import GameMap from "./components/GameMap.vue"
import CodeCompiled from "./components/CodeCompiled.vue"

import Level1Instructions from './instructions/level1Instructions.vue'
import Level2Instructions from './instructions/level2Instructions.vue'
import Level3Instructions from './instructions/level3Instructions.vue'
import Level4Instructions from './instructions/level4Instructions.vue'
import Level5Instructions from './instructions/level5Instructions.vue'
import Level6Instructions from './instructions/level6Instructions.vue'
import Level7Instructions from './instructions/level7Instructions.vue'
import Level8Instructions from './instructions/level8Instructions.vue'
import Level9Instructions from './instructions/level9Instructions.vue'
import Level10Instructions from './instructions/level10Instructions.vue'

export default {
  name: 'maze',
  components: {
    NavBar, 
    Repository, 
    MainBlock, 
    GameMap, 
    CodeCompiled,
    Level1Instructions, 
    Level2Instructions, 
    Level3Instructions, 
    Level4Instructions, 
    Level5Instructions,
    Level6Instructions,
    Level7Instructions,
    Level8Instructions,
    Level9Instructions,
    Level10Instructions,
  },
  data: function(){
    return{
      currentLevel: 1
    }
  },
  methods:{

  },
  mounted: function(){
    this.currentLevel = this.$root.$children[0].currentLevel
  },
}
</script>

<style scoped>
#maze{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  margin: 56px 0px 0px 0px;
  height:auto;
}
#mazeBody{
  float:right;
  width: 82%;
  height:auto;
}
</style>