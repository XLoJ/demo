<template>
  <div>
    <b-table :data="problems" bordered>
      <b-table-column centered label="#" v-slot="props" width="48">
        <span class="has-text-weight-bold">{{
          numberToIndex(props.index)
        }}</span>
      </b-table-column>
      <b-table-column label="名称" v-slot="props">
        <router-link :to="{ name: 'ContestList' }">{{
          props.row.name
        }}</router-link>
      </b-table-column>
      <b-table-column centered width="100" label="通过人数">
        <span>10</span>
      </b-table-column>
    </b-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';
import { useContestProblems } from '@/service/contest';

export default defineComponent({
  name: 'Dashboard',
  props: {
    contest: Object
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

<style scoped></style>
