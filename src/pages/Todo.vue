<template>
  <q-page class="bg-grey-3 column">
    <div class="row q-pa-sm bg-primary">
      <q-input
        @keyup.enter="addTask"
        filled
        class="col q-mt-md"
        square
        bg-color="white"
        bottom-slots
        v-model="newTask"
        placeholder="Добавьте задачу"
        dense
      >
        <template v-slot:append>
          <q-btn @click="addTask" round dense flat icon="add" />
        </template>
      </q-input>
    </div>
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
    <div
    
    v-if="!tasks.length"
    
     class="no-task absolute-center">
      <q-icon name="style" size="150px" color="primary" />
      <div class="text-h4 text-primary text-center">Нет задач!</div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      newTask: "",
      tasks: [
        // {
        //   title: "hello1",
        //   done: true,
        // },
        // {
        //   title: "hello2",
        //   done: false,
        // },
        // {
        //   title: "hello3",
        //   done: false,
        // },
      ],
    };
  },
  methods: {
    deleteTask(index) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Вы точно хотите удалить дело?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          this.tasks.splice(index, 1);
          this.$q.notify("Задача удалена!");
        });
    },
    addTask() {
      this.tasks.push({
        title: this.newTask,
        done: false,
      });
      this.newTask = "";
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

.no-task {
  opacity: 0.5;
}
</style>