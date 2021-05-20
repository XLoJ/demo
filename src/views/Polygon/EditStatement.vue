<template>
  <div>
    <section v-if="mode === 'edit'">
      <b-field label="标题">
        <b-input v-model="title"></b-input>
      </b-field>
      <b-field label="题面">
        <b-input type="textarea" v-model="legend"></b-input>
      </b-field>
      <b-field label="输入描述">
        <b-input type="textarea" v-model="inputFormat"></b-input>
      </b-field>
      <b-field label="输出描述">
        <b-input type="textarea" v-model="outputFormat"></b-input>
      </b-field>
      <b-field label="提示">
        <b-input type="textarea" v-model="notes"></b-input>
      </b-field>
      <div class="buttons">
        <b-button type="is-success" @click="submit">更新</b-button>
        <b-button type="is-info" @click="mode = 'preview'">预览</b-button>
      </div>
    </section>
    <section v-else>
      <h6 class="title is-4">{{ title }}</h6>
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

      <markdown-view class="mb-4" :source="legend"></markdown-view>

      <h6 class="title is-5">输入描述</h6>
      <markdown-view class="mb-4" :source="inputFormat"></markdown-view>

      <h6 class="title is-5">输出描述</h6>
      <markdown-view class="mb-4" :source="outputFormat"></markdown-view>

      <h6 class="title is-5">提示</h6>
      <markdown-view class="mb-4" :source="notes"></markdown-view>

      <b-button class="mt-6" type="is-info" @click="mode = 'edit'"
        >返回</b-button
      >
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { updateProblemInfo } from '@/service/polygon';
import { useSnackbar } from '@/utils';
import MarkdownView from '@/components/markdown-view.vue';

export default defineComponent({
  name: 'EditStatement',
  components: {
    MarkdownView
  },
  props: {
    problem: Object
  },
  setup(props) {
    const problem = props.problem!;

    const mode = ref('edit');

    const title = ref(problem.title);
    const legend = ref(problem.legend);
    const inputFormat = ref(problem.inputFormat);
    const outputFormat = ref(problem.outputFormat);
    const notes = ref(problem.notes);

    const snackbar = useSnackbar();
    const submit = async () => {
      try {
        await updateProblemInfo(problem.parent, {
          title: title.value,
          legend: legend.value,
          inputFormat: inputFormat.value,
          outputFormat: outputFormat.value,
          notes: notes.value
        });
        snackbar.open(`题目 ${problem.parent} 更新成功`);
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };

    return {
      mode,
      title,
      legend,
      inputFormat,
      outputFormat,
      notes,
      submit
    };
  }
});
</script>

<style scoped></style>
