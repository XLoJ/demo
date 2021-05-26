<template>
  <Status
    v-if="submissions"
    :submissions="submissions"
    :contest="contest"
  ></Status>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Status from './Status.vue';
import { useMySubmissions } from '@/service/contest';
import { toRefs } from '@vueuse/core';

export default defineComponent({
  name: 'MySubmission',
  components: {
    Status
  },
  props: {
    contest: Object,
    id: [Number, String]
  },
  setup(props: any) {
    const { id } = toRefs(props);
    const submissions = useMySubmissions(+id?.value);
    return {
      submissions
    };
  }
});
</script>

<style scoped></style>
