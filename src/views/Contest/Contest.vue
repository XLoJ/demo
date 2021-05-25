<template>
  <div v-if="contest">
    <div class="title is-5">{{ contest.name }}</div>
    <div class="columns">
      <div class="column is-three-quarters">
        <b-tabs v-model="activeTab" :destroy-on-hide="false" class="hidden-tab">
          <b-tab-item label="仪表盘"></b-tab-item>
          <b-tab-item label="我的提交"></b-tab-item>
          <b-tab-item label="全部提交"></b-tab-item>
          <b-tab-item label="排行榜"></b-tab-item>
          <b-tab-item v-if="canEditContest" label="编辑比赛"></b-tab-item>
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
import { computed, defineComponent } from '@vue/composition-api';
import { useContestInfo } from '../../service/contest';
import ContestSidebar from './ContestSidebar.vue';
import Dashboard from './Dashboard.vue';
import { isUserAdmin, useUser } from '@/service/user';

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
    const routeTable = ['Dashboard', 'Submission', 'Status', 'Standings'];
    const routeName = this.$route.name;
    const active = routeTable.findIndex((name) => name === routeName);
    return {
      activeTab: routeName === 'EditContest' ? 4 : active !== -1 ? active : 0,
      routeTable
    };
  },
  watch: {
    activeTab(active, oV) {
      if (active !== oV) {
        if (
          active === this.routeTable.length &&
          this.$route.name !== 'EditContest'
        ) {
          if (this.canEditContest) {
            this.$router.push({
              name: 'EditContest',
              params: { id: String(this.id) }
            });
          }
        } else if (active < this.routeTable.length) {
          this.$router.push({
            name: this.routeTable[active],
            params: { id: String(this.id) }
          });
        } else {
          this.$router.push({
            name: this.routeTable[0],
            params: { id: String(this.id) }
          });
        }
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === 'EditContest') {
      (this as any).active = 4;
    } else {
      const active = this.routeTable.findIndex((name) => name === to.name);
      (this as any).active = active !== -1 ? active : 0;
    }
    next();
  },
  setup(props: { id: number | string }) {
    const contest = useContestInfo(+props?.id);
    const isAdmin = isUserAdmin();
    const { user } = useUser();

    const canEditContest = computed(() => {
      if (isAdmin.value) return true;
      if (contest.value && user) {
        const myId = user.id;
        return (
          contest.value.writers.find((user: any) => user.id === myId) !==
          undefined
        );
      }
      return false;
    });

    return {
      contest,
      canEditContest
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
