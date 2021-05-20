<template>
  <div>
    <div class="mb-2 is-flex is-align-items-center">
      <span style="width: 11em" class="has-text-weight-bold is-inline-block"
        >从静态文件生成：</span
      >
      <b-select
        style="width: 10em"
        expanded
        class="is-inline-block"
        v-model="lang"
        placeholder="选择静态文件"
      >
        <option
          v-for="(file, index) in staticFiles"
          :value="index"
          :key="file.filename"
        >
          {{ file.filename }}
        </option>
      </b-select>
      <b-button class="ml-4" type="is-success">添加</b-button>
    </div>
    <div class="mb-2 is-flex is-align-items-center">
      <span style="width: 11em" class="has-text-weight-bold is-inline-block"
        >使用 Generator 生成：</span
      >
      <b-select
        style="width: 10em"
        expanded
        class="is-inline-block mr-4"
        v-model="lang"
        placeholder="选择 Generator"
      >
        <option
          style="width: 10em"
          v-for="(generator, index) in generators"
          :value="index"
          :key="index"
        >
          {{ generator.name }}.{{ generator.language }}
        </option>
      </b-select>
      <b-input placeholder="运行参数"></b-input>
      <b-button class="ml-4" type="is-success">添加</b-button>
    </div>
    <b-table :data="testcases">
      <b-table-column label="#" v-slot="props" width="24">
        <span class="has-text-weight-bold">{{ props.index }}</span>
      </b-table-column>
      <b-table-column label="测试用例" v-slot="props">
        <span>{{ props.index }}</span>
      </b-table-column>
      <b-table-column label="样例？" width="80" v-slot="props">
        <span>{{ props.index }}</span>
      </b-table-column>
      <b-table-column v-slot="props" centered label="操作" width="80">
        <span class="is-inline-block pt-2">
          <b-button
            icon-left="delete"
            size="is-small"
            type="is-danger"
            @click="remove(props.index)"
          ></b-button>
        </span>
      </b-table-column>
    </b-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';
import { getAllStaticFilename } from '@/service/polygon';

export default defineComponent({
  name: 'EditTestcases',
  props: {
    problem: Object
  },
  setup(props) {
    const problem = props.problem!;

    const generators = problem.generators;
    const staticFiles = reactive([] as any[]);
    getAllStaticFilename(problem.parent).then((data: any[]) => {
      staticFiles.push(...data);
    });

    const testcases = reactive([]);

    return {
      generators,
      staticFiles,
      testcases
    };
  }
});
</script>

<style scoped></style>
