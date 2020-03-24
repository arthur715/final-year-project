<template>
  <div id="level9Tutorial">

    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <router-link to="/">
          <b-navbar-brand>Home</b-navbar-brand>  
        </router-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav></b-collapse>
      </b-navbar>
    </div>

    <div class="header">
      <h2>Level 9 - Maze Algorithm 2: Dead-End Movement</h2>
    </div>

    <div class="main">
      
      <div width="100vw" height="auto" style="margin: 0px 0px 20px 0px;  padding: 0px 300px 0px 300px; text-align: left; border-bottom: 1px grey solid;">
        <p><b>Maze Algorithm:</b></p>
        <p><b>1.) Put a star or cross before we move based on the following situtations:</b></p>
        <p>     a. If the game object is at a dead end (i.e. 3 directions are Fire or Cross), then we put a cross on the tile.</p>
        <p>     b. If the game  object is not at a dead end, then we put a star to represent we have visited that tile.</p>
        <p><b>2.) Move the game object based on the following situations:</b></p>
        <p>     a. If the current tile is a dead end (i.e. 3 directions are Fire or Cross), then we move to the only available direction.</p>
        <p>     b. If the current tile is not a dead end, then we move to an unvisited tile with no star.</p>
      </div>

      <p> We have done part 1 of the Maze Algorithm. The next step is to build the Maze Movement block we have used in last level.</p>
      <p> In this level, We will focus on part 2a to handle the dead end movement.</p>
      <p> You will be provided with the normal moving blocks, but each of them can only use 1 time.</p>
      <p> It is enough to handle the dead end movement because there are only 4 possible directions you can go if it is a dead end tile.</p>
      <p> For the non dead end movement, you will have to use the 'NDE Movement' block.</p>
      <p> As in last level, if you handle the dead end movement correct, the 'NDE Movement' block will do the rest for you.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/ndeMovement.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> After you have finished this part, remember to save the 'Maze Movement' block that you have created!!!!!!!!</p>
      <p> We will use this in the next level and you definitely dont want to make it again.</p>
      <p style="padding-bottom: 20px; margin: 0px 0px 50px 0px; min-width:200px; border-bottom: 1px solid grey;"> I am sorry for the mobile user. You will have to make it again in the next level.....</p>
      

      <p> Are you ready for the next level?</p>
      <div style="margin-bottom: 50px;">
        <router-link to="/Maze">
          <b-button pill variant="outline-secondary" @click="addBlocksForLevel9">
            <b-icon icon="play-fill"></b-icon> Start to play
          </b-button>
        </router-link>
      </div>

    </div>
    
  </div>
</template>

<script>


export default {
  name: "Level9Tutorial",
  methods:{
    addBlocksForLevel9: function(){
      var vmApp = this.$root.$children[0]
      
      /*if(vmApp.currentLevel == 8){
        vmApp.currentLevel++
      }*/
      vmApp.currentLevel = 9
    }
  },
}
</script>


<style scoped>
/* Header/logo Title */
.header {
  padding: 10px;
  margin: 40px 50px 0px 50px;
  text-align: center;
  background: white;
  color: rgb(129, 129, 129);
  border-bottom: 3px solid grey;
}

/* Increase the font size of the heading */
.header h1 {
  font-size: 40px;
}
.main{
  padding: 0px;
  margin: 40px 10px 0px 10px;
  text-align: center;
  background: white;
  color: rgb(129, 129, 129);
  font-size: 20px;
}
</style>