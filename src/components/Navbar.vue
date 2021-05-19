<template>
  <b-navbar :close-on-click="false" shadow spaced wrapper-class="container">
    <template #brand>
      <b-navbar-item :to="{ name: 'Home' }" tag="router-link">
        <h1 class="logo has-text-black">XLoJ</h1>
      </b-navbar-item>
    </template>
    <template #start>
      <b-navbar-item :to="{ name: 'Archive' }" tag="router-link"
        >题库
      </b-navbar-item>
      <b-navbar-item :to="{ name: 'ContestList' }" tag="router-link"
        >比赛
      </b-navbar-item>
      <b-navbar-item
        v-if="isLogin.flag"
        :to="{ name: 'PolygonList' }"
        tag="router-link"
      >
        Polygon
      </b-navbar-item>
    </template>

    <template #end>
      <b-navbar-item tag="div">
        <div v-if="isLogin.flag === 1">
          <b-dropdown
            append-to-body
            aria-role="menu"
            max-height="200"
            position="is-bottom-left"
            scrollable
            trap-focus
          >
            <template #trigger>
              <a class="navbar-item" role="button">
                <span>{{ user.nickname }}</span>
              </a>
            </template>
            <b-dropdown-item>个人信息</b-dropdown-item>
            <b-dropdown-item>设置</b-dropdown-item>
            <b-dropdown-item @click="logout">退出</b-dropdown-item>
          </b-dropdown>
        </div>
        <div v-else-if="isLogin.flag === 0" class="buttons">
          <router-link :to="{ name: 'Login' }" class="button is-primary"
            >登录
          </router-link>
          <router-link :to="{ name: 'Login' }" class="button is-light"
            >注册
          </router-link>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { userLogout, useUser } from '@/service/user';
import { useRouter } from '@/utils';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const _user = useUser();
    const router = useRouter();

    const logout = () => {
      userLogout();
      router.replace({ name: 'Welcome' });
    };

    return {
      isLogin: _user.isLogin,
      user: _user.user,
      logout
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
