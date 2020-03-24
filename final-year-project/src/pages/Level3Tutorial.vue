<template>
  <div id="level3Tutorial">

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
      <h2>Level 3 - Repeated Execution 2 : Using for loop to repeat a sequence of functions</h2>
    </div>

    <div class="main">
      <p> In the last level, we have learnt how to use a for-loop to perform repeated execution for a single function.</p>
      <p> Now let us look at how to use a for-loop to perform repeated execution for a sequence of functions.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/CodeCompiledDemo3.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> So far we have learnt to use a looper with a moving block to move multiple steps.</P>
      <p> But what if we want to perform more than one movement in each loop, for example if we want to move right and down for 5 times?</p>
      <p> In this case we can use a sequencer.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/sequencer.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> A sequencer is used to give an order for the blocks to execute.</p>
      <p> It will execute the blocks from the top to the bottom in order.</p>
      <p> Does this sound very familiar like a main block? Yes!!!</p>
      <p> In fact, the main block itself is also a sequencer.</p>
      <p> When we press the execute button, the program will first look at the main block,</p>
      <p> then execute the blocks inside in sequence and will ignore any empty block holder.</p>
      <p> Just like the main block, we can put another sequencer or looper into the sequencer.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/filledSequencer.png" width="20%" height="20%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> The usage of the sequencer is same as the main block.</p>
      <p> We can press the '+' or '-' button to add or remove block holders,</p>
      <p> When we drag a sequencer to the block holder, we have to first click on it to expand.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/teachSequencer.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> As before we can rename and save a sequencer for future use if you are using desktop or laptop.</p>
      <p> We have to first rename a sequencer before we can save it to the repository.</p>
      <p> Once again we should rename the sequencer with some meaningful name.</p>
      <p> For example we can name it 'RD' to represent the sequence: 'Move Right', then 'Move Down' .</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/teachRenameSaveSequencer.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> And when we want to move the sequencer to another block holder or remove it, we have to click on it again to make it collapse.</p>
      <p> Everything is just like what we did in the previous level.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/teachRemoveSequencer.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> Go back to the first question. If we want to move right and down for 5 times, we can use a sequencer inside a looper.</p>
      <p> The looper will loop whatever block inside the block holder n times.</p>
      <p> So if we put a sequencer with 'Move Right' and 'Move Down' block inside a looper and set the Loop Times to 5, the looper will loop the sequencer 5 times.</p>
      <p> This is actually same as using 'Move Right', then 'Move Down', then 'Move Right, then 'Move Down'......</p>
      <p> But instead of using 10 blocks, we can now do it with just 4 blocks. </p>
      <div width="100vw" height="auto" style="margin-bottom: 20px;">
        <img src="../assets/teachLooperWithSequencer.gif" width="50%" height="50%" style="margin: 20px 0px; min-width:200px;">
      </div>
      <p> Imagine if the game map is very large and you have to repeat the above sequence of movement 10000 times.</p>
      <p> How many blocks do you think we will have to use? The answer is 4 again!!!!</p>
      <p> Did you see we can save a lot of time by using looper and sequencer? This is the power of programing.</p>
      <p> Without any of these control blocks, we will have to drag 'Move Right' and 'Move Down' 10000 times each.</p>
      <p style="padding-bottom: 20px; border-bottom: 1px grey solid"> That is 'Move Right', 'Move Down', 'Move Right'......Ughhhhhh, I can't imagine. </p>

      <p> Are you ready for the next level?</p>
      <div style="margin-bottom: 50px;">
        <router-link to="/Maze">
          <b-button pill variant="outline-secondary" @click="addBlocksForLevel3">
            <b-icon icon="play-fill"></b-icon> Start to play
          </b-button>
        </router-link>
      </div>

    </div>
    
  </div>
</template>

<script>
//import SequencerBlock from '../components/blocks/SequencerBlock.vue'

export default {
  name: "Level3Tutorial",
  methods:{
    addBlocksForLevel3: function(){
      var vmApp = this.$root.$children[0]
      /*if(!vmApp.addedSequencer){
        vmApp.currentBlockList2D.push([SequencerBlock.data().initialData])
        vmApp.addedSequencer = true
      }
      if(vmApp.currentLevel == 2){
        vmApp.currentLevel++
      }*/
      vmApp.currentLevel = 3
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