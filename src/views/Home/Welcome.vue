<template>
  <section class="hero is-info is-bold is-fullheight">
    <div class="hero-head">
      <b-navbar
        :close-on-click="false"
        :shadow="false"
        wrapper-class="container"
      >
        <template #brand>
          <b-navbar-item :to="{ name: 'Home' }" tag="router-link">
            <h1 class="is-size-4">XLoJ</h1>
          </b-navbar-item>
        </template>
        <template #start>
          <b-navbar-item :to="{ name: 'Archive' }" tag="router-link"
            >题库
          </b-navbar-item>
          <b-navbar-item :to="{ name: 'ContestList' }" tag="router-link"
            >比赛
          </b-navbar-item>
        </template>
      </b-navbar>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="columns is-multiline">
          <h1 class="column is-full title">XLor Online Judge</h1>
          <div class="column is-full buttons">
            <b-button
              :to="{ name: 'Home' }"
              outlined
              tag="router-link"
              type="is-light"
              >立即开始
            </b-button>
            <b-button
              :to="{ name: 'Login' }"
              outlined
              tag="router-link"
              type="is-light"
              >登录
            </b-button>
            <b-button
              :to="{ name: 'Register' }"
              outlined
              tag="router-link"
              type="is-light"
              >注册
            </b-button>
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
