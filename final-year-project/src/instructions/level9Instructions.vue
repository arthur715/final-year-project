<template>  
  <div id="level9Instructions">

    <div class="main">
      <h4>Goal:</h4>
      <p> - Move the game object to the exit.</p>
      <p> - If the game object is at a dead end, move to the only available direction.</p>
      <p> - If the game object is not at a dead end, use 'NDE Movement' block.</p>
      <p> - Use only 1 'Move Left', 1 'Move Right', 1 'Move Up' and 1 'Move Down' block.</p>
      <p> - After finished this part, please save it in a sequencer and name it 'Maze Movement' for the next level. If you forget to save, you may have to do it again on the next level.</p>
      <p> - If you do the dead end movement correctly, the 'NDE Movement' will fot the non dead end movement for you.</p>
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