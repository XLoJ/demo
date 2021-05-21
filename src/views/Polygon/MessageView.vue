<template>
  <div>
    <div v-for="message in messages" :key="message.index">
      {{ message.action }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'MessageView',
  props: {
    messages: Array,
    problem: Object,
    version: Number
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
