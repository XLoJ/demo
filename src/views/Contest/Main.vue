<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Navbar from '../../components/Navbar.vue';

export default defineComponent({
  name: 'ContestMain',
  components: {
    Navbar
  }
});
</script>

<style scoped>
.container {
  margin-top: 2rem;
}
</style>
