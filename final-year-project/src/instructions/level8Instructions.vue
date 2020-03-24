<template>  
  <div id="level8Instructions">

    <div class="main">
      <h4>Goal:</h4>
      <p> - Move the game object to the exit.</p>
      <p> - Put a cross if the game object is at a dead end. (i.e. 3 directions are Fire or Cross)</p>
      <p> - Put a star if the game object is not at a dead end to represent we have visited that tile.</p>
      <p> - After finished this part, please save it in a sequencer and name it 'Put Star/X' for the in next level. If you forget to save, you may have to do it again on the next level.</p>
      <p> - If you put the star or cross correctly on every tile, the maze movement will move the game object to the exit for you.</p>
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