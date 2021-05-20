<template>
  <div>
    <b-table :data="files">
      <b-table-column label="#" v-slot="props" width="24"
        ><span class="has-text-weight-bold">{{
          props.index + 1
        }}</span></b-table-column
      >
      <b-table-column label="文件名" v-slot="props"
        ><a href="#" @click="download(props.index)">{{
          props.row.filename
        }}</a></b-table-column
      >
      <b-table-column label="预览" width="75%" v-slot="props">
        <div class="has-background-light p-3">
          <pre class="p-0">{{ props.row.body }}</pre>
        </div>
      </b-table-column>
      <b-table-column label="操作" centered width="80">
        <b-button
          size="is-small"
          icon-left="delete"
          type="is-danger"
        ></b-button>
      </b-table-column>
    </b-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from '@vue/composition-api';
import { downloadStaticFile, getAllStaticFilename } from '@/service/polygon';
import { useSnackbar } from '@/utils';

export default defineComponent({
  name: 'UploadStaticFile',
  props: {
    problem: Object
  },
  setup(props) {
    const problem = props.problem!;

    const files = reactive([] as any[]);

    getAllStaticFilename(problem.parent).then((data: any[]) => {
      files.push(...data);
    });

    const snackbar = useSnackbar();

    const download = async (index: number) => {
      try {
        await downloadStaticFile(problem.parent, files[index].filename);
      } catch (err) {
        snackbar.open({
          message: `静态文件 "${files[index].filename}" 下载失败`
        });
      }
    };

    return {
      files,
      download
    };
  }
});
</script>

<style scoped></style>
