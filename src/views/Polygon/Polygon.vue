<template>
  <div>
    <b-loading v-model="loading"></b-loading>
    <div v-if="!loading">
      <h4 class="title is-4">
        Problem {{ problem.parent }}. {{ problem.name }}
      </h4>
      <b-tabs v-model="activeTab">
        <b-tab-item label="题目信息"></b-tab-item>
        <b-tab-item label="题面描述"></b-tab-item>
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
import { defineComponent, reactive, ref } from '@vue/composition-api';
import { getDetailClassicProblem } from '@/service/polygon';

export default defineComponent({
  name: 'Polygon',
  props: {
    id: [Number, String]
  },
  setup(props) {
    const loading = ref(true);
    const problem = ref({});
    const activeTab = ref(0);

    getDetailClassicProblem(+props.id).then((data) => {
      problem.value = data;
      loading.value = false;
      console.log(data);
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
