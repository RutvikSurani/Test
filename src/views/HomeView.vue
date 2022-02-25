<template>
  <div class="home">
    <b-autocomplete
      rounded
      v-model="name"
      :data="filteredDataArray"
      placeholder="e.g. jQuery"
      icon="magnify"
      clearable
    />
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script>
import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "HomeView",
  components: {
    HelloWorld,
  },
});
</script>
