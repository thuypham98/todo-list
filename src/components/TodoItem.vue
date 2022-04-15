<template>
  <tr
    :data-todo-id="todoProp.id"
    :class="[
      'todo__item',
      todoProp.completed ? 'completed' : '',
      state.isEdit ? 'editing' : '',
    ]"
  >
    <td>
      <input
        type="checkbox"
        class="checkbox--large"
        @change="completeTodo()"
        :checked="todoProp.completed"
        :id="`completeCheckbox-${todoProp.id}`"
      />
    </td>
    <td>
      <span
        class="todo__content"
        :contenteditable="state.isAllowEdit"
        ref="nameRef"
        >{{ todoProp.name }}</span
      >
    </td>
    <td>
      <span
        class="todo__content"
        :contenteditable="state.isAllowEdit"
        ref="timeRef"
        >{{ todoProp.time }} Minutes</span
      >
    </td>
    <td>
      <span
        class="todo__content"
        :contenteditable="state.isAllowEdit"
        >{{ todoProp.note }}</span
      >
    </td>
    <td class="table__action">
      <div class="d-flex fw jcc">
        <template v-if="!state.isEdit">
          <button
            class="btn btn--primary fs--20"
            @click="showEditTodoForm()"
          >
            ✎
          </button>
          <button
            class="btn btn--red fs--20"
            @click="removeTodo()"
          >
            ✘
          </button>
        </template>
        <button
          class="btn btn--success fs--20"
          v-else
          @click="handleEditTodo()"
        >
          ✔
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  name: 'TodoItem',
  props: ['todoProp', 'indexTodoProp'], // data from parent component
  emits: ['complete-todo', 'confirm-remove'],
  setup(props, context) {
    const state = reactive({
      isEdit: false,
      isAllowEdit: false,
    });
    const nameRef = ref(null);
    const timeRef = ref(null);

    const completeTodo = () => {
      context.emit('complete-todo', {
        value: !props.todoProp.completed,
        index: props.indexTodoProp,
      });
    };

    const showEditTodoForm = () => {
      state.isEdit = state.isAllowEdit = true;
      timeRef.value.innerText = timeRef.value.innerText.replaceAll(/Minutes/ig, '')
      setTimeout(() => nameRef.value.focus(), 500);
    };

    const handleEditTodo = () => {
      if (!nameRef.value.innerText || !timeRef.value.innerText || isNaN(timeRef.value.innerText)) {
        return false;
      }
      timeRef.value.innerText = `${timeRef.value.innerText} Minutes`;
      state.isEdit = state.isAllowEdit = false;
    };

    const removeTodo = () => {
      const selectedTodo = { ...props.todoProp };
      selectedTodo.index = props.indexTodoProp;
      context.emit('confirm-remove', selectedTodo)
    }

    return {
      state,
      nameRef,
      timeRef,
      completeTodo,
      showEditTodoForm,
      handleEditTodo,
      removeTodo,
    };
  },
};
</script>

<style lang="scss" scoped>
.todo__item {
  height: 5rem;
  background-color: #f5f5f5;
  border-bottom: 1px #ccc dotted;

  &:not(.completed) {
    &:nth-child(odd),
    &:not(.editing):hover {
      background-color: #e9e9e9;
    }
  }

  td {
    max-width: 20rem;

    @include mq(sp) {
      max-width: 10rem;
    }    
  }
}

.todo__content {
  outline: none;
  padding: 0.5rem 2rem;
  border-radius: 1.5rem;
  display: block;
  margin: 0.5rem;
  word-break: break-word;
  max-height: 9rem;
  overflow-y: auto;

  @extend .custom__scrollbar;

  @include mq(sp) {
    padding: 2px 4px;
  }

  .editing & {
    border: 0.3px solid #98baf7;

    &:focus {
      border-color: #6495ed;
      border-width: 2px;
    }
  }
}

.table__action div {
  gap: 0.5rem;

  button {
    padding: {
      top: 0.5rem;
      bottom: 0.5rem
    };
    flex-basis: 4rem;

    @include mq(sp) {
      font-size: 1.3rem;
      flex-basis: 50%;
    }
  }
}

.editing {
  transform: translateY(-2px);
  box-shadow: 0 0 1rem 0.5rem #6a756c;
  background-color: #fff !important;
  transition: all 0.5s;

  @include mq(sp) {
    font-size: 1rem;
  }
}

.completed {
  background-color: #b9b9b9;
  color: #999;
  
  &:not(.editing) .todo__content {
    text-decoration: line-through;
  }
}
</style>
