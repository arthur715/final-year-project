<template>
  <div id="level8Tutorial">

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
      <h2>Level 8 - Maze Algorithm 1: Put Star/X</h2>
    </div>

    <div class="main">
      <p> We have already learnt quite a few different concepts in programming.</p>
      <p> For example, Looper, Sequencer, Selector and nested loop.</p>
      <p> These are all different control flow techniques a programmer will use when writing a program.</p>
      <p> The final part of this game is to learn the Maze Algorithm to solve a more complicated maze with the above techniques.</p>
      <p> But What is an Algorithm? An algorithm is a list of rules to follow in order to solve a problem.</p>
      <p> The complete Maze Algorithm is as follow:</p>
      <div width="100vw" height="auto" style="margin: 0px 0px 20px 0px;  padding: 0px 300px 0px 300px; text-align: left; border-bottom: 1px grey solid;">
        <p><b>Maze Algorithm:</b></p>
        <p><b>1.) Put a star or cross before we move based on the following situtations:</b></p>
        <p>     a. If the game object is at a dead end (i.e. 3 directions are Fire or Cross), then we put a cross on the tile.</p>
        <p>     b. If the game  object is not at a dead end, then we put a star to represent we have visited that tile.</p>
        <p><b>2.) Move the game object based on the following situations:</b></p>
        <p>     a. If the current tile is a dead end (i.e. 3 directions are Fire or Cross), then we move to the only available direction.</p>
        <p>     b. If the current tile is not a dead end, then we move to an unvisited tile with no star.</p>
      </div>

      <p> In this level, We will focus on part 1a and 1b.</p>
      <p> You will not be provided the normal moving blocks.</p>
      <p> Instead you will have to use 'Maze Movement' block for the movement.</p>
      <p> We will learn how to create this block in the next level.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/mazeMovement.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> The first thing you will have to do is to create the following set of blocks.</p>
      <p> You can see we have set the loop times of the looper quite big as the maze is much larger than the previous level.</p>
      <p> Inside the looper is the sequencer named 'maze algorithm 1'.</p>
      <p> It has another sequencer inside named 'Put Star/X' and a 'Maze Movement' block.</p>
      <p> These blocks are basically representing the above Maze Algorithm.</p>
      <p> The 'Put Star/X' is representing part 1 and the 'Maze Movement' block is representing part 2.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/level8Example.png" width="10%" height="10%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> After you have created the above set of blocks, you are ready for the real challenge.</p>
      <p> The main goal of this level is to do the part 1 of the Maze Algorithm.</p>
      <p> That is to put the star or cross correctly based on the tile where the game object at.</p>
      <p> You will have to fill in the block holder in the 'Put Star/X' sequencer with correct selector and action blocks.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachLevel8_1.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> If you do this part correctly, the 'Maze Movement' block will do the rest for you and move the game object to the exit.</p>
      <p> What the 'Maze Movement' block doing is based on the star or cross you are putting at every tile you have visited.</p>
      <p> That means if you doing something wrong, you will see the game object moving to the fire or acting strange.</p>
      <p> Here are some hints for you:</p>
      <p> Think about what is a dead end? How many combinations of directions may cause a dead end?</p>
      <p> Obviously if there are 2 directions that is not fire, it is not a dead end.</p>
      <p> If you are struggle, try to draw it out on a paper and think carefully.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachLevel8_2.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> After you have finished this part, remember to save the 'Put Star/X' !!!!!!!!</p>
      <p> We will use this in the next level and you definitely dont want to make it again.</p>
      <p> I am sorry for the mobile user. You will have to make it again in the next level.....</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachLevel8_3.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> Are you ready for the next level?</p>
      <div style="margin-bottom: 50px;">
        <router-link to="/Maze">
          <b-button pill variant="outline-secondary" @click="addBlocksForLevel8">
            <b-icon icon="play-fill"></b-icon> Start to play
          </b-button>
        </router-link>
      </div>

    </div>
    
  </div>
</template>

<script>


export default {
  name: "Level8Tutorial",
  methods:{
    addBlocksForLevel8: function(){
      var vmApp = this.$root.$children[0]
      vmApp.currentCustomBlockList2D = []
      
      /*if(vmApp.currentLevel == 7){
        vmApp.currentLevel++
      }*/
      vmApp.currentLevel = 8
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