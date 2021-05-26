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
      :submission-link="{
        name: 'ContestSubmission',
        params: { id, sid: lastSubmission.id }
      }"
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
import { isFinishVerdict } from '@/verdict';
import { getDetailTestJudgeSubmission } from '@/service/polygon';
import { getSubmission } from '@/service/contest';

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
    const runUpdate = (submission: any) => {
      if ('messages' in submission && Array.isArray(submission.messages)) {
        if (submission.messages.length > 0) {
          const lastVerdict =
            submission.messages[submission.messages.length - 1].verdict;
          if (isFinishVerdict(lastVerdict)) {
            return;
          }
        }
      }
      const ev = setInterval(async () => {
        const data = await getSubmission(id.value, submission.id);
        const messages = data.messages;
        lastSubmission.value.time = data.time;
        lastSubmission.value.memory = data.memory;
        lastSubmission.value.verdict = data.verdict;
        lastSubmission.value.pass = data.pass;
        lastSubmission.value.from = data.from;
        for (
          let i = lastSubmission!.value.messages.length;
          i < messages.length;
          i++
        ) {
          lastSubmission!.value.messages.push(messages[i]);
        }
        const lastVerdict = messages[messages.length - 1].verdict;
        if (isFinishVerdict(lastVerdict)) {
          clearInterval(ev);
        }
      }, 500);
    };
    const handleSubmission = (submission: any) => {
      submission.messages = [];
      lastSubmission.value = submission;
      runUpdate(submission);
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
