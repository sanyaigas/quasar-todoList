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
          @click="toggleDone(task.id)"
          clickable
          :class="{
            'done bg-green-2 animate__animated animate__bounce': task.done,
          }"
          v-for="task in tasks"
          :key="task.id"
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
              @click.stop="deleteTask(task.id)"
              dense
              flat
              round
              color="primary"
              icon="delete"
          /></q-item-section>
        </q-item>
      </transition-group>
    </q-list>
    <div v-if="!tasks.length" class="no-task absolute-center">
      <q-icon name="style" size="150px" color="primary" />
      <div class="text-h4 text-primary text-center">Нет задач!</div>
    </div>
  </q-page>
</template>

<script>
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * firebase ref
 */

const todosCollectionRef = collection(db, "todos");
const todosCollectionQuery = query(todosCollectionRef, orderBy("date", "desc"));

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
    deleteTask(id) {
      this.$q
        .dialog({
          title: "Confirm",
          message: "Вы точно хотите удалить дело?",
          cancel: true,
          persistent: true,
        })
        .onOk(() => {
          deleteDoc(doc(todosCollectionRef, id));
          this.$q.notify("Задача удалена!");
        });
    },
    addTask() {
      addDoc(todosCollectionRef, {
        content: this.newTask,
        done: false,
        date: Date.now(),
      });
      this.newTask = "";
    },
    toggleDone(id) {
      const index = this.tasks.findIndex((task) => task.id === id);

      updateDoc(doc(todosCollectionRef, id), {
        done: !this.tasks[index].done,
      });
    },
  },
  mounted() {
    //  this.fetchTodo();

    onSnapshot(todosCollectionQuery, (querySnapshot) => {
      const fbTodos = [];
      querySnapshot.forEach((doc) => {
        const todo = {
          id: doc.id,
          title: doc.data().content,
          done: doc.data().done,
        };
        fbTodos.push(todo);
      });
      this.tasks = fbTodos;
    });
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