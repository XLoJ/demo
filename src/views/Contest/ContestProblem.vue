<template>
  <div>
    <ProblemView :problem="problem" :index="+index"></ProblemView>

    <Submit
      :contest-id="+id"
      :contest-problem-id="+contestProblem.id"
      @submission="handleSubmission"
    ></Submit>

    <RealtimeSubmission
      v-if="lastSubmission"
      :testcase-num="problem.testcaseNum"
      :submission="lastSubmission"
      :problem-name="`${problem.title}`"
      :problem-link="{ name: 'ContestProblem', params: { id, index } }"
      :user="user"
    ></RealtimeSubmission>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api';
import { toRefs } from '@vueuse/core';

import { copyToClipboard } from '@/utils';
import Submit from './Submit.vue';
import ProblemView from './ProblemView.vue';
import RealtimeSubmission from '@/views/Problem/RealtimeSubmission.vue';
import { useUser } from '@/service/user';

export default defineComponent({
  name: 'ContestProblem',
  props: {
    id: [Number, String],
    index: [Number, String],
    contest: Object
  },
  components: {
    ProblemView,
    Submit,
    RealtimeSubmission
  },
  methods: {
    copyToClipboard
  },
  setup(props: any) {
    const { user } = useUser();
    const { id, index, contest } = toRefs(props);
    const contestProblem = computed(() => {
      const prob = contest.value.problems.find(
        (problem: any) => problem.index === +index.value
      );
      return prob;
    });
    const problem = computed(() => {
      return contestProblem.value.problem;
    });

    const lastSubmission = ref();
    const handleSubmission = (submission: any) => {
      submission.messages = [];
      lastSubmission.value = submission;
    };

    return {
      user,
      contestProblem,
      problem,
      handleSubmission,
      lastSubmission
    };
  }
});
</script>
