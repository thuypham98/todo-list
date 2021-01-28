<template>
  <Header />
  <TodoList />
  <Footer />
</template>

<script>
import Header from './components/Header.vue';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

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
@import '../public/style.scss';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
