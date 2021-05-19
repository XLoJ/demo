<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <div class="container">
      <div class="title is-4">登录</div>
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
        <b-field label="密码">
          <b-input v-model="password" type="password"></b-input>
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
import { useRouter, useSnackbar } from '@/utils';

export default defineComponent({
  name: 'LoginPage',
  components: {
    Navbar
  },
  setup() {
    const username = ref('');
    const password = ref('');
    const router = useRouter();

    const isShowError = ref(false);
    const errorMessage = ref('');
    const snackbar = useSnackbar();

    const login = async () => {
      try {
        await userLogin(username.value, password.value);
        snackbar.open('登录成功');
        router.push({
          name: 'Home'
        });
      } catch (err) {
        password.value = '';
        isShowError.value = true;
        errorMessage.value = err?.response?.data?.message ?? '登录失败';

        setTimeout(() => (isShowError.value = false), 5000);
      }
    };

    return {
      username,
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
