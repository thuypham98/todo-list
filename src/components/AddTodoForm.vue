<template>
  <div class="add-todo__wrap my--1">
    <form @submit.prevent="addTodo()" class="add-todo__form">
      <input
        type="text"
        :class="{ 'add__input custom__scrollbar': true, 'border--red': hasError?.name }"
        placeholder="Name"
        title="Name"
        v-model="name"
        ref="nameRef"
      />
      <input
        type="number"
        :class="['add__input', hasError?.time ? 'border--red' : '']"
        placeholder="Time"
        title="Time (minutes)"
        min="1"
        v-model.number="time"
        ref="timeRef"
      />
      <textarea
        class="add__input custom__scrollbar"
        placeholder="Note"
        title="Note"
        v-model="note"
        cols="30"
        rows="1"
      >
      </textarea>
      <div class="btn__group d-flex">
        <button
          type="button"
          class="btn btn--secondary btn--rounded"
          @click="cancelAdd()"
        >
          Cancel
        </button>
        <button type="submit" class="btn btn--success btn--rounded">Add</button>
      </div>
    </form>
    <p
      class="text--red"
      :style="{
        display: hasError?.name || hasError?.time ? 'block' : 'none',
      }"
    >
      ❄ <b v-show="hasError?.name">Todo name</b>
      <b v-if="!hasError?.name && hasError?.time">Todo time</b> is
      required</p
    >
  </div>
</template>

<script>
import { ref, reactive, computed } from 'vue';

export default {
  name: 'AddTodo',
  emits: ['add-todo', 'cancel-add'],
  setup(props, context) {
    // setup(props, { attrs, slots, emit })
    const name = ref('');
    const time = ref(1);
    const note = ref('');
    const nameRef = ref(null);
    const timeRef = ref(null);
    let hasError = reactive({});

    const addTodo = () => {
      hasError.name = computed(() => name.value == '');
      hasError.time = computed(() => time.value == '');
      if (name.value === '') return nameRef.value.focus();
      else if (time.value === '') return timeRef.value.focus();
      const newTodo = {
        id: new Date().getTime(),
        name: name.value,
        time: time.value,
        note: note.value,
        completed: false,
      };
      context.emit('add-todo', newTodo); // event child to parent
      // hasError.name = false; // not change
      // hasError.time = false; // not change

      Object.defineProperty(hasError, 'name', { value: false });
      Object.defineProperty(hasError, 'time', { value: false });
      // delete hasError.name;
      // delete hasError.time;
      name.value = note.value = '';
      time.value = 1;
    };
    const cancelAdd = () => {
      let isLeave = true;
      if (name.value || time.value || note.value) {
        isLeave = confirm('Do you want to leave without finishing?');
      }
      return isLeave ? context.emit('cancel-add') : false;
    };
    window.onbeforeunload = () =>
      name.value || time.value || note.value ? 'Bla bla...' : null;

    return {
      name,
      nameRef,
      time,
      timeRef,
      note,
      hasError,
      addTodo,
      cancelAdd,
    };
  },
};
</script>

<style lang="scss" scoped>
.add-todo__wrap {
  @include mq(pc) {
    padding: {
      left: 0.5rem;
      right: 0.5rem;
    };
  }
}

.add-todo__form {
  display: flex;
  flex-wrap: wrap;
  padding: 1rem 0;
  overflow: hidden;
  transition: all 1s;
  animation: left-to-right 0.7s ease;
}

.add__input {
  margin-right: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 1.5rem;
  border: 0.5px solid #ddd;
  font-size: 1.5rem;
  resize: none;

  &:focus {
    outline: none;
    border: 1px solid #40e0d0;
  }
}

.btn__group {
  @include mq(tab_s) {
    margin-top: 1rem;
  }

  button {
    &:first-child {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:last-child {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    &:not(:last-child) {
      border-right: 0.5px solid;
    }
  }
}

@include mq(sp) {
  .add-todo__wrap {
    display: flex;
    flex-direction: column-reverse;
  }

  .add-todo__form {
    flex-direction: column;
  }

  .add__input {
    margin-right: 0 !important;
    margin-bottom: 1rem;
  }

  .btn__group button {
    flex: 1;
  }
}
</style>
