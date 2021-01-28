<template>
  <div class="header" align="center">
    <img alt="Vue logo" height="50" src="../assets/logo.png" />
    <h1>Todo List</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  background-color: #1f1e3d;
  padding: 10px;
  h1 {
    background: -webkit-linear-gradient(#fff, #005b86);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
}
</style>
