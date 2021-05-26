<template>
  <section v-if="problem">
    <h6 class="title is-3 mb-4">
      <span v-if="index !== null">{{ numberToIndex(+index) }}. </span>
      <span>{{ problem.title }}</span>
    </h6>
    <p class="is-family-monospace">
      <span class="has-text-weight-bold">时间限制</span>：{{
        problem.timeLimit
      }}
      ms
    </p>
    <p class="mb-4 is-family-monospace">
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

    <div v-if="problem.examples.length > 0" class="pb-3">
      <h6 class="title is-5">
        <span>样例</span>
      </h6>
      <div
        v-for="(example, index) in problem.examples"
        :key="index"
        class="mb-4"
      >
        <div
          class="
            subtitle
            is-6
            pl-2
            pr-2
            pt-1
            pb-1
            mb-0
            border
            is-flex is-align-items-center is-justify-content-space-between
          "
        >
          <span class="has-text-weight-bold">输入</span>
          <b-button size="is-small" @click="copyToClipboard(example.in)"
            >复制</b-button
          >
        </div>
        <div>
          <pre class="has-background-example p-2 border-left border-right">{{
            example.in
          }}</pre>
        </div>
        <div
          class="
            subtitle
            is-6
            pl-2
            pr-2
            pt-1
            pb-1
            mb-0
            border
            is-flex is-align-items-center is-justify-content-space-between
          "
        >
          <span class="has-text-weight-bold">输出</span>
          <b-button size="is-small" @click="copyToClipboard(example.answer)"
            >复制</b-button
          >
        </div>
        <div>
          <pre
            class="
              has-background-example
              p-2
              border-left border-right border-bottom
            "
            >{{ example.answer }}</pre
          >
        </div>
      </div>
    </div>

    <div v-if="problem.notes.length > 0">
      <h6 class="title is-5">提示</h6>
      <markdown-view class="mb-4" :source="problem.notes"></markdown-view>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import MarkdownView from '@/components/MarkdownView.vue';
import { numberToIndex } from '@/views/Contest/utils';

export default defineComponent({
  name: 'ProblemView',
  props: {
    problem: Object,
    index: {
      type: Number,
      default: null
    }
  },
  components: {
    MarkdownView
  },
  methods: {
    numberToIndex
  }
});
</script>

<style scoped>
.has-background-example {
  background-color: #efefef !important;
}

.border {
  border: 1px solid black;
}

.border-left {
  border-left: 1px solid black;
}

.border-right {
  border-right: 1px solid black;
}

.border-bottom {
  border-bottom: 1px solid black;
}
</style>
