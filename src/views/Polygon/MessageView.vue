<template>
  <div>
    <el-steps :active="0" direction="vertical">
      <el-step title="开始构建">
        <div style="height: 200px"></div>
      </el-step>
      <el-step title="编译代码">
        <div style="height: 200px"></div>
      </el-step>
      <el-step title="生成测试数据">
        <div style="height: 200px"></div>
      </el-step>
      <el-step title="构建完成"></el-step>
    </el-steps>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ElSteps from '@/components/steps/steps.vue';
import ElStep from '@/components/steps/step.vue';

export default defineComponent({
  name: 'MessageView',
  components: {
    ElSteps,
    ElStep
  },
  props: {
    messages: Array,
    problem: Object,
    version: Number
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
