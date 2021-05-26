<template>
  <div v-if="contest">
    <div class="title is-5">{{ contest.name }}</div>
    <div class="columns">
      <div class="column is-three-quarters">
        <div class="tabs">
          <ul>
            <li :class="activeClass(0)">
              <router-link :to="{ name: routeTable[0] }">仪表盘</router-link>
            </li>
            <li :class="activeClass(1)">
              <router-link :to="{ name: routeTable[1] }">我的提交</router-link>
            </li>
            <li :class="activeClass(2)">
              <router-link :to="{ name: routeTable[2] }">全部提交</router-link>
            </li>
            <li :class="activeClass(3)">
              <router-link :to="{ name: routeTable[3] }">排行榜</router-link>
            </li>
            <li v-if="canEditContest" :class="activeClass(4)">
              <router-link :to="{ name: routeTable[4] }">编辑比赛</router-link>
            </li>
          </ul>
        </div>
        <router-view v-if="contest" :contest="contest"></router-view>
      </div>
      <div class="column">
        <ContestSidebar v-if="contest" :contest="contest"></ContestSidebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api';
import { useContestInfo } from '@/service/contest';
import ContestSidebar from './ContestSidebar.vue';
import Dashboard from './Dashboard.vue';
import { isUserAdmin, useUser } from '@/service/user';
import { toRefs } from '@vueuse/core';

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
    const routeTable = [
      'Dashboard',
      'Submission',
      'Status',
      'Standings',
      'EditContest'
    ];
    const routeName = this.$route.name;
    const active = routeTable.findIndex((name) => name === routeName);
    return {
      activeTab: active !== -1 ? active : -1,
      routeTable
    };
  },
  methods: {
    activeClass(index: number) {
      return index === this.activeTab ? 'is-active' : '';
    }
  },
  beforeRouteUpdate(to, from, next) {
    const active = this.routeTable.findIndex((name) => name === to.name);
    (this as any).activeTab = active !== -1 ? active : -1;
    next();
  },
  setup(props: { id: number | string }) {
    const { id } = toRefs(props);
    const contest = useContestInfo(+id.value);
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
