<template>
  <div class="px--5 mb--30">
    <transition name="fade">
      <button
        class="btn my--15 bg--blue float--right btn__add-todo"
        v-if="!state.isShowAddForm"
        @click="toggleAddTodoForm()"
      >
        ✢
      </button>
    </transition>
    <AddTodo
      v-if="state.isShowAddForm"
      @add-todo="addTodo($event)"
      @cancelAdd="toggleAddTodoForm()"
    />
    <table class="table__todo-list mobile__fs--13">
      <thead>
        <tr bgColor="cadetblue" class="text--light">
          <th>Done</th>
          <th>Name</th>
          <th>Time</th>
          <th>Note</th>
          <th>Action</th>
        </tr>
      </thead>
      <!-- <TodoItem
        v-for="(todo, index) in todoList"
        v-bind:key="todo.id"
        v-bind:todoProps="todo"
        v-bind:indexTodo="index"
        @completeTodo="completeTodo($event)"
        @confirmRemove="openConfirmModal($event)"
      /> -->
      <tbody>
        <tr
          data-todo-id="indexTodo"
          :class="[
            'todo__item',
            todoProps.isCompleted ? 'completed' : '',
            state.isEdit ? 'row__edit' : '',
          ]"
          v-for="todo in todoList"
          v-bind:key="todo.id"
        >
          <td>
            <input
              type="checkbox"
              class="checkbox--large"
              @change="complete(todo)"
              :checked="todo.isCompleted"
              :id="`completeCheckbox-${todo.id}`"
            />
          </td>
          <td>
            <label
              class="content__edit"
              :contenteditable="state.todoId == todo.id"
              ref="nameRef"
              >{{ todo.name }}</label
            >
          </td>
          <td>
            <span
              class="content__edit"
              :contenteditable="state.todoId == todo.id"
              >{{ todo.workTime }} phút</span
            >
          </td>
          <td>
            <span
              class="content__edit"
              :contenteditable="state.todoId == todo.id"
              >{{ todo.note }}</span
            >
          </td>
          <td>
            <button
              class="btn btn--primary mr--20 fs--25 py--5"
              v-if="!state.isEdit"
              @click="editTodo(todo)"
            >
              ✎
            </button>
            <button
              class="btn btn--success fs--25 py--5"
              v-else
              @click="handleEditTodo()"
            >
              ✔
            </button>
            <button
              class="btn btn--red fs--25 py--5"
              v-if="!state.isEdit"
              @click="openConfirmModal(todo.id)"
            >
              ✘
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <DeleteModal
      :deleteModal="deleteModal"
      @closeModal="deleteModal = $event"
      @handleDelete="handleDeleteTodo()"
    />
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue';
// import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import todos from '../../data/todo.json';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  name: 'TodoList',
  components: {
    AddTodo,
    DeleteModal,
  },
  setup() {
    const todoList = ref(todos);
    const state = reactive({
      isEdit: false,
      todoId: null,
      deleteModal: false,
    });
    const nameRef = ref(null);
    const toggleAddTodoForm = () => (state.deleteModal = !state.deleteModal);
    const addTodo = (newItem) => todoList.value.unshift(newItem);
    const editTodo = (todo) => {
      state.isEdit = true;
      state.todoId = todo.id;
      setTimeout(() => nameRef.value.focus(), 500);
    };
    const handleEditTodo = () => {
      state.isEdit = state.todoId = null;
    };
    const openConfirmModal = () => {
      state.deleteModal = true;
    };
    const completeTodo = ({ value, index }) => {
      todoList.value[index].completed = value;
    };
    watch(todoList.value, () => {
      todoList.value.sort((a, b) => a.completed - b.completed);
    });
    return {
      todoList,
      state,
      nameRef,
      toggleAddTodoForm,
      addTodo,
      editTodo,
      handleEditTodo,
      completeTodo,
      openConfirmModal,
    };
  },
  data() {
    return {
      isShowAddForm: false,
      deleteModal: false,
      todoIndex: null,
    };
  },
  methods: {
    // openConfirmModal(index) {
    //   this.todoIndex = index;
    //   this.deleteModal = true;
    // },
    // handleDeleteTodo() {
    //   this.todoList.splice(this.todoIndex, 1);
    //   this.deleteModal = false;
    // },
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
