<template>
  <b-tabs v-model="activeTab">
    <b-tab-item label="本地"> Lorem ipsum dolor sit amet. </b-tab-item>

    <b-tab-item label="HDu"> </b-tab-item>

    <b-tab-item label="PKu"> </b-tab-item>
  </b-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'Archive',
  setup() {
    const activeTab = ref(0);
    return {
      activeTab
    };
  }
});
</script>

<style scoped></style>
