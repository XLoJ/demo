<template>
  <div class="status">
    <b-table :data="submissions" bordered>
      <b-table-column label="#" centered v-slot="props">
        <router-link
          class="has-text-weight-bold"
          :to="{ name: 'ContestSubmission', params: { sid: props.row.id } }"
          >{{ props.row.id }}</router-link
        >
      </b-table-column>
      <b-table-column label="题目" centered v-slot="props">
        <router-link
          :to="{
            name: 'ContestProblem',
            params: { index: mapToIndex(props.row) }
          }"
        >
          <span
            >{{ numberToIndex(mapToIndex(props.row)) }}.
            {{ props.row.problem.title }}</span
          >
        </router-link>
      </b-table-column>
      <b-table-column label="时间" centered v-slot="props">
        <span>{{ formatTime(props.row.createTime) }}</span>
      </b-table-column>
      <b-table-column label="送交者" centered v-slot="props">
        <router-link :to="{ name: 'Profile' }"
          >{{ props.row.user.nickname }}
        </router-link>
      </b-table-column>
      <b-table-column label="语言" centered v-slot="props">
        <Language :lang="props.row.language"></Language>
      </b-table-column>
      <b-table-column label="评测结果" centered v-slot="props">
        <VerdictView :verdict="props.row.verdict"></VerdictView>
      </b-table-column>
      <b-table-column label="耗时" centered v-slot="props">
        <span>{{ props.row.time }} ms</span>
      </b-table-column>
      <b-table-column label="内存" centered v-slot="props">
        <span>{{ props.row.memory }} MB</span>
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
import { toRefs } from '@vueuse/core';

export default defineComponent({
  name: 'Status',
  props: {
    contest: Object,
    submissions: Array,
    id: [Number, String]
  },
  components: {
    Language,
    VerdictView
  },
  setup(props: any) {
    const { contest } = toRefs(props);

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
      numberToIndex
    };
  }
});
</script>

<style scoped></style>
