<template>
  <div id="home">

    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="/">Home</b-navbar-brand>
      </b-navbar>
    </div>

    <div class="header">
      <h1>Escape from the Fire Maze</h1>
      <p>Write a program to solve a maze game by using software components. Are you ready for it?</p>
      <div>
        <router-link to="/Level-1-Tutorial">
          <b-button pill variant="outline-light">
            <b-icon icon="play-fill"></b-icon> Start Game
          </b-button>
        </router-link>
      </div>
    </div>

    <h4>Features of the game:</h4>
    <div width="100vw" height="auto" style="margin: 0px 0px 20px 0px; padding: 40px 50px 0px 50px; min-width: 300px; text-align: left;">
      <h5>1.) Easy-to-use Graphical Interface</h5>
      <p style="padding: 0px 0px 20px 30px;"> - Learn programming in a fun way by drag-and-drop the components to create a program and use programming to solve a maze!</p>
      <h5>2.) 10 Levels with Clear Learning Objective to Learn Programming Step-by-Step</h5>
      <p style="padding: 0px 0px 20px 30px;"> - No previous knowledge is required before playing this game and you will learn the basic programming concepts through different tasks.</p>
      <h5>3.) Reactive Auto-Generated Code Display Area</h5>
      <p style="padding: 0px 0px 20px 30px;"> - You can just use the components to build the code instead of typing them and worrying about the weird syntax</p>
      <h5>4.) Indicator for Better Understanding the flow</h5>
      <p style="padding: 0px 0px 20px 30px;"> - The indicator will show the currently executing statement to help understanding the control flow and what is happening with the code.</p>
    </div>
    
    <div width="100vw" height="auto" style="margin-bottom: 20px; border-bottom: 1px grey solid">
      <img src="../assets/homePageExample1.gif" width="60%" height="60%" style="margin: 20px 0px; min-width:200px;">
    </div>

    <h4 style="padding: 20px 0px 20px 0px;">What you will learn?</h4>
    <p> In this game, you will learn some basic control flow statement used very often in real life programming.</p>
    <p> At the end of the game, we will use everything we have learnt to build a simple Maze Algorithm.</p>
    <p> There are 10 different levels with specially-designed game map to teach basic programming concepts progressively.</p>
    <div width="100vw" height="auto" style="margin: 0px 0px 30px 0px; padding: 20px 50px 20px 50px; text-align: left; border-bottom: 1px grey solid;">
      
      <b-card
        title="Level 1 - Sequential Execution"
        img-alt="Image"
        img-top
        tag="article"
        style="min-width: 20rem;"
        bg-variant="light"
        class="mb-2"
      >
        <b-card-text>
          Learn the basic of programming
        </b-card-text>
        <router-link to="/Level-1-Tutorial">
          <b-button variant="outline-dark">
            <b-icon icon="play-fill"></b-icon> Level 1
          </b-button>
        </router-link>
      </b-card>

      <b-card
        title="Level 2 - Repeated Execution 1 : For-loop"
        img-alt="Image"
        img-top
        tag="article"
        style="min-width: 20rem;"
        bg-variant="light"
        class="mb-2"
      >
        <b-card-text>
          Understand the power of programming is based on looping
        </b-card-text>
        <router-link to="/Level-2-Tutorial">
          <b-button variant="outline-dark">
            <b-icon icon="play-fill"></b-icon> Level 2
          </b-button>
        </router-link>
      </b-card>

      <b-card
        title="Level 3 - Repeated Execution 2 : Looping Sequence"
        img-alt="Image"
        img-top
        tag="article"
        style="min-width: 20rem;"
        bg-variant="light"
        class="mb-2"
      >
        <b-card-text>
          Execute a sequence repeatedly using Looper and Sequencer
        </b-card-text>
        <router-link to="/Level-3-Tutorial">
          <b-button variant="outline-dark">
            <b-icon icon="play-fill"></b-icon> Level 3
          </b-button>
        </router-link>
      </b-card>

      <b-card
        title="Level 4 - Repeated Execution 3 : Nested Loop"
        img-alt="Image"
        img-top
        tag="article"
        style="min-width: 20rem;"
        bg-variant="light"
        class="mb-2"
      >
        <b-card-text>
          Loop inside another loop
        </b-card-text>
        <router-link to="/Level-4-Tutorial">
          <b-button variant="outline-dark">
            <b-icon icon="play-fill"></b-icon> Level 4
          </b-button>
        </router-link>
      </b-card>

      <b-card
        title="Level 5 - Test your understanding"
        img-alt="Image"
        img-top
        tag="article"
        style="min-width: 20rem;"
        bg-variant="light"
        class="mb-2"
      >
        <b-card-text>
          Using the previous concepts that we have learnt
        </b-card-text>
        <router-link to="/Level-5-Tutorial">
          <b-button variant="outline-dark">
            <b-icon icon="play-fill"></b-icon> Level 5
          </b-button>
        </router-link>
      </b-card>

      <b-card
        title="Level 6 - Conditional Execution 1 : If-else statement"
        img-alt="Image"
        img-top
        tag="article"
        style="min-width: 20rem;"
        bg-variant="light"
        class="mb-2"
      >
        <b-card-text>
          Another necessary control flow statement that you must learn
        </b-card-text>
        <router-link to="/Level-6-Tutorial">
          <b-button variant="outline-dark">
            <b-icon icon="play-fill"></b-icon> Level 6
          </b-button>
        </router-link>
      </b-card>

      <b-card
        title="Level 7 - Conditional Execution 2 : Practising if-else statement"
        img-alt="Image"
        img-top
        tag="article"
        style="min-width: 20rem;"
        bg-variant="light"
        class="mb-2"
      >
        <b-card-text>
          If-else statement may sometimes be hard to use.
        </b-card-text>
        <router-link to="/Level-7-Tutorial">
          <b-button variant="outline-dark">
            <b-icon icon="play-fill"></b-icon> Level 7
          </b-button>
        </router-link>
      </b-card>

      <b-card
        title="Level 8 - Maze Algorithm 1 : Put Star or Cross ?"
        img-alt="Image"
        img-top
        tag="article"
        style="min-width: 20rem;"
        bg-variant="light"
        class="mb-2"
      >
        <b-card-text>
          Solve a complex problem by splitting it into smaller problem
        </b-card-text>
        <router-link to="/Level-8-Tutorial">
          <b-button variant="outline-dark">
            <b-icon icon="play-fill"></b-icon> Level 8
          </b-button>
        </router-link>
      </b-card>

      <b-card
        title="Level 9 - Maze Algorithm 2 : Dead-End Movement"
        img-alt="Image"
        img-top
        tag="article"
        style="min-width: 20rem;"
        bg-variant="light"
        class="mb-2"
      >
        <b-card-text>
          Reusing components that created in the previous level
        </b-card-text>
        <router-link to="/Level-9-Tutorial">
          <b-button variant="outline-dark">
            <b-icon icon="play-fill"></b-icon> Level 9
          </b-button>
        </router-link>
      </b-card>

      <b-card
        title="Level 10 - Maze Algorithm 3 - Non Dead-End Movement"
        img-alt="Image"
        img-top
        tag="article"
        style="min-width: 20rem;"
        bg-variant="light"
        class="mb-2"
      >
        <b-card-text>
          Practice everything that we have learnt in the previous level
        </b-card-text>
        <router-link to="/Level-10-Tutorial">
          <b-button variant="outline-dark">
            <b-icon icon="play-fill"></b-icon> Level 10
          </b-button>
        </router-link>
      </b-card>

    </div>
    
    <footer style="margin: 0px 0px 50px 0px;">  Copyright &copy; {{ new Date().getFullYear() }} Arthur Cheung</footer>
    
  </div>
</template>

<script>
export default {

}
</script>


<style scoped>
/* Header/logo Title */
.header {
  padding: 80px;
  text-align: center;
  background: #5dc7b2;
  color: white;
  font-size: 20px;
  margin: 0px 0px 50px 0px;
}

/* Increase the font size of the heading */
.header h1 {
  font-size: 40px;
}
.main {
  padding: 40px;
}
p{
  font-size: 18px;
}
</style>