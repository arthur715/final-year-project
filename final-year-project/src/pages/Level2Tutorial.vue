<template>
  <div id="level2Tutorial">

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
      <h2>Level 2 - Repeated Execution 1 : Using for loop to repeat a single function</h2>
    </div>

    <div class="main">
      <p> In the last level, we have learnt that the core of programming is Sequential Execution.</p>
      <p> The computer will execute the functions that you have told it to do in a top-down sequence.</p>
      <p> Let us look at the real power of what programming can do.</p>
      <p> If we want to move down 99 tiles, do we have to use 99 moveDown( ) function?</p>
      <p> The answer is no. Instead there is an much easier way to do this.</p>
      <p> In programming we will have a special statement called 'for-loop'.</p>
      <p> The expression 'let i = 0; i &lt; 99; i++' will tell the computer to do what function inside the curly bracket 99 times.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/CodeCompiledDemo2.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> The next thing you will need to learn is how to use the looper to represent the for-loop.</P>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/looper.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> Drag the looper block to the block holder, and then click on it to expand.</p>
      <p> You will see there is one block holder inside the looper after you expand it.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/teachExpandLooper.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> In the following example, instead of using 5 'Move Right' blocks to reach the exit, we can use the looper to repeat an action or movement. </p>
      <p> Drag the moving block to the block holder of the looper, then click on the Loop Times and type in the number of times you want to repeat. </p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/teachUsingLooper.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> When you drag the looper to the block holder, you will see the for-loop statement pop up in the code display area.</p>
      <p> If you change the Loop Times, the middle part of the expression changes from 'i &lt; 1' to 'i &lt; 5'</p>
      <p> This means the for loop will repeat to do the moveRight( ) function 5 times.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/L2Tutorial1.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> If you want to remove a looper from the block holder, you have to click on it again to make it collapse first. </p>
      <p> It cannot be removed when it is expanded.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/teachRemoveLooper.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> If you are using desktop or laptop, you can save or rename the looper. </p>
      <p> Try to right click on the looper to open the menu and you will see rename and save options.</p>
      <p> You have to rename the looper before save it to the repository.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/teachSavingLooper.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> We can give the looper a meaningful name and save it for future use. </p>
      <p> For example we can name it '5 Right' to represent move 5 steps to the right. </p>
      <p> Then click on 'save' to save it to the repository. </p>
      <p> We can always remove the saved block from the repository if we don't want to use it anymore.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px;">
        <img src="../assets/teachRenameAndSaveLooper.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>
      <p> However, the rename and save function is not supported for touch screen device or mobile.</p>
      <p style="padding-bottom: 20px; border-bottom: 1px grey solid"> This means you will have to make the blocks again if you want to use them in the future.</p>

      <p> Are you ready for the next level?</p>
      <div style="margin-bottom: 50px;">
        <router-link to="/Maze">
          <b-button pill variant="outline-secondary" @click="addBlocksForLevel2">
            <b-icon icon="play-fill"></b-icon> Start to play
          </b-button>
        </router-link>
      </div>

    </div>
    
  </div>
</template>

<script>
//import LooperBlock from '../components/blocks/LooperBlock.vue'

export default {
  name: "Level2Tutorial",
  methods:{
    addBlocksForLevel2: function(){
      var vmApp = this.$root.$children[0]
      /*if(!vmApp.addedLooper){
        vmApp.currentBlockList2D.push([LooperBlock.data().initialData])
        vmApp.addedLooper = true
      }
      if(vmApp.currentLevel == 1){
        vmApp.currentLevel++
      }*/
      vmApp.currentLevel = 2
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