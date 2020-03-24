<template>
  <div id="level6Tutorial">

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
      <h2>Level 6 - Conditional Execution 1: If-else statement and logical operators</h2>
    </div>

    <div class="main">
      <p> Up to this point, what we have done so far is to hard code a sequence of operations for the game object to do.</P>
      <p> In the previous level, we can count how many times should the looper repeat since we are just hard coding our program.</p>
      <p> Is it hard to count? If not, I am going to make the game map larger, may be 1000000 tiles......</p>
      <p> But in the real life, a programmer cannot count when they are writing actually code since the data can be changed in different situations.</p>
      <p> Think about if I change the game map, can your program still win the game if you hard code the steps?</p>
      <p> So the next thing we are going to learn is to let the game object to decide what actions should it be taken at each tile.</p>
      <p> To do this, we will need to use a selector block: 'Is Fire/X?'</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/isfireorx.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> Imagine if you go to the supermarket and want to buy either Pepsi or Coca Cola depends on which one is cheaper.</p>
      <p> Your decision is based on the following statement:</p>
      <p> If Pepsi is cheaper: Buy Pepsi</p>
      <p> Otherwise: Buy Coca Cola</p>
      <p> In programming, we have the selector blocks to decide what actions should be taken when we meet some conditions.</p>
      <p> The 'Is Fire' block is basically doing the same thing as us in the above situation.</p>
      <p> In the following example, it will check if the left tile of the game object is fire or cross.</p>
      <p> If the conditions is true, then it will move right; Otherwise it will move down.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/IsFireOrCrossExample.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> Drag the 'Is Fire' block to the block holder and click on it to expand.</p>
      <p> The default direction to check is the left tile of the object.</p>
      <p> We can change the check direction by click on it.</p>
      <p> Next, we can drag the block we want the game object to do if the condition is true and if the condition is false.</p>
      <p> In the following example you can see the game object will move down as its down tile is not fire or cross.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachIsFireOrCross2.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> In the following example, as the down tile is fire, the game object will move to the right.</p>
      <p> If you don't want it to do anything, just leave the true or false block holder empty.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachIsFireOrCross3.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> The goal of this level is to put a cross and move with the use of 'Is Fire' block.</p>
      <p> We can put a sequencer in the false block holder so that if down is not fire, the game object will put a cross and move down.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachIsFireOrCross4.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> Do the same step as above to the true block holder so that if down is fire, the game object will put a cross and move right.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachIsFireOrCross5.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> Finally, we can use a looper to repeat the above step for each tile until we reach the exit.</p>
      <p> Don't count the steps!!!!! Instead, all you need to do is to set the Loop Times large enough to visit each tile.</p>
      <p> Let's set the Loop Times to 1000, or may be 10000.</p>
      <p> Then we can put the whole 'Is Fire' block into the looper and press 'Execute'.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachIsFireOrCross6.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>
      

      <p> Are you ready for the next level?</p>
      <div style="margin-bottom: 50px;">
        <router-link to="/Maze">
          <b-button pill variant="outline-secondary" @click="addBlocksForLevel6">
            <b-icon icon="play-fill"></b-icon> Start to play
          </b-button>
        </router-link>
      </div>

    </div>
    
  </div>
</template>

<script>
//import CheckFireOrCrossBlock from '../components/blocks/CheckFireOrCrossBlock.vue'

export default {
  name: "Level6Tutorial",
  methods:{
    addBlocksForLevel6: function(){
      var vmApp = this.$root.$children[0]
      /*if(!vmApp.addedIsFireOrCross){
        vmApp.currentBlockList2D.push([CheckFireOrCrossBlock.data().initialData])
        vmApp.addedIsFireOrCross = true
      }
      if(vmApp.currentLevel == 5){
        vmApp.currentLevel++
      }*/
      vmApp.currentLevel = 6
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