<template>
  <div class="add__todo-box my--10">
    <form @submit.prevent="addTodo()" class="add__todo-form">
      <input
        type="text"
        :class="{ add__input: true, 'border--red': hasError?.name }"
        placeholder="Name..."
        v-model="name"
        ref="nameRef"
      />
      <input
        type="number"
        :class="['add__input', hasError?.time ? 'border--red' : '']"
        placeholder="Time..."
        min="1"
        v-model.number="time"
        ref="timeRef"
      />
      <textarea
        class="add__input"
        placeholder="Note..."
        v-model="note"
        cols="30"
        rows="1"
      >
      </textarea>
      <div class="btn--group">
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
    <small
      class="text--red"
      :style="{
        display: hasError?.name || hasError?.time ? 'block' : 'none',
      }"
    >
      ❄ <b v-show="hasError?.name">Todo name</b>
      <b v-if="!hasError?.name && hasError?.time">Todo time</b> is
      required</small
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
      if (name.value || note.value) {
        const isLeave = confirm('Do you want to leave without finishing?');
        return isLeave ? context.emit('cancel-add') : false;
      }
      context.emit('cancel-add');
    };
    window.onbeforeunload = () =>
      name.value || note.value ? 'Everything...' : null;

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
.add__todo-box {
  .add__todo-form {
    display: flex;
    flex-wrap: wrap;
    padding: 10px 0;
    overflow: hidden;
    transition: all 1s;
    animation: left-to-right 0.7s ease;
    .add__input {
      margin-right: 10px;
    }
  }
}
</style>
