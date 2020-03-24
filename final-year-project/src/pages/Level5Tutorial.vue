<template>
  <div id="level5Tutorial">

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
      <h2>Level 5 - Repeated Execution 4 : Test your understanding</h2>
    </div>

    <div class="main">
      <p> It is time to test your understanding.</p>
      <p> In order to solve a maze, we will have to use 2 more action blocks: 'Put Star' and 'Put Cross' representing 2 different functions.</P>
      <p> The name of these blocks is very self-explained, they are used to put a star or a cross on the map.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px;">
        <img src="../assets/putstar.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/putcross.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> In the following example, the sequencer first put a star on the current tile, then move down.</p>
      <p> The looper then repeat the above sequence 4 times.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachPutStar.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> In the following example, the sequencer first put a cross on the current tile, then move down.</p>
      <p> The looper then repeat the above sequence 3 times.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachPutCross.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> The goal of this level is to put a cross on the tile of all the dead ends , and put a star on all the other tile.</p>
      <p> As you can see, there are 3 dead ends in the following example.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachL5Example.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> The order of how you put the star and cross on each tile does not matter at this stage.</p>
      <p> You can put a star on all the tile first, then find the dead ends and put cross on those tiles. Or you can do it tile by tile.</p>
      <p> As long as you put the correct items on each tile and reach the exit, you win!</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/L5Example.png" width="30%" height="30%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> Are you ready for the next level?</p>
      <div style="margin-bottom: 50px;">
        <router-link to="/Maze">
          <b-button pill variant="outline-secondary" @click="addBlocksForLevel5">
            <b-icon icon="play-fill"></b-icon> Start to play
          </b-button>
        </router-link>
      </div>

    </div>
    
  </div>
</template>

<script>
//import PutStarBlock from '../components/blocks/PutStarBlock.vue'
//import PutCrossBlock from '../components/blocks/PutCrossBlock.vue'

export default {
  name: "Level5Tutorial",
  methods:{
    addBlocksForLevel5: function(){
      var vmApp = this.$root.$children[0]
      /*if(!vmApp.addedPutStar){
        vmApp.currentBlockList2D.splice(4,0,[PutStarBlock.data().initialData])
        vmApp.addedPutStar = true
      }
      if(!vmApp.addedPutCross){
        vmApp.currentBlockList2D.splice(5,0,[PutCrossBlock.data().initialData])
        vmApp.addedPutCross = true
      }
      if(vmApp.currentLevel == 4){
        vmApp.currentLevel++
      }*/
      vmApp.currentLevel = 5
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