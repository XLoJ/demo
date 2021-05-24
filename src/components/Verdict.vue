<template>
  <span :style="{ color }" class="has-text-weight-bold">{{ message }}</span>
</template>

<script>
import { Verdict } from '@/verdict';

export default {
  name: 'Verdict',
  props: {
    verdict: [Number, String]
  },
  computed: {
    message() {
      const verdict = +this.verdict;
      if (verdict === Verdict.Running) {
        return 'Running';
      } else if (verdict === Verdict.Compiling) {
        return 'Compiling';
      } else if (verdict === Verdict.Waiting) {
        return 'Waiting';
      } else if (verdict === Verdict.Accepted) {
        return 'Accepted';
      } else if (verdict === Verdict.WrongAnswer) {
        return 'Wrong Answer';
      } else if (verdict === Verdict.TimeLimitExceeded) {
        return 'Time Limit Exceeded';
      } else if (verdict === Verdict.IdlenessLimitExceeded) {
        return 'Idleness Limit Exceeded';
      } else if (verdict === Verdict.MemoryLimitExceeded) {
        return 'Memory Limit Exceeded';
      } else if (verdict === Verdict.RuntimeError) {
        return 'Runtime Error';
      } else if (verdict === Verdict.SystemError) {
        return 'System Error';
      } else if (verdict === Verdict.CompileError) {
        return 'Compile Error';
      } else if (verdict === Verdict.JudgeError) {
        return 'Judge Error';
      } else if (verdict === Verdict.TestCaseError) {
        return 'Testcase Error';
      }
      return 'System Error';
    },
    color() {
      const verdict = +this.verdict;
      if (verdict === Verdict.Accepted) {
        return '#21BA45';
      } else if (verdict === Verdict.WrongAnswer) {
        return '#DB2828';
      } else if (verdict === Verdict.RuntimeError) {
        return '#FBBD08';
      } else if (
        verdict === Verdict.MemoryLimitExceeded ||
        Verdict === Verdict.TimeLimitExceeded ||
        Verdict === Verdict.IdlenessLimitExceeded
      ) {
        return '#F2711C';
      } else {
        return '#767676';
      }
    }
  }
};
</script>

<style scoped></style>
