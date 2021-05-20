<template>
  <div>
    <b-loading v-model="loading"></b-loading>
    <div v-if="!loading">
      <h4 class="title is-4">
        Problem {{ problem.parent }}. {{ problem.name }}
      </h4>
      <b-tabs class="hidden-tab" v-model="active">
        <b-tab-item label="题目信息">
          <!--          <ProblemInfo :problem="problem"></ProblemInfo>-->
        </b-tab-item>
        <b-tab-item label="题面编辑">
          <!--          <EditStatement :problem="problem"></EditStatement>-->
        </b-tab-item>
        <b-tab-item label="题面预览">
          <!--          <PreviewStatement :problem="problem"></PreviewStatement>-->
        </b-tab-item>
        <b-tab-item label="Validator">
          <!--          <EditCode :problem="problem" type="validator"></EditCode>-->
        </b-tab-item>
        <b-tab-item label="Checker">
          <!--          <EditCode :problem="problem" type="checker"></EditCode>-->
        </b-tab-item>
        <b-tab-item label="Solution">
          <!--          <EditCode :problem="problem" type="solution"></EditCode>-->
        </b-tab-item>
        <b-tab-item label="Generator">
          <!--          <EditGenerators :problem="problem"></EditGenerators>-->
        </b-tab-item>
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
  'PolygonTestcases'
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
            params: { id: this.id }
          });
        } else {
          this.$router.push({ name: routeTable[0], params: { id: this.id } });
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
