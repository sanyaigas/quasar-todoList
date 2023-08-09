<template>
  <q-page class="bg-grey-3 column">
    <q-list separator bordered>
      <transition-group
        tag="div"
        name="fade"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <q-item
          @click="task.done = !task.done"
          clickable
          :class="{
            'done bg-green-2 animate__animated animate__bounce': task.done,
          }"
          v-for="(task, index) in tasks"
          :key="task.title"
          v-ripple
        >
          <q-item-section avatar>
            <q-checkbox
              class="no-pointer-events"
              v-model="task.done"
              val="teal"
              color="primary"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ task.title }}</q-item-label>
          </q-item-section>
          <q-item-section v-if="task.done" side
            ><q-btn
              @click.stop="deleteTask(index)"
              dense
              flat
              round
              color="primary"
              icon="delete"
          /></q-item-section>
        </q-item>
      </transition-group>
    </q-list>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          title: "hello1",
          done: true,
        },
        {
          title: "hello2",
          done: false,
        },
        {
          title: "hello3",
          done: false,
        },
      ],
    };
  },
  methods: {
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.done {
  .q-item__label {
    text-decoration: line-through;
    color: grey;
  }
}
</style>