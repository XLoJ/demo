<template>
  <Status :submissions="submissions" :contest="contest"></Status>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Status from './Status.vue';
import { useMySubmissions } from '@/service/contest';
import { toRefs } from '@vueuse/core';

export default defineComponent({
  name: 'Submission',
  components: {
    Status
  },
  props: {
    contest: Object,
    id: [Number, String]
  },
  setup(props) {
    const { id } = toRefs(props);
    const submissions = useMySubmissions(id.value);
    return {
      submissions
    };
  }
});
</script>

<style scoped></style>
