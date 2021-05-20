<template>
  <div>
    <b-loading v-model="loading"></b-loading>
    <div v-if="!loading">
      <h4 class="title is-4">
        Problem {{ problem.parent }}. {{ problem.name }}
      </h4>
      <b-tabs v-model="activeTab">
        <b-tab-item label="题目信息">
          <ProblemInfo :problem="problem"></ProblemInfo>
        </b-tab-item>
        <b-tab-item label="题面编辑">
          <EditStatement :problem="problem"></EditStatement>
        </b-tab-item>
        <b-tab-item label="题面预览">
          <PreviewStatement :problem="problem"></PreviewStatement>
        </b-tab-item>
        <b-tab-item label="Validator"></b-tab-item>
        <b-tab-item label="Checker"></b-tab-item>
        <b-tab-item label="Solution"></b-tab-item>
        <b-tab-item label="测试数据"></b-tab-item>
        <b-tab-item label="构建"></b-tab-item>
      </b-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { getDetailClassicProblem } from '@/service/polygon';
import ProblemInfo from './ProblemInfo.vue';
import EditStatement from './EditStatement.vue';
import PreviewStatement from './PreviewStatement.vue';

export default defineComponent({
  name: 'PolygonProblem',
  components: {
    ProblemInfo,
    EditStatement,
    PreviewStatement
  },
  props: {
    id: [Number, String]
  },
  setup(props) {
    const loading = ref(true);
    const problem = ref({});
    const activeTab = ref(0);

    getDetailClassicProblem(+props.id!).then((data) => {
      problem.value = data;
      loading.value = false;
    });

    return {
      loading,
      problem,
      activeTab
    };
  }
});
</script>

<style scoped></style>
