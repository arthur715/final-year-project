<template>  
  <div id="level6Instructions">

    <div class="main">
      <h4>Goal:</h4>
      <p> - Move the game object to the exit.</p>
      <p> - Use <b>at least 3 selector</b> to handle movement for all directions.</p>
      <p> - Use only <b>1 looper</b>.</p>
      <p> - Use <b>no more than 16 blocks</b>.</p>
      <h4>Hints:</h4>
      <p> - You will have to <b>put a selector inside another selector</b> to check different direction.</p>
      <p> - <b>Put a cross on the map everytime before you move!</b> Or you will find yourself keep moving left-right, or up-down at some point.</p>
      <p> - If you find yourself keep moving left-right or up-down, press the <b>restart</b> button and fix your program.</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.header {
  padding: 10px;
  margin: 40px 50px 10px 50px;
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
  padding: 10px 0px 0px 0px;
  margin: 10px 50px 0px 50px;
  text-align: left;
  background: white;
  color: rgb(129, 129, 129);
  font-size: 15px;
}
</style>