<template>
  <div v-if="problem">
    <ProblemView :num-index="+index" :problem="problem.problem"></ProblemView>

    <Submit
      :contest-id="LocalContestId"
      :contest-problem-id="problem.id"
      @submission="handleSubmission"
    ></Submit>

    <RealtimeSubmission
      v-if="lastSubmission"
      :problem-link="{ name: 'ArchiveProblem', params: { index } }"
      :problem-name="`${index}. ${problem.problem.title}`"
      :submission="lastSubmission"
      :submission-link="{
        name: 'ArchiveSubmission',
        params: { sid: lastSubmission.id }
      }"
      :testcase-num="problem.problem.testcaseNum"
      :user="user"
    ></RealtimeSubmission>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { toRefs } from '@vueuse/core';
import ProblemView from '@/views/Contest/ProblemView.vue';
import Submit from '@/views/Contest/Submit.vue';
import RealtimeSubmission from '@/views/Problem/RealtimeSubmission.vue';
import { LocalContestId } from '@/constants';
import { getSubmission, useProblem } from '@/service/contest';
import { isFinishVerdict } from '@/verdict';
import { useUser } from '@/service/user';

export default defineComponent({
  name: 'ArchiveProblem',
  props: {
    index: [String, Number]
  },
  components: {
    ProblemView,
    Submit,
    RealtimeSubmission
  },
  setup(props: any) {
    const { index } = toRefs(props);
    const { user } = useUser();

    const problem = useProblem(LocalContestId, index.value - 1);

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
        const data = await getSubmission(LocalContestId, submission.id);
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
      LocalContestId,
      problem,
      lastSubmission,
      handleSubmission,
      user
    };
  }
});
</script>

<style scoped></style>
