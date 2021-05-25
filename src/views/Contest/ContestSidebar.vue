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
        <div class="content is-family-monospace">
          <div v-for="problem in problems" :key="problem.index">
            <router-link :to="{ name: 'ContestList' }"
              >{{ numberToIndex(problem.index) }}. {{ problem.problem.title }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { toRefs } from '@vueuse/core';
import { numberToIndex } from '@/views/Contest/utils';

export default defineComponent({
  name: 'ContestSidebar',
  props: {
    contest: Object
  },
  setup(props: any) {
    const { contest } = toRefs(props);
    const problems = computed(() => {
      return contest.value.problems;
    });

    return {
      problems,
      numberToIndex
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
