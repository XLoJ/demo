<template>
  <b-navbar wrapper-class="container" :shadow="false" :close-on-click="false">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
        <h1 class="is-size-4">XLoJ</h1>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item tag="router-link" :to="{ name: 'Archive' }"
        >题库</b-navbar-item
      >
      <b-navbar-item tag="router-link" :to="{ name: 'ContestList' }"
        >比赛</b-navbar-item
      >
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Navbar'
});
</script>

<style scoped></style>
