<template>
  <teleport to="#target">
    <transition name="fade">
      <div v-if="deleteModal" class="modal">
        <div class="modal__content">
          <div class="modal__body">Do you want delete this todo?</div>
          <div class="modal__action">
            <button class="btn mr--10 text--dark" @click="closeModal()">
              Close
            </button>
            <button class="btn btn--red" @click="handleDelete()">Delete</button>
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
    deleteModal: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['handleDelete', 'closeModal'], // kebap-case -> log Warning 'Extraneous non-emits event listeners...'
  setup(props, { emit }) {
    const handleDelete = () => emit('handle-delete', false);
    const closeModal = () => emit('close-modal', false);
    return {
      handleDelete,
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

.modal .modal__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 18rem;
  height: 8rem;
  padding: 10px;
  border-radius: 5px;
  animation: scale 0.5s;
}
.modal__action {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  padding: 10px;
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