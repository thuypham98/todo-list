<template>
  <form @submit="addItem">
    <input
      type="text"
      class="add__input"
      placeholder="Todo name"
      v-model="name"
    />
    <input
      type="number"
      class="add__input mx--20"
      placeholder="Todo time"
      min="1"
      v-model="workTime"
    />
    <input type="submit" value="Add" class="btn btn__add" />
  </form>
</template>

<script>
import { ref } from "vue";

export default {
  name: "AddItem",
  props: ["todoList"],
  setup(props, context) {
    const name = ref("");
    const workTime = ref(1);
    const addItem = (event) => {
      console.log("todoListReceive: ", props.todoList);
      event.preventDefault(); //remove defautl action form (submit to action="....")
      const newItem = {
        id: props.todoList.length + 1,
        name: name.value,
        workTime: +workTime.value,
        isCompleted: false,
      };
      context.emit("add-item", newItem); //event child to parent
      name.value = "";
      workTime.value = 1;
    };
    return { name, workTime, addItem };
  },
};
</script>

<style>
</style>