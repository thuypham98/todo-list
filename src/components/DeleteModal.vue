<template>
  <teleport to="#target">
    <transition name="fade">
      <div v-if="isShowDeleteModal" class="modal">
        <div class="modal__inner pa--2">
          <div class="modal__content">Do you want delete this todo?</div>
          <div class="modal__action">
            <button class="btn mr--1 text--dark" @click="closeModal()">
              Cancel
            </button>
            <button class="btn btn--red" @click="handleDeleteTodo()">Delete</button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: 'DeleteModal',
  props: {
    isShowDeleteModal: {
      type: Boolean,
      default: false,
    },
    handleDeleteTodo: Function
  },
  emits: ['closeModal'], // kebap-case -> log Warning 'Extraneous non-emits event listeners...'
  setup(props, { emit }) {
    const closeModal = () => emit('close-modal', false);
    return {
      closeModal,
    };
  },
};
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* transition: 0.5s; */
}

.modal__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 0.5rem;
  animation: scale 0.5s;
}

.modal__content {
  font-size: 2.5rem;
}

.modal__action {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding: 1rem;
  /* border-top: 0.5px solid #ccc; */
}

@keyframes scale {
  0% {
    transform: scale(0) skew(50deg, 35deg);
  }
  80% {
    transform: scale(1.3) skew(1deg, 0.5deg);
  }
  100% {
    transform: scale(1);
  }
}
</style>