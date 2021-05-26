<template>
  <div class="dashboard">
    <b-table
      :data="problems"
      bordered
      class="mb-4"
      :row-class="(row) => !row.visible && 'has-background-light'"
    >
      <b-table-column v-slot="props" centered label="#" width="48">
        <span class="has-text-weight-bold">{{
          numberToIndex(props.row.index)
        }}</span>
      </b-table-column>
      <b-table-column v-slot="props" label="名称">
        <router-link
          :to="{
            name: 'ContestProblem',
            params: { index: props.row.index, contest }
          }"
          >{{ props.row.problem.title }}
        </router-link>
      </b-table-column>
      <!--      <b-table-column v-slot="props" centered label="通过人数" width="120">-->
      <!--        <span-->
      <!--          ><span class="icon"><i class="mdi mdi-account"></i></span-->
      <!--          >{{ props.row.passCount }}</span-->
      <!--        >-->
      <!--      </b-table-column>-->

      <template #empty>
        <div class="has-text-weight-bold has-text-centered">
          <span>没有题目</span>
        </div>
      </template>
    </b-table>

    <div>
      <div style="line-height: 1">
        <span class="icon is-large">
          <i class="mdi mdi-24px mdi-bullhorn"></i> </span
        ><span class="subtitle is-5">公告</span>
      </div>
      <div class="pl-3">
        <p class="mb-2">{{ contest.description }}</p>
        <p>
          <span class="has-text-weight-bold">比赛时间</span>：{{
            formatStartTime(contest.startTime)
          }}
        </p>
        <p>
          <span class="has-text-weight-bold">持续时间</span>：{{
            formatDuration(contest.duration)
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import {
  formatDuration,
  formatStartTime,
  numberToIndex
} from '@/views/Contest/utils';
import { toRefs } from '@vueuse/core';

export default defineComponent({
  name: 'Dashboard',
  props: {
    contest: Object,
    id: [Number, String]
  },
  methods: {
    formatStartTime,
    formatDuration
  },
  setup(props: { contest: any }) {
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
