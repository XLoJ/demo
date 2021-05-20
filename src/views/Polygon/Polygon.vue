<template>
  <div>
    <b-loading v-model="loading"></b-loading>
    <div v-if="!loading">
      <h4 class="title is-4">
        Problem {{ problem.parent }}. {{ problem.name }}
      </h4>
      <b-tabs v-model="active" class="hidden-tab">
        <b-tab-item label="题目信息"></b-tab-item>
        <b-tab-item label="题面编辑"></b-tab-item>
        <b-tab-item label="题面预览"></b-tab-item>
        <b-tab-item label="Validator"></b-tab-item>
        <b-tab-item label="Checker"></b-tab-item>
        <b-tab-item label="Solution"></b-tab-item>
        <b-tab-item label="Generators"></b-tab-item>
        <b-tab-item label="静态文件"></b-tab-item>
        <b-tab-item label="测试数据"></b-tab-item>
        <b-tab-item label="构建"></b-tab-item>
      </b-tabs>
      <router-view :problem="problem"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { getDetailClassicProblem } from '@/service/polygon';
import ProblemInfo from './ProblemInfo.vue';
import EditStatement from './EditStatement.vue';
import PreviewStatement from './PreviewStatement.vue';
import EditCode from './EditCode.vue';
import EditGenerators from './EditGenerators.vue';

const routeTable = [
  'Polygon',
  'PolygonStatement',
  'PolygonPreviewStatement',
  'PolygonValidator',
  'PolygonChecker',
  'PolygonSolution',
  'PolygonGenerators',
  'PolygonStaticFile',
  'PolygonTestcases',
  'PolygonBuild'
];

export default defineComponent({
  name: 'PolygonProblem',
  components: {
    ProblemInfo,
    EditStatement,
    PreviewStatement,
    EditCode,
    EditGenerators
  },
  props: {
    id: [Number, String]
  },
  data() {
    const routeName = this.$route.name;
    const active = routeTable.findIndex((name) => name === routeName);
    return {
      active: active !== -1 ? active : 0
    };
  },
  watch: {
    active(active, oV) {
      if (active !== oV) {
        if (active < routeTable.length) {
          this.$router.push({
            name: routeTable[active],
            params: { id: String(this.id) }
          });
        } else {
          this.$router.push({
            name: routeTable[0],
            params: { id: String(this.id) }
          });
        }
      }
    }
  },
  setup(props) {
    const loading = ref(true);
    const problem = ref({});

    getDetailClassicProblem(+props.id!).then((data) => {
      problem.value = data;
      loading.value = false;
    });

    return {
      loading,
      problem
    };
  }
});
</script>

<style scoped></style>
