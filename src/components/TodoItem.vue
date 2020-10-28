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
      <label class="content__edit"
        contenteditable="true"
        :class="todoProps.isCompleted ? 'completed' : ''"
        >{{ todoProps.name }}</label
      >
    </td>
    <td>
      <span class="content__edit"
        contenteditable="true"
        :class="todoProps.isCompleted ? 'completed' : ''"
        >{{ todoProps.workTime }} phút</span
      >
    </td>
    <td>
      <!-- <button class="btn btn__edit mx--20" @click="editItem">
        Edit
      </button> -->
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
  // setup(props, context){
  //   const removeItem = () => {
  //     // console.log(props.todoProps);
  //     context.emit('remove-from-parent', props.todoProps.id)
  //   }
  //   return { removeItem }
  // },
  methods: {
    complete(todoProps) {
      todoProps.isCompleted = !todoProps.isCompleted;
    },
    removeItem(index) {
      this.$emit("remove-from-parent", index); //child to parent
    }
  },
};
</script>

<style scoped>
.todo__item {
  padding: 8px;
  background-color: #f5f5f5;
  border-bottom: 1px #ccc dotted;
}

.completed {
  text-decoration: line-through;
}
.content__edit:focus{
  outline: none;
  padding: 5px 20px;
  border: 1px solid #6495ed;
}
</style>