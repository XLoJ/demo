<template>
  <div>
    <h3 class="title is-5">即将举行</h3>
    <contest-table :data="comingContestList"></contest-table>
    <h3 class="title is-5">已结束</h3>
    <contest-table :data="endContestList"></contest-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';
import ContestTable from './ContestTable.vue';

export default defineComponent({
  name: 'ContestList',
  components: {
    ContestTable
  },
  setup() {
    const comingContestList = reactive([
      {
        id: 5,
        name: 'Beta Round 1',
        start_time: '2021-6-3 19:30',
        length: '2:00',
        writers: ['Noname']
      },
      {
        id: 4,
        name: 'Alpha Round 2',
        start_time: '2021-6-1 19:30',
        length: '2:00',
        writers: ['Noname']
      }
    ]);
    const endContestList = reactive([
      {
        id: 3,
        name: 'Alpha Round 1',
        start_time: '2021-5-1 19:30',
        length: '2:00',
        writers: ['Noname']
      },
      {
        id: 2,
        name: 'Alpha Test Round 2',
        start_time: '2021-4-1 19:30',
        length: '2:00',
        writers: ['Noname']
      },
      {
        id: 1,
        name: 'Alpha Test Round 1',
        start_time: '2021-3-1 19:30',
        length: '2:00',
        writers: ['Noname']
      }
    ]);
    return {
      comingContestList,
      endContestList
    };
  }
});
</script>

<style scoped>
.title {
  margin-bottom: 0.5em !important;
}
</style>
