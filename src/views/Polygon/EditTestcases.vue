<template>
  <div>
    <div class="mb-2 is-flex is-align-items-center">
      <span class="has-text-weight-bold is-inline-block" style="width: 11em"
        >从静态文件生成：</span
      >
      <b-select
        v-model="selectStaticFile"
        class="is-inline-block"
        expanded
        placeholder="选择静态文件"
        style="width: 10em"
      >
        <option
          v-for="(file, index) in staticFiles"
          :key="file.filename"
          :value="index"
        >
          {{ file.filename }}
        </option>
      </b-select>
      <b-button class="ml-4" type="is-success" @click="addFromStaticFile"
        >添加</b-button
      >
    </div>

    <div class="mb-2 is-flex is-align-items-center">
      <span class="has-text-weight-bold is-inline-block" style="width: 11em"
        >使用 Generator 生成：</span
      >
      <b-select
        v-model="selectGenerator"
        class="is-inline-block mr-4"
        expanded
        placeholder="选择 Generator"
        style="width: 10em"
      >
        <option
          v-for="(generator, index) in generators"
          :key="index"
          :value="index"
          style="width: 10em"
        >
          {{ generator.name }}.{{ generator.language }}
        </option>
      </b-select>
      <b-input v-model="generatorArgs" placeholder="运行参数"></b-input>
      <b-button class="ml-4" type="is-success" @click="addFromGenerator"
        >添加</b-button
      >
    </div>

    <b-table :data="testcases">
      <b-table-column v-slot="props" label="#" width="24">
        <span class="has-text-weight-bold">{{ props.index + 1 }}</span>
      </b-table-column>
      <b-table-column v-slot="props" label="测试用例">
        <div v-if="props.row.type === 'file'">
          <span>静态文件：</span>
          <b-tag>{{ props.row.filename }}</b-tag>
        </div>
        <div v-else>
          <span>Generator：</span>
          <b-tag>{{ getGeneratorName(props.row.generator) }}</b-tag>
          <b-tag
            v-for="(item, index) in props.row.args"
            :key="index"
            class="ml-2"
            >{{ item }}</b-tag
          >
        </div>
      </b-table-column>
      <b-table-column v-slot="props" centered label="样例？" width="8em">
        <span class="icon">
          <i v-if="props.row.example" class="mdi mdi-check"></i>
        </span>
        <b-button
          class="ml-1"
          size="is-small"
          type="is-text"
          @click="setExample(props.index)"
        >
          <span v-if="props.row.example">取消</span>
          <span v-else>设置</span>
        </b-button>
      </b-table-column>
      <b-table-column v-slot="props" centered label="操作" width="80">
        <span class="is-inline-block">
          <b-button
            icon-left="delete"
            size="is-small"
            type="is-danger"
            @click="removeTestcase(props.index)"
          ></b-button>
        </span>
      </b-table-column>
    </b-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api';
import { getAllStaticFilename } from '@/service/polygon';
import { TestcaseSet } from '@/service/TestcaseSet';
import { useSnackbar } from '@/utils';

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

    const testcases = reactive(JSON.parse(problem.testcases));
    const testcaseSet = new TestcaseSet(
      problem.parent,
      testcases,
      staticFiles,
      generators
    );

    const snackbar = useSnackbar();

    const selectStaticFile = ref(0);
    const addFromStaticFile = async () => {
      try {
        const filename = staticFiles[selectStaticFile.value].filename;
        await testcaseSet.addFromStaticFile(filename);
        snackbar.open(`静态文件 ${filename} 已经成功添加`);
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };

    const selectGenerator = ref(0);
    const generatorArgs = ref('');
    const getGeneratorName = (gid: number) => {
      for (const g of generators) {
        if (g.id === gid) {
          return `${g.name}.${g.language}`;
        }
      }
      // Unknown
      return 'Unknown';
    };
    const addFromGenerator = async () => {
      try {
        const generator = generators[selectGenerator.value];
        const args = generatorArgs.value
          .split(' ')
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
        await testcaseSet.addFromGenerator(generator.id, args);
        snackbar.open(`添加成功`);
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };

    const removeTestcase = async (index: number) => {
      try {
        await testcaseSet.removeTestcase(index);
        snackbar.open(`删除成功`);
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };
    const setExample = async (index: number) => {
      try {
        const flag = await testcaseSet.setExample(index);
        if (flag) {
          snackbar.open(`测试数据 ${index} 已被设置为样例`);
        } else {
          snackbar.open(`测试数据 ${index} 已取消成为样例`);
        }
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };

    return {
      generators,
      staticFiles,
      testcases,
      selectStaticFile,
      selectGenerator,
      generatorArgs,
      getGeneratorName,
      addFromStaticFile,
      addFromGenerator,
      removeTestcase,
      setExample
    };
  }
});
</script>

<style scoped></style>
