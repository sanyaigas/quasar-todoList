<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
      </q-toolbar>
      <div class="q-px-lg q-pt-xl q-mb-md">
        <div class="text-h3">My TodoList</div>
        <div class="text-subtitle">{{ todaysDate }}</div>
      </div>
      <q-img
        class="header-image absolute-top"
        src="../assets/logo-banner.jpg"
      />
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="600"
    >
      <q-scroll-area
        style="
          height: calc(100% - 277px);
          margin-top: 277px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item to="/" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section> Todo </q-item-section>
          </q-item>

          <q-item to="/todo2" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>

            <q-item-section> Todo2 </q-item-section>
          </q-item>

          <q-item to="/help" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="help" />
            </q-item-section>

            <q-item-section> Поддержка </q-item-section>
          </q-item>

          <q-item to="/about" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="link" />
            </q-item-section>

            <q-item-section> О нас </q-item-section>
          </q-item>

          <q-item to="/contacts" exact clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="contact_phone" />
            </q-item-section>

            <q-item-section> Контакты </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img class="absolute-top image" style="height: 277px">
        <div class="absolute-top bg-transparent">
          <q-avatar size="56px" class="q-mb-sm q-mt-sm">
            <img src="../assets/vaz-dev.jpg" />
          </q-avatar>
          <div class="text-weight-bold">Alex Vazovsky</div>
          <div>@vazovsky</div>
        </div>
        <div class="absolute-bottom bg-transparent">
          <q-select
            filled
            v-model="single"
            :options="options"
            label="Тип занятий"
            style="width: 100%; color: #fff"
          />
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" :selectCase="single" />
        </keep-alive>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, watch } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { date } from "quasar";

const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const single = ref(null);
    const options = ["Дом", "Работа", "Отдых", "Другое", "Все дела"];

    watch(single, (selectCase) => {
      console.log("Выбранный тип:", selectCase);
    });

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      single,
      options,
    };
  },
  computed: {
    todaysDate() {
      const timeStamp = Date.now();
      return date.formatDate(timeStamp, "dddd D MMMM");
    },
  },
});
</script>

<style lang="scss">
.header-image {
  height: 100%;
  z-index: -1;
  filter: grey;
  opacity: 0.1;
}
.image {
  background-color: $primary;
}
.q-field--auto-height.q-field--labeled .q-field__native {
  color: #fff;
}
.q-field__label, .q-field__marginal {
  // color: rgba(255, 255, 255, 0.8);
}
</style>