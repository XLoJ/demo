<template>
  <div v-if="submission && problem">
    <RealtimeSubmission
      class="mb-4"
      :testcase-num="testcaseNum"
      :submission="submission"
      :problem-name="`${numberToIndex(problem.index)}. ${
        problem.problem.title
      }`"
      :problem-link="{
        name: 'ContestProblem',
        params: { id, index: problem.index }
      }"
      :submission-link="{ name: 'ContestSubmission', params: { id, sid } }"
      :user="submission.user"
    ></RealtimeSubmission>
    <pre
      style="border: 1px solid rgb(219, 219, 219)"
    ><code>{{ code }}</code></pre>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  unref,
  watch
} from '@vue/composition-api';
import { toRefs } from '@vueuse/core';
import { getContestProblem, getSubmission } from '@/service/contest';
import RealtimeSubmission from '@/views/Problem/RealtimeSubmission.vue';
import { b64decode } from '@/utils';
import { numberToIndex } from '@/views/Contest/utils';

export default defineComponent({
  name: 'Submission',
  props: {
    id: [Number, String],
    sid: [Number, String]
  },
  components: {
    RealtimeSubmission
  },
  setup(props: any) {
    const { id, sid } = toRefs(props);
    const submission = ref();
    const problem = ref();

    getSubmission(id.value, sid.value).then((data) => {
      submission.value = data;
    });

    watch(submission, (submission: any) => {
      if (submission) {
        const pid = submission.problem;
        getContestProblem(id.value, pid).then((data) => {
          problem.value = data;
        });
      }
    });

    const code = computed(() => {
      return submission.value ? b64decode(submission.value.body) : '';
    });

    const testcaseNum = computed(() => {
      if (problem.value) {
        return problem.value.problem.testcaseNum;
      } else {
        return 0;
      }
    });

    return {
      submission,
      problem,
      testcaseNum,
      code,
      numberToIndex
    };
  }
});
</script>

<style scoped></style>
