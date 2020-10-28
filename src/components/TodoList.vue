<template>
  <div class="header" align="center">
    <img alt="Vue logo" height="50" src="../assets/logo.png" />
    <h1>Todo List</h1>
  </div>
  <!-- <div contenteditable="true">I'm Editable. Edit me!</div> -->
  <div class="content">
    <button
      class="btn my--20 bg--blue"
      v-if="!isShow"
      @click="isShow = !isShow"
    >
      +
    </button>
    <div class="add__todo--item" v-if="isShow">
      <AddItem v-bind:todoList="todoList" @add-item="addItem"/>
      <!-- <input
        type="text"
        class="add__input"
        placeholder="Todo name"
        v-model="name"
        @change="isChange"
      />
      <input
        type="number"
        class="add__input mx--20"
        placeholder="Todo time"
        min="1"
        v-model="workTime"
        @change="isChange"
      />
      <button class="btn btn__add" @click="addTodoItem()">Add</button> -->
    </div>
    <p style="color: #ff0000" v-if="isError">Vui lòng nhập công việc</p>
    <table class="todo__table--list" border="1" cellpadding="5" cellspacing="0">
      <tr bgColor="cadetblue">
        <th>Complete</th>
        <th>Work</th>
        <th>Time</th>
        <th>Action</th>
      </tr>
      <TodoItem
        v-for="(todo, index) in todoList"
        v-bind:key="todo.id"
        v-bind:todoProps="todo"
        v-bind:indexProps="index"
        @remove-from-parent="removeTodoItem"
      />
    </table>
  </div>
</template>

<script>
import { ref } from "vue";
import TodoItem from "./TodoItem";
import AddItem from './AddItem';

export default {
  name: "TodoList",
  components: {
    TodoItem,
    AddItem
  },
  setup() {
    const todoList = ref([
      {
        id: 1,
        name: "Đọc sách",
        workTime: 30,
        isCompleted: false,
      },
      {
        id: 2,
        name: "Học tập",
        workTime: 60,
        isCompleted: false,
      },
      {
        id: 3,
        name: "Chơi game",
        workTime: 180,
        isCompleted: false,
      },
    ]);
    const addItem = newItem => {
      todoList.value.push(newItem);
    }
    return { todoList, addItem };
  },
  data() {
    return {
      isShow: false,
      isError: false,
      name: "",
      workTime: 1,
    };
  },
  methods: {
    removeTodoItem(index) {
      this.todoList.splice(index, 1);
    },
    addTodoItem() {
      if (this.name == "") {
        this.isError = true;
      } else {
        const value = {
          id: this.todoList.length + 1,
          name: this.name,
          workTime: this.workTime,
          isCompleted: false,
        };
        this.todoList.push(value);
        this.isShow = !this.isShow;
        this.isError = false;
        this.name = "";
        this.workTime = 1;
      }
    },
    isChange(){
      window.addEventListener('onbeforeunload', () => {
        const isLeave = window.confirm('Do you want to leave without finishing?');
        if(!isLeave){
          console.log('nooo');
        }
      });
    }
  },
};

</script>

<style scoped>
.header {
  background-color: rgb(31, 30, 61);
  padding: 10px;
  color: #fff;
}
.add__todo--item {
  margin: 10px 0;
}

input.add__input:focus {
  outline: none;
  border: 1px solid turquoise;
}
.todo__table--list {
  width: 100%;
  text-align: center;
}

</style>>
