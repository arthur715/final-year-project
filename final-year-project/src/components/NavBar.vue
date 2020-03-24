<template>
	<div id="navBar">

		<b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
      
      <router-link to="/">
        <b-navbar-brand>Home</b-navbar-brand>  
      </router-link>

      <div v-if="currentLevel==1">
        <div v-if="doneL1">
          <router-link to="/Level-2-Tutorial"><b-button variant="outline-success" @click="prepareForNextLevel">Next Level</b-button></router-link>
        </div>
      </div>
      <div v-else-if="currentLevel==2">
        <div v-if="doneL2">
          <router-link to="/Level-3-Tutorial"><b-button variant="outline-success" @click="prepareForNextLevel">Next Level</b-button></router-link>
        </div>
      </div>
      <div v-else-if="currentLevel==3">
        <div v-if="doneL3">
          <router-link to="/Level-4-Tutorial"><b-button variant="outline-success" @click="prepareForNextLevel">Next Level</b-button></router-link>
        </div>
      </div>
      <div v-else-if="currentLevel==4">
        <div v-if="doneL4">
          <router-link to="/Level-5-Tutorial"><b-button variant="outline-success" @click="prepareForNextLevel">Next Level</b-button></router-link>
        </div>
      </div>
      <div v-else-if="currentLevel==5">
        <div v-if="doneL5">
          <router-link to="/Level-6-Tutorial"><b-button variant="outline-success" @click="prepareForNextLevel">Next Level</b-button></router-link>
        </div>
      </div>
      <div v-else-if="currentLevel==6">
        <div v-if="doneL6">
          <router-link to="/Level-7-Tutorial"><b-button variant="outline-success" @click="prepareForNextLevel">Next Level</b-button></router-link>
        </div>
      </div>
      <div v-else-if="currentLevel==7">
        <div v-if="doneL7">
          <router-link to="/Level-8-Tutorial"><b-button variant="outline-success" @click="prepareForNextLevel">Next Level</b-button></router-link>
        </div>
      </div>
      <div v-else-if="currentLevel==8">
        <div v-if="doneL8">
          <router-link to="/Level-9-Tutorial"><b-button variant="outline-success" @click="prepareForNextLevel">Next Level</b-button></router-link>
        </div>
      </div>
      <div v-else-if="currentLevel==9">
        <div v-if="doneL9">
          <router-link to="/Level-10-Tutorial"><b-button variant="outline-success" @click="prepareForNextLevel">Next Level</b-button></router-link>
        </div>
      </div>
      <div v-else-if="currentLevel==10">
        <div v-if="doneL10">
          <router-link to="/Summary"><b-button variant="outline-success" @click="prepareForNextLevel">Summary</b-button></router-link>
        </div>
      </div>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-button variant="warning" @click="executeMainBlock" style="margin: 0px 20px 0px 0px;">Execute</b-button>
          <b-button variant="light" @click="resetGameMapState">Restart</b-button>
        </b-navbar-nav>
      </b-collapse>
    
    </b-navbar>

	</div>
</template>

<script>
export default {
  name: 'NavBar',
  data: function(){
    return{
      doneL1: false,
      doneL2: false,
      doneL3: false,
      doneL4: false,
      doneL5: false,
      doneL6: false,
      doneL7: false, 
      doneL8: false,
      doneL9: false,
      doneL10: false,
      currentLevel: null,
      vmApp: null,
      vmGameMap:null,
      vmMainBlock: null,
    }
  },
  methods:{
    executeMainBlock: function(){
      this.vmMainBlock.executeScript(this.vmMainBlock.rootObj)
    },
    resetGameMapState: async function(){
      this.vmGameMap.stop = true
      await this.sleepMS(500)
      this.vmGameMap.stop = false
      this.vmGameMap.currentSpeed = 0
      this.vmGameMap.resetGameState()
    },
    prepareForNextLevel: function(){
      //this.vmApp.currentLevel++
    },
    sleepMS: function(millieSecond){
      return new Promise(function(resolve){
        setTimeout(resolve, millieSecond)
      })
		},
  },
  mounted: function(){
    this.vmApp = this.$root.$children[0]
    this.currentLevel = this.vmApp.currentLevel
    
    for(let i = 0; i < this.$parent.$children.length; i++){
      if(this.$parent.$children[i].$options._componentTag == "GameMap"){
        this.vmGameMap = this.$parent.$children[i]
      }
      if(this.$parent.$children[i].$options._componentTag == "MainBlock"){
        this.vmMainBlock = this.$parent.$children[i]
      }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>