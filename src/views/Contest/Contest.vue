<template>
  <div>
    <div class="title is-5">{{ contest.name }}</div>
    <div class="columns">
      <div class="column is-three-quarters">
        <b-tabs v-model="activeTab">
          <b-tab-item label="仪表盘">
            <Dashboard :contest="contest"></Dashboard>
          </b-tab-item>

          <b-tab-item label="我的提交"> </b-tab-item>

          <b-tab-item label="全部提交"> </b-tab-item>

          <b-tab-item label="排行榜"> </b-tab-item>
        </b-tabs>
      </div>
      <div class="column">
        <ContestSidebar></ContestSidebar>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
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
  setup(props: { id: number | string }) {
    const id = ref(+props?.id);
    const { contest } = useContestInfo(id.value);

    const activeTab = ref(0);

    return {
      contest,
      activeTab
    };
  }
});
</script>

<style scoped></style>
