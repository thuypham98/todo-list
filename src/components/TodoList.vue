<template>
  <div class="px--5 mb--30">
    <transition name="fade">
      <button
        class="btn my--15 bg--blue float--right btn__add-todo"
        v-if="!isShowAddForm"
        @click="isShowAddForm = !isShowAddForm"
      >
        ✢
      </button>
    </transition>
    <AddTodo
      v-if="isShowAddForm"
      @add-todo="addTodo($event)"
      @cancelAdd="isShowAddForm = !isShowAddForm"
    />
    <table class="table__todo-list mobile__fs--13">
      <tr bgColor="cadetblue" class="text--light">
        <th>Done</th>
        <th>Name</th>
        <th>Time</th>
        <th>Note</th>
        <th>Action</th>
      </tr>
      <TodoItem
        v-for="(todo, index) in todoList"
        v-bind:key="todo.id"
        v-bind:todoProps="todo"
        v-bind:indexTodo="index"
        @completeTodo="completeTodo($event)"
        @confirmRemove="openConfirmModal($event)"
      />
    </table>
    <DeleteModal
      :deleteModal="deleteModal"
      @closeModal="deleteModal = $event"
      @handleDelete="handleDeleteTodo()"
    />
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import todos from '@/data/todo.json';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  name: 'TodoList',
  components: {
    TodoItem,
    AddTodo,
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
      deleteModal: false,
      todoIndex: null,
    };
  },
  methods: {
    openConfirmModal(index) {
      this.todoIndex = index;
      this.deleteModal = true;
    },
    handleDeleteTodo() {
      this.todoList.splice(this.todoIndex, 1);
      this.deleteModal = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn__add-todo {
  margin-right: 2px;
  animation: left-to-right 0.25s;
}
.table__todo-list {
  width: 100%;
  text-align: center;
  th {
    padding: 5px 3px;
  }
}
</style>>
