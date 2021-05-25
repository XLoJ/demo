<template>
  <div>
    <div v-if="privateContestList.length > 0 || isAdmin">
      <h3
        class="
          title
          is-5 is-flex is-align-items-center is-justify-content-space-between
        "
      >
        <span>私有比赛</span>
        <b-button v-if="isAdmin" type="is-success" @click="goCreate"
          >创建比赛</b-button
        >
      </h3>
      <contest-table :data="privateContestList" :creator="true"></contest-table>
    </div>
    <h3 class="title is-5">即将举行</h3>
    <contest-table :data="comingContestList" :creator="isAdmin"></contest-table>
    <h3 class="title is-5">已结束</h3>
    <contest-table :data="endContestList" :creator="isAdmin"></contest-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ContestTable from './ContestTable.vue';
import { useContestList } from '../../service/contest';
import { isUserAdmin } from '@/service/user';
import { useRouter } from '@/utils';

export default defineComponent({
  name: 'ContestList',
  components: {
    ContestTable
  },
  setup() {
    const { privateContestList, comingContestList, endContestList } =
      useContestList();
    const isAdmin = isUserAdmin();

    const router = useRouter();
    const goCreate = () => {
      router.push({ name: 'CreateContest' });
    };

    return {
      privateContestList,
      comingContestList,
      endContestList,
      isAdmin,
      goCreate
    };
  }
});
</script>

<style scoped>
.title {
  margin-bottom: 0.5em !important;
}
</style>
