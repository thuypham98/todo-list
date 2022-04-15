<template>
  <header class="header pa--1" align="center">
    <img alt="Vue logo" height="50" src="../assets/logo.png" />
    <h1>Todo List</h1>
  </header>
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

  h1 {
    background: -webkit-linear-gradient(#fff, #005b86);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
  }
}
</style>
