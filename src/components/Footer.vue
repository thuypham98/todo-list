<template>
  <footer class="footer">
    <small class="copyright">
      Copyright &copy; 2020, All Right Reserved - Designed By Thuy Pham
    </small>
    <small class="text--red">❤️️</small>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ecf0f1;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 0.5rem;
  color: #7f8c8d;
  user-select: none;
  font-size: 1.5rem;
  padding: {
    left: 0.5rem;
    right: 0.5rem;
  };

  @include mq(sp) {
    font-size: 1.3rem;
  }
}
</style>