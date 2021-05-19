<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <div class="container">
      <div class="title is-4">登录</div>
      <section>
        <b-field label="用户名">
          <b-input v-model="username"></b-input>
        </b-field>
        <b-field label="密码">
          <b-input type="password" v-model="password"></b-input>
        </b-field>
        <b-button type="is-success" @click="login">登录</b-button>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { userLogin } from '../../service/user';
import Navbar from '../../components/Navbar.vue';

export default defineComponent({
  name: 'LoginPage',
  components: {
    Navbar
  },
  setup() {
    const username = ref('');
    const password = ref('');
    const login = () => {
      userLogin(username.value, password.value);
    };

    return {
      username,
      password,
      login
    };
  }
});
</script>

<style scoped>
.container {
  margin-top: 2rem;
}
</style>
