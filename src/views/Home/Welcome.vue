<template>
  <section class="hero is-info is-bold is-fullheight">
    <div class="hero-head">
      <b-navbar
        wrapper-class="container"
        :shadow="false"
        :close-on-click="false"
      >
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
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-multiline">
          <h1 class="column is-full title">XLor Online Judge</h1>
          <div class="column is-full buttons">
            <b-button type="is-light" outlined tag="router-link" :to="'Home'"
              >立即开始</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Welcome'
});
</script>
