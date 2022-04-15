<template>
  <Header />
  <TodoList />
  <Footer />
</template>

<script>
import Header from './components/Header.vue';
import TodoList from './components/TodoList.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    Header,
    TodoList,
    Footer,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
