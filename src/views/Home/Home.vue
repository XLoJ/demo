<template>
  <div>
    <Navbar></Navbar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Navbar from '../../components/Navbar.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Navbar
  }
});
</script>

<style scoped></style>
