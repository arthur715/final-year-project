<template>
  <div id="level1Tutorial">

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
      <h2>Level 1 - Sequential Execution : what is programming?</h2>
    </div>

    <div class="main">
      <p>What is Programming? This is the first question everyone asks when they start to learn programming.</p>
      <p>In a nutshell, programming is a list of instructions you tell the computer to do or execute step by step in order to solve a problem.</p>
      <p>You may have 'experienced' to programming in daily life already.</p>
      <p>When somebody ask you how to go to the nearest supermarket, you will probably tell them:</p>
      <div width="100vw" height="auto" style="margin: 0px 0px 20px 0px; padding: 20px 50px 20px 50px; min-width: 300px; text-align: left;">
        <h5>1.) Walk down till the end of the street.</h5>
        <h5>2.) Stop at the bus stop and wait for bus 142.</h5>
        <h5>3.) Drop off from the bus at the second stop.</h5>
        <h5>4.) Turn right and walk for 100 meters after you drop off from the bus, and the supermarket will be on your left.</h5>
      </div>
      <p>In this case, you are giving instructions in sequence to somebody who do not know what they should do and they will just following your instructions.</p>
      <p>This is basically what programming is! The computer is so dumb that it cannot make any decision by itself.</p>
      <p>It will just do what you have told it to do and follow the instructions line-by-lines.</p>
      <p style="padding-bottom: 20px;margin-bottom: 30px; border-bottom: 1px grey solid"> This is called Sequential Execution and is the core of programming.</p>

      <p> The first thing you will need to learn is how to use the moving blocks. There are 4 types of moving blocks in this game: </P>
      <div width="100vw" height="auto">
        <img src="../assets/moveleft.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>
      <div width="100vw" height="auto">
        <img src="../assets/moveright.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>
      <div width="100vw" height="auto">
        <img src="../assets/moveup.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/movedown.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> These blocks are store in the repository on the left of the game page.</p>
      <p> You will have to use these blocks to move the game object to the green tile (i.e. the exit of the maze).</p>
      <p> But remember, do not fall into the fire or you will lose!!!!!!</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/gameScreenShot.png" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> Press the '+' button to add a block holder, then drag the block to it.</p>
      <p> Blocks can also be removed from the block holder by drag it to the bottom-left corner if you don't want to use it.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/teachDragAndRemove.gif" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>
      
      <p> When you add the block to the block holder, you will see the code display area will updated the code representing that block.</p>
      <p> In the following example, you could see a statement 'moveDown( );' pop up after we drag the 'Move Down' block in the block holder.</p>
      <p> This statement of code is called a function.</p>
      <p> A function is like an individual instruction to let the computer do.</p>
      <p> The moveDown( ) function is bascially telling the computer to move the game object down for 1 tile.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/L1Tutorial1.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> When you have finished your program, press the 'Execute' button to run it.</p>
      <p> The movement of the game object will follow the blocks order in the main block from up to down.</p>
      <p> Everytime you execute your program script, it will start from the beginning position in the maze</p>
      <p> For example, in the following case the game object will move 2 steps down and 1 step right</p>
      <p> Remember, 1 moving block will only move 1 step!</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/teachExecute.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> There is another 'Execute' button on the top-right corner.</p>
      <p> After we execute the program, look at the code display area.</p>
      <p> You will see there is an arrow indicator showing the statement that the computer is currently doing.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/L1Tutorial2.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> It is fine if you remove a block in the middle and leaving an empty block holder.</p>
      <p> The main block will ignore and skip the empty block holder, then execute the next block.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/teachRemoveMovingBlock.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> If you fall into the fire, you can press the restart button. </p>
      <p> Or you can change your script in main block and execute it again</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/teachRestart.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> If you successfully reach the exit, you can go to the next level by pressing the 'Next Level' button on the top-left corner</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/teachWin.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> Are you ready for the first level?</p>
      <div style="margin-bottom: 50px;">
        <router-link to="/Maze">
          <b-button pill variant="outline-secondary" @click="addBlocksForLevel1">
            <b-icon icon="play-fill"></b-icon> Start to play
          </b-button>
        </router-link>
      </div>

    </div>
    
  </div>
</template>

<script>
export default {
  methods:{
    addBlocksForLevel1: function(){
      var vmApp = this.$root.$children[0]
      /*if(!vmApp.addedLooper){
        vmApp.currentBlockList2D.push([LooperBlock.data().initialData])
        vmApp.addedLooper = true
      }
      if(vmApp.currentLevel == 1){
        vmApp.currentLevel++
      }*/
      vmApp.currentLevel = 1
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