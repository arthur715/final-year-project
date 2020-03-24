<template>
  <div id="level4Tutorial">

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
      <h2>Level 4 - Repeated Execution 3 : Nested loops</h2>
    </div>

    <div class="main">
      
      <p> We have tried to use a sequencer with a looper to repeat a sequence of movement.</P>
      <p> Also, we know how to use a looper with a moving block to move multiple steps.</p>
      <p> It is time to combine the things together and learn nested loop.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/nestedLoop.png" width="10%" height="10%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> A Nested Loop means have 1 or more for-loop inside another for-loop.</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
        <img src="../assets/CodeCompiledDemo4.png" width="10%" height="10%" style="margin: 20px 0px; min-width:200px;">
      </div>

      <p> Have a look on the maze of the following example. Did you see there is a sequence of movement?</p>
      <p> The sequence is: move up 6 times, move right 3 times, move down 6 times, and move right times.</p>
      <p> Also, the above sequence has repeated 2 times.</p>
      <p> Now let's use the concept we have learnt and try to learn nested loop.</p>
      <p> First, we will have a looper to loop the sequence 2 times.</p>
      <p> Next, we use 4 loopers inside the sequencer to move up 6 steps, move right 3 steps, move down 6 steps and move right 2 steps</p>
      <div width="100vw" height="auto" style="margin-bottom: 20px; ">
        <img src="../assets/teachNestedLoop.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
      </div>
      <p> In programming, this is a very important and basic concept that used very often.</p>
      <p> From the previous level we know we can use looper with sequencer to save a lot of time when we write our program.</p>
      <p style="padding-bottom: 20px; border-bottom: 1px grey solid"> By using nested loop, we can save even more time and space in our program, and give us more flexibility.</p>

      <p> Are you ready for the next level?</p>
      <div style="margin-bottom: 50px;">
        <router-link to="/Maze">
          <b-button pill variant="outline-secondary" @click="addBlocksForLevel4">
            <b-icon icon="play-fill"></b-icon> Start to play
          </b-button>
        </router-link>
      </div>

    </div>
    
  </div>
</template>

<script>

export default {
  name: "Level4Tutorial",
  methods:{
    addBlocksForLevel4: function(){
      var vmApp = this.$root.$children[0]
      /*if(vmApp.currentLevel == 3){
        vmApp.currentLevel++
      }*/
      vmApp.currentLevel = 4
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