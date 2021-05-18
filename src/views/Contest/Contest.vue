<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Navbar from '../../components/Navbar.vue';

export default defineComponent({
  name: 'Contest',
  components: {
    Navbar
  }
});
</script>

<style scoped></style>
