<template>
  <div>
    <div class="card mb-3">
      <header class="card-header">
        <p class="has-text-centered card-header-title">倒计时</p>
      </header>
      <div class="card-content">
        <div class="content">
          <b-progress :value="100" show-value type="is-success"></b-progress>
        </div>
      </div>
    </div>

    <div class="card">
      <header class="card-header">
        <p class="has-text-centered card-header-title">题目列表</p>
      </header>
      <div class="card-content">
        <div class="content">
          <div v-for="(problem, index) in problems" :key="index">
            <router-link :to="{ name: 'ContestList' }"
              >{{ problem.index }}. {{ problem.name }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useContestProblems } from '@/service/contest';

export default defineComponent({
  name: 'ContestSidebar',
  props: {
    contest: Object
  },
  setup(props) {
    const contest = props.contest!;
    const { problems } = useContestProblems(contest.id);

    return {
      contest,
      problems
    };
  }
});
</script>

<style scoped>
.card-header {
  border-bottom: 1px solid rgba(34, 36, 38, 0.1);
  box-shadow: none !important;
}

.card-content {
  padding: 1rem;
}
</style>
