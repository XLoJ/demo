<template>
  <div class="dashboard">
    <b-table :data="problems" bordered class="mb-4">
      <b-table-column v-slot="props" centered label="#" width="48">
        <span class="has-text-weight-bold">{{
          numberToIndex(props.index)
        }}</span>
      </b-table-column>
      <b-table-column v-slot="props" label="名称">
        <router-link :to="{ name: 'ContestList' }"
          >{{ props.row.name }}
        </router-link>
      </b-table-column>
      <b-table-column centered label="通过人数" v-slot="props" width="120">
        <span
          ><span class="icon"><i class="mdi mdi-account"></i></span
          >{{ props.row.accept_num }}</span
        >
      </b-table-column>
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
import { defineComponent } from '@vue/composition-api';
import { useContestProblems } from '@/service/contest';
import { formatTime } from '@/utils';
import { formatDuration, formatStartTime } from '@/views/Contest/utils';

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
    const { problems } = useContestProblems(props.contest.id);

    const numberToIndex = (i: number) =>
      String.fromCharCode('A'.charCodeAt(0) + i);

    return {
      problems,
      numberToIndex
    };
  }
});
</script>
