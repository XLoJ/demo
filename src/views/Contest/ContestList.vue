<template>
  <div>
    <div v-if="privateContestList.length > 0">
      <h3 class="title is-5">私有比赛</h3>
      <contest-table :data="privateContestList"></contest-table>
    </div>
    <h3 class="title is-5">即将举行</h3>
    <contest-table :data="comingContestList"></contest-table>
    <h3 class="title is-5">已结束</h3>
    <contest-table :data="endContestList"></contest-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ContestTable from './ContestTable.vue';
import { useContestList } from '../../service/contest';

export default defineComponent({
  name: 'ContestList',
  components: {
    ContestTable
  },
  setup() {
    const { privateContestList, comingContestList, endContestList } =
      useContestList();
    return {
      privateContestList,
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
