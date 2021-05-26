<template>
  <div>
    <b-table :data="problems">
      <b-table-column v-slot="props" centered label="#" width="5em">
        <span class="has-text-weight-bold">{{ props.row.index + 1 }} </span>
      </b-table-column>
      <b-table-column v-slot="props" label="标题">
        <router-link
          :to="{ name: 'ArchiveProblem', params: { index: props.row.index } }"
          >{{ props.row.problem.title }}
        </router-link>
      </b-table-column>
      <!--      <b-table-column centered label="解出人数" width="100">-->
      <!--        <span>10</span>-->
      <!--      </b-table-column>-->
    </b-table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { useContestInfo } from '@/service/contest';
import { LocalContestId } from '@/constants';

export default defineComponent({
  name: 'Archive',
  setup() {
    const contest = useContestInfo(LocalContestId);
    const problems = computed(() => {
      if (contest.value) {
        return contest.value.problems;
      } else {
        return [];
      }
    });

    return {
      problems
    };
  }
});
</script>

<style scoped></style>
