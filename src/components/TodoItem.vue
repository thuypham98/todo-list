<template>
  <tr :class="['todo__item']">
    <td>
      <input
        type="checkbox"
        @change="complete(todoProps)"
        :checked="todoProps.isCompleted"
        :id="`completeCheckbox-${todoProps.id}`"
      />
    </td>
    <td>
      <label
        :class="todoProps.isCompleted ? 'completed' : ''"
        :for="`completeCheckbox-${todoProps.id}`"
        >{{ todoProps.name }}</label
      >
    </td>
    <td>
      <span :class="todoProps.isCompleted ? 'completed' : ''"
        >{{ todoProps.workTime }} phút</span
      >
    </td>
    <td>
      <button class="btn btn__remove" @click="removeItem(indexProps)">
        Remove
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TodoItem",
  props: ["todoProps", "indexProps"], //get data from parent component
  methods: {
    complete(todoProps) {
      todoProps.isCompleted = !todoProps.isCompleted;
    },
    removeItem(index) {
      this.$emit("remove-from-parent", index); //child to parent
    },
  },
};
</script>

<style scoped>
.todo__item {
  padding: 8px;
  background-color: #f5f5f5;
  border-bottom: 1px #ccc dotted;
}
.btn__remove {
  background-color: #ff0000;
  color: #fff;
}
.completed {
  text-decoration: line-through;
}
</style>