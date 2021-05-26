<template>
  <div class="status" v-if="contest">
    <b-table :data="submissions" bordered>
      <b-table-column v-slot="props" centered label="#">
        <router-link
          :to="{ name: 'ArchiveSubmission', params: { sid: props.row.id } }"
          class="has-text-weight-bold"
          >{{ props.row.id }}
        </router-link>
      </b-table-column>
      <b-table-column v-slot="props" centered label="题目">
        <router-link
          :to="{
            name: 'ArchiveProblem',
            params: { index: mapToIndex(props.row) + 1 }
          }"
        >
          <span
            >{{ mapToIndex(props.row) + 1 }}.
            {{ props.row.problem.title }}</span
          >
        </router-link>
      </b-table-column>
      <b-table-column v-slot="props" centered label="时间">
        <span>{{ formatTime(props.row.createTime) }}</span>
      </b-table-column>
      <b-table-column v-slot="props" centered label="送交者">
        <router-link :to="{ name: 'Profile' }"
          >{{ props.row.user.nickname }}
        </router-link>
      </b-table-column>
      <b-table-column v-slot="props" centered label="语言">
        <Language :lang="props.row.language"></Language>
      </b-table-column>
      <b-table-column v-slot="props" centered label="评测结果">
        <VerdictView :verdict="props.row.verdict"></VerdictView>
      </b-table-column>
      <b-table-column v-slot="props" centered label="耗时">
        <span>{{ props.row.time }} ms</span>
      </b-table-column>
      <b-table-column v-slot="props" centered label="内存">
        <span>{{ props.row.memory }} MB</span>
      </b-table-column>
      <b-table-column v-slot="props" centered label="评测机">
        <span>{{ props.row.from }}</span>
      </b-table-column>

      <template #empty>
        <div class="has-text-weight-bold has-text-centered">
          <span>没有提交记录</span>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { formatTime } from '@/utils';
import VerdictView from '@/components/Verdict.vue';
import Language from '@/components/Language.vue';
import { numberToIndex } from '@/views/Contest/utils';
import { useAllSubmissions, useContestInfo } from '@/service/contest';
import { LocalContestId } from '@/constants';

export default defineComponent({
  name: 'ArchiveStatus',
  components: {
    Language,
    VerdictView
  },
  setup(props: any) {
    const submissions = useAllSubmissions(LocalContestId);
    const contest = useContestInfo(LocalContestId);

    const mapToIndex = (problem: any) => {
      return (
        contest.value.problems.find(
          (prob: any) => prob.problem.id === problem.problem.id
        )?.index ?? 0
      );
    };

    return {
      formatTime,
      mapToIndex,
      numberToIndex,
      contest,
      submissions
    };
  }
});
</script>

<style>
.status .table thead {
  background-color: rgb(249, 250, 251) !important;
}
</style>
