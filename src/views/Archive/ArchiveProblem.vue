<template>
  <div v-if="problem">
    <ProblemView :problem="problem.problem" :num-index="index"></ProblemView>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { toRefs } from '@vueuse/core';
import ProblemView from '@/views/Contest/ProblemView.vue';
import { LocalContestId } from '@/constants';
import { useProblem } from '@/service/contest';

export default defineComponent({
  name: 'ArchiveProblem',
  props: {
    index: [String, Number]
  },
  components: {
    ProblemView
  },
  setup(props: any) {
    const { index } = toRefs(props);

    const problem = useProblem(LocalContestId, index.value - 1);

    return {
      problem
    };
  }
});
</script>

<style scoped></style>
