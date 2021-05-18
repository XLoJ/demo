<template>
  <div>Contest {{ id }}</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'Contest',
  props: {
    id: Number
  },
  setup(props) {
    return {};
  }
});
</script>

<style scoped></style>
