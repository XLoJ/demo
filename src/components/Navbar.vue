<template>
  <b-navbar wrapper-class="container" shadow spaced :close-on-click="false">
    <template #brand>
      <b-navbar-item tag="router-link" :to="{ name: 'Home' }">
        <h1 class="logo has-text-black">XLoJ</h1>
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

    <template #end>
      <b-navbar-item tag="div">
        <div v-if="!isLogin" class="buttons">
          <router-link class="button is-primary" :to="{ name: 'Login' }"
            >登录</router-link
          >
          <router-link class="button is-light" :to="{ name: 'Login' }"
            >注册</router-link
          >
        </div>
        <div v-else>
          <b-dropdown
            position="is-bottom-left"
            append-to-body
            aria-role="menu"
            scrollable
            max-height="200"
            trap-focus
          >
            <template #trigger>
              <a class="navbar-item" role="button">
                <span>{{ user.nickname }}</span>
              </a>
            </template>
            <b-dropdown-item aria-role="listitem">个人信息</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">设置</b-dropdown-item>
            <b-dropdown-item aria-role="listitem">退出</b-dropdown-item>
          </b-dropdown>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useUser } from '@/service/user';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const _user = useUser();
    return {
      isLogin: _user.isLogin,
      user: _user.user
    };
  }
});
</script>

<style scoped>
.logo {
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
