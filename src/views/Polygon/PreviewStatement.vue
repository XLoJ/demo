<template>
  <section>
    <h6 class="title is-4 mb-4">{{ problem.title }}</h6>
    <p>
      <span class="has-text-weight-bold">时间限制</span>：{{
        problem.timeLimit
      }}
      ms
    </p>
    <p class="mb-4">
      <span class="has-text-weight-bold">空间限制</span>：{{
        problem.memoryLimit
      }}
      MB
    </p>

    <markdown-view class="mb-4" :source="problem.legend"></markdown-view>

    <h6 class="title is-5">输入描述</h6>
    <markdown-view class="mb-4" :source="problem.inputFormat"></markdown-view>

    <h6 class="title is-5">输出描述</h6>
    <markdown-view class="mb-4" :source="problem.outputFormat"></markdown-view>

    <h6 class="title is-5">提示</h6>
    <markdown-view class="mb-4" :source="problem.notes"></markdown-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import MarkdownView from '@/components/MarkdownView.vue';

export default defineComponent({
  name: 'PreviewStatement',
  props: {
    problem: Object
  },
  components: {
    MarkdownView
  }
});
</script>

<style scoped></style>
