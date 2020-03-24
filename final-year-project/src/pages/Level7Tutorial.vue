<template>
  <div id="level7Tutorial">

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
      <h2>Level 7 - Selector: 'Is Star?'</h2>
    </div>

    <div class="main">
      <p> We have learn how to use a selector 'Is Fire/X?' in the last level.</p>
      <p> Now there is another selector 'Is Star?' in this game.</p>
      <p> As you can guess, it is use to check if the neighbouring tile has a star or not.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/isstar.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> In the next level, there is a new tile called conveyor.</p>
      <p> When you step on it, you cannot control your movement anymore and will follow the conveyor belt then fall into the fire.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachConveyor.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> Fortunately, there is a star at the start of the conveyor belt.</p>
      <p> You will have to use the 'Is Star?' block to check if the neighbouring tile have a star to avoid step on the conveyor.</p>
      <p> In the following example, we have not use the 'Is Star?' block. Let's see what would happen.</p>
      <p> At the first 4 step, it is fine since there is no conveyor.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachIsStar1.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> However in the later steps, there are conveyor tiles.</P>
      <p>If we forget to check if the neighbouring tile has a star or not, we will fall into the fire.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachIsStar2.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> We have learnt that we can put a selector inside another selector in the last level.</p>
      <p> In the following example, it shows the correct steps before we move the game object.</p>
      <p> First set the loop times of the looper big enough to walk through the path.</p>
      <p> Next, let us put the 'Is Star?' block into the false block holder of the 'Is Fire/X?' block.</p>
      <p> Here we first check if the down tile is fire or has a cross. </p>
      <p> If false, we then check if the down tile has a star or not.</p>
      <p> This can make sure we will not step on any conveyor tile.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid;">
        <img src="../assets/teachIsStar3.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> Remember to put a cross everytime before you move the game object!</p>
      <p> Are you ready for the next level?</p>
      <div style="margin-bottom: 50px;">
        <router-link to="/Maze">
          <b-button pill variant="outline-secondary" @click="addBlocksForLevel7">
            <b-icon icon="play-fill"></b-icon> Start to play
          </b-button>
        </router-link>
      </div>

    </div>
    
  </div>
</template>

<script>
//import CheckStarBlock from '../components/blocks/CheckStarBlock.vue'

export default {
  name: "Level7Tutorial",
  methods:{
    addBlocksForLevel7: function(){
      var vmApp = this.$root.$children[0]
      /*if(!vmApp.addedIsStar){
        vmApp.currentBlockList2D.push([CheckStarBlock.data().initialData])
        vmApp.addedIsStar = true
      }
      if(vmApp.currentLevel == 6){
        vmApp.currentLevel++
      }*/
      vmApp.currentLevel = 7
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