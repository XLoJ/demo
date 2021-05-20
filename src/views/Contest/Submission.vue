<template>
  <Status :contest="contest" :id="id"></Status>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Status from './Status.vue';

export default defineComponent({
  name: 'Submission',
  components: {
    Status
  },
  props: {
    contest: Object,
    id: [Number, String]
  }
});
</script>

<style scoped></style>
