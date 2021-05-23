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

    <div v-if="problem.examples.length > 0">
      <h6 class="title is-5">
        <span>样例</span>
        <b-tag class="ml-2">版本 {{ problem.version }}</b-tag>
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

    <h6 class="title is-5">提示</h6>
    <markdown-view class="mb-4" :source="problem.notes"></markdown-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import MarkdownView from '@/components/MarkdownView.vue';
import { copyToClipboard } from '@/utils';
import { getDetailClassicProblem } from '@/service/polygon';

export default defineComponent({
  name: 'PreviewStatement',
  props: {
    problem: Object
  },
  components: {
    MarkdownView
  },
  methods: {
    copyToClipboard
  },
  async created() {
    if (this.problem) {
      const data = await getDetailClassicProblem(this.problem.parent);
      this.problem.version = data.version;
      this.problem.title = data.title;
      this.problem.legend = data.legend;
      this.problem.inputFormat = data.inputFormat;
      this.problem.outputFormat = data.outputFormat;
      this.problem.examples = data.examples;
      this.problem.notes = data.notes;
    }
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
