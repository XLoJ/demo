<template>
  <div>
    <div class="title is-5">{{ contest.name }}</div>
    <div class="columns">
      <div class="column is-three-quarters">
        <b-tabs v-model="activeTab">
          <b-tab-item label="仪表盘"></b-tab-item>
          <b-tab-item label="我的提交"></b-tab-item>
          <b-tab-item label="全部提交"></b-tab-item>
          <b-tab-item label="排行榜"></b-tab-item>
        </b-tabs>
        <router-view :contest="contest"></router-view>
      </div>
      <div class="column">
        <ContestSidebar></ContestSidebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  ref,
  watchEffect
} from '@vue/composition-api';
import { useContestInfo } from '../../service/contest';
import ContestSidebar from './ContestSidebar.vue';
import Dashboard from './Dashboard.vue';
import { useRoute, useRouter } from '../../utils';

export default defineComponent({
  name: 'Contest',
  components: {
    ContestSidebar,
    Dashboard
  },
  props: {
    id: [Number, String]
  },
  setup(props: { id: number | string }, context) {
    const { contest } = useContestInfo(+props?.id);

    const vm = getCurrentInstance();
    const router = useRouter();
    const id = String(props?.id);
    const activeTab = ref(0);

    watchEffect(async () => {
      const route = vm.proxy.$route;
      const tabIndex = activeTab.value;
      if (tabIndex === 0 && !route.path.endsWith('dashboard')) {
        await router.push({ name: 'Dashboard', params: { id } });
      } else if (tabIndex === 1 && !route.path.endsWith('submission')) {
        await router.push({ name: 'Submission', params: { id } });
      } else if (tabIndex === 2 && !route.path.endsWith('status')) {
        await router.push({ name: 'Status', params: { id } });
      } else if (tabIndex === 3 && !route.path.endsWith('standings')) {
        await router.push({ name: 'Standings', params: { id } });
      }
    });

    return {
      contest,
      activeTab
    };
  }
});
</script>

<style>
section.tab-content {
  padding: 0 !important;
  margin: 0 !important;
  display: none !important;
}
</style>
