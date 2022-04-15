<template>
  <div class="todo-list__wrap mb--3">
    <transition name="fade">
      <button
        class="btn my--1 bg--blue float--right btn__add-todo"
        v-if="!isShowAddForm"
        @click="isShowAddForm = !isShowAddForm"
      >
        ✢
      </button>
    </transition>
    <AddTodoForm
      v-if="isShowAddForm"
      @add-todo="addTodo($event)"
      @cancelAdd="isShowAddForm = !isShowAddForm"
    />
    <table class="todo-list__table">
      <thead>
        <tr bgColor="cadetblue" class="text--light">
          <th>Status</th>
          <th>Name</th>
          <th>Time</th>
          <th>Note</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <TodoItem
          v-for="(todo, index) in todoList"
          v-bind:key="todo.id"
          v-bind:todoProp="todo"
          v-bind:indexTodoProp="index"
          @completeTodo="completeTodo($event)"
          @confirmRemove="openConfirmModal($event)"
        />
      </tbody>
    </table>
    <DeleteModal
      :isShowDeleteModal="isShowDeleteModal"
      :handleDeleteTodo="handleDeleteTodo"
      @closeModal="isShowDeleteModal = $event"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import todos from '@/data/todos.json';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  name: 'TodoList',
  components: {
    TodoItem,
    AddTodoForm,
    DeleteModal,
  },
  setup() {
    const todoList = ref(todos);
    const addTodo = (newItem) => {
      todoList.value.push(newItem);
    };
    const completeTodo = ({ value, index }) => {
      todoList.value[index].completed = value;
    };
    watch(todoList.value, () => {
      todoList.value.sort((a, b) => a.completed - b.completed);
    });
    
    return { todoList, addTodo, completeTodo };
  },
  data() {
    return {
      isShowAddForm: false,
      isShowDeleteModal: false,
      selectedTodo: null,
    };
  },
  methods: {
    openConfirmModal(todo) {
      this.selectedTodo = todo;
      this.isShowDeleteModal = true;
    },
    handleDeleteTodo() {
      this.todoList.splice(this.selectedTodo.index, 1);
      this.isShowDeleteModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-list {
  &__table {
    width: 100%;
    text-align: center;
    font-size: 1.5rem;

    @include mq(sp) {
      font-size: 1.3rem;
    }

    th {
      padding: 5px 3px;
      font-size: 1.8rem;
    }
  }
}

.btn__add-todo {
  margin-right: 2px;
  animation: left-to-right 0.25s;
}
</style>>
