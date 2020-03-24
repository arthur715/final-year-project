<template>
  <div id="level10Tutorial">

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
      <h2>Level 10 - Maze Algorithm 3: Non Dead-End Movement</h2>
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

      <p> After a long journey, we finally come to the last part of this game.</p>
      <p> It is time to put everything we know together !</p>
      <p> The last thing you will have to do is to implement the 'NDE Movement' block that we have used in last level.</p>
      <p> Everything you will need is already in the repository and you already knew them.</p>
      <p> Look and think carefully on what we have done in level 8 and 9, then complete the part 2b of the algorithm.</p>
      <p> This is a very challenging level and you will have to think very clearly on what to do next when checking each direction is Fire, or Cross, or a Star.</p>
      <p> Do not easily give up when you are struggle, try to see which part of your program causing the problem and then fix it.</p>
      <p> A tips for you is to write down every steps on a paper and think. Good luck and Enjoy !!!</p>

      <p> Are you ready for the next level?</p>
      <div style="margin-bottom: 50px;">
        <router-link to="/Maze">
          <b-button pill variant="outline-secondary" @click="addBlocksForLevel10">
            <b-icon icon="play-fill"></b-icon> Start to play
          </b-button>
        </router-link>
      </div>

    </div>
    
  </div>
</template>

<script>


export default {
  name: "Level10Tutorial",
  methods:{
    addBlocksForLevel10: function(){
      var vmApp = this.$root.$children[0]
      
      /*if(vmApp.currentLevel == 7){
        vmApp.currentLevel++
      }*/
      vmApp.currentLevel = 10
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