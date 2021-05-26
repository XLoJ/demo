<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <div class="container">
      <div class="title is-4">注册</div>
      <section>
        <b-notification
          v-show="isShowError"
          aria-close-label="Close notification"
          role="alert"
          type="is-danger"
        >
          {{ errorMessage }}
        </b-notification>
        <b-field label="用户名">
          <b-input v-model="username"></b-input>
        </b-field>
        <b-field label="昵称">
          <b-input v-model="nickname"></b-input>
        </b-field>
        <b-field label="密码">
          <b-input
            v-model="password"
            type="password"
            @keypress.enter.native="login"
          ></b-input>
        </b-field>
        <b-button type="is-success" @click="login">登录</b-button>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { userLogin, userRegister } from '../../service/user';
import Navbar from '../../components/Navbar.vue';
import { useRoute, useRouter, useSnackbar } from '@/utils';

export default defineComponent({
  name: 'LoginPage',
  components: {
    Navbar
  },
  setup() {
    const username = ref('');
    const nickname = ref('');
    const password = ref('');

    const route = useRoute();
    const router = useRouter();

    const isShowError = ref(false);
    const errorMessage = ref('');
    const snackbar = useSnackbar();

    const login = async () => {
      try {
        if (nickname.value === '') {
          nickname.value = username.value;
        }
        await userRegister(username.value, nickname.value, password.value);
        snackbar.open('注册成功');
        router.push(route.params.redirect ?? { name: 'Home' });
      } catch (err) {
        password.value = '';
        isShowError.value = true;
        errorMessage.value = err?.response?.data?.message ?? '注册失败';

        setTimeout(() => (isShowError.value = false), 5000);
      }
    };

    return {
      username,
      nickname,
      password,
      login,
      isShowError,
      errorMessage
    };
  }
});
</script>

<style scoped>
.container {
  margin-top: 2rem;
}
</style>
