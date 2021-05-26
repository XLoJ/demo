<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <div class="container">
      <div class="title is-5">{{ user.nickname }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Navbar from '../../components/Navbar.vue';
import { useUser } from '@/service/user';
import { useRouter } from '@/utils';

export default defineComponent({
  name: 'Profile',
  components: { Navbar },
  setup() {
    const { user, isLogin } = useUser();
    const router = useRouter();
    if (isLogin.value.flag !== 1) {
      router.push({ name: 'Login' });
      return {};
    }

    return {
      user
    };
  }
});
</script>

<style scoped>
.container {
  margin-top: 2rem;
}
</style>
