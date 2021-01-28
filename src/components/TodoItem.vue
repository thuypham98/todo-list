<template>
  <tr
    :data-todo-id="todoProps.id"
    :class="[
      'todo__item',
      todoProps.completed ? 'completed' : '',
      state.isEdit ? 'row__edit' : '',
    ]"
  >
    <td>
      <input
        type="checkbox"
        class="checkbox--large"
        @change="completeTodo(todoProps)"
        :checked="todoProps.completed"
        :id="`completeCheckbox-${todoProps.id}`"
      />
    </td>
    <td>
      <span
        class="content__edit mobile__p--0"
        :contenteditable="state.isAllowEdit"
        ref="nameRef"
        >{{ todoProps.name }}</span
      >
    </td>
    <td>
      <span
        class="content__edit mobile__p--0"
        :contenteditable="state.isAllowEdit"
        >{{ todoProps.time }} phút</span
      >
    </td>
    <td>
      <span
        class="content__edit mobile__p--0"
        :contenteditable="state.isAllowEdit"
        >{{ todoProps.note }}</span
      >
    </td>
    <td>
      <div class="table__action">
        <button
          class="btn btn--primary mr--10 fs--20 py--5"
          v-if="!state.isEdit"
          @click="editTodo(todoProps)"
        >
          ✎
        </button>
        <button
          class="btn btn--success fs--20 py--5"
          v-else
          @click="handleEditTodo()"
        >
          ✔
        </button>
        <button
          class="btn btn--red fs--20 py--5"
          v-if="!state.isEdit"
          @click="removeTodo()"
        >
          ✘
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  name: 'TodoItem',
  props: ['todoProps', 'indexTodo'], // data from parent component
  emits: ['complete-todo', 'confirm-remove'],
  setup(props, context) {
    const state = reactive({
      isEdit: false,
      isAllowEdit: false,
    });
    const nameRef = ref(null);

    const completeTodo = (todoProps) => {
      todoProps.completed = !todoProps.completed;
      context.emit('complete-todo', {
        value: todoProps.completed,
        index: props.indexTodo,
      });
    };

    const editTodo = (todo) => {
      state.isEdit = true;
      state.isAllowEdit = props.todoProps.id == todo.id;
      setTimeout(() => nameRef.value.focus(), 500);
    };

    const handleEditTodo = () => {
      state.isEdit = state.isAllowEdit = false;
    };

    const removeTodo = () => context.emit('confirm-remove', props.indexTodo);

    return {
      state,
      nameRef,
      completeTodo,
      editTodo,
      handleEditTodo,
      removeTodo,
    };
  },
};
</script>

<style lang="scss" scoped>
.todo__item {
  height: 50px;
  background-color: #f5f5f5;
  border-bottom: 1px #ccc dotted;
  &:nth-child(odd),
  &:not(.row__edit):hover {
    background-color: #e9e9e9;
  }
}
.completed {
  text-decoration: line-through;
  background-color: #b9b9b9 !important;
}
.content__edit {
  outline: none;
  padding: 5px 20px;
  border-radius: 20px;
}

.row__edit {
  transform: translateY(-2px);
  box-shadow: 0 0 10px 5px #6a756c;
  font-size: 1.2rem;
  background-color: #fff !important;
  transition: all 0.5s;
  .content__edit {
    border: 0.3px solid #98baf7;
    &:focus {
      border-color: #6495ed;
      border-width: 2px;
    }
  }
}
</style>
