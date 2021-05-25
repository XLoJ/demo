<template>
  <div v-if="contest">
    <div class="title is-5">{{ contest.name }}</div>
    <div class="columns">
      <div class="column is-three-quarters">
        <b-tabs class="hidden-tab" v-model="activeTab" :destroy-on-hide="false">
          <b-tab-item label="仪表盘"></b-tab-item>
          <b-tab-item label="我的提交"></b-tab-item>
          <b-tab-item label="全部提交"></b-tab-item>
          <b-tab-item label="排行榜"></b-tab-item>
        </b-tabs>
        <router-view :contest="contest"></router-view>
      </div>
      <div class="column">
        <ContestSidebar :contest="contest"></ContestSidebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { useContestInfo } from '../../service/contest';
import ContestSidebar from './ContestSidebar.vue';
import Dashboard from './Dashboard.vue';

export default defineComponent({
  name: 'Contest',
  components: {
    ContestSidebar,
    Dashboard
  },
  props: {
    id: [Number, String]
  },
  data() {
    return {
      activeTab: 0
    };
  },
  watch: {
    activeTab(nV, oV) {
      if (nV !== oV) {
        const route = this.$route;
        const router = this.$router;
        const id = String(this.id);
        if (nV === 0 && !route.path.endsWith('dashboard')) {
          router.push({ name: 'Dashboard', params: { id } });
        } else if (nV === 1 && !route.path.endsWith('submission')) {
          router.push({ name: 'Submission', params: { id } });
        } else if (nV === 2 && !route.path.endsWith('status')) {
          router.push({ name: 'Status', params: { id } });
        } else if (nV === 3 && !route.path.endsWith('standings')) {
          router.push({ name: 'Standings', params: { id } });
        }
      }
    }
  },
  setup(props: { id: number | string }) {
    const contest = useContestInfo(+props?.id);

    return {
      contest
    };
  }
});
</script>

<style>
.dashboard .table thead,
.status .table thead {
  background-color: rgb(249, 250, 251) !important;
}
</style>
