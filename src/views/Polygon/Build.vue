<template>
  <div>
    <div class="mb-2">
      <p class="is-inline-block">
        <span class="has-text-weight-bold">当前版本</span>：{{
          problem.version
        }}
      </p>
      <p class="is-inline-block ml-4">
        <span class="has-text-weight-bold">当前状态</span>：{{ problem.status }}
      </p>
    </div>
    <div>
      <b-button type="is-success" @click="runBuild">构建</b-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { buildProblem } from '@/service/polygon';

export default defineComponent({
  name: 'Build',
  props: {
    problem: Object
  },
  setup(props) {
    const problem = props.problem!;

    const runBuild = async () => {
      await buildProblem(problem.parent);
    };

    return {
      runBuild
    };
  }
});
</script>

<style scoped></style>
