<template>
  <div>
    <div class="buttons">
      <b-button class="mb-0" type="is-success" @click="showUploadModal"
        >上传</b-button
      >
      <b-upload v-model="uploadFile" class="file-label" @input="fileUpload">
        <span class="file-cta">
          <b-icon class="file-icon" icon="upload"></b-icon>
          <span class="file-label">文件上传</span>
        </span>
      </b-upload>

      <b-modal v-model="isShowUpload" has-modal-card trap-focus>
        <template>
          <div class="modal-card" style="width: 720px">
            <header class="modal-card-head">
              <p class="modal-card-title">上传输入文件</p>
            </header>
            <section class="modal-card-body">
              <b-field label="名称">
                <b-input v-model="modalInput.filename"></b-input>
              </b-field>
              <b-field label="输入内容">
                <b-input v-model="modalInput.body" type="textarea"></b-input>
              </b-field>
            </section>
            <footer class="modal-card-foot">
              <b-button label="上传" type="is-success" @click="modalUpload" />
              <b-button label="关闭" @click="isShowUpload = false" />
            </footer>
          </div>
        </template>
      </b-modal>
    </div>
    <b-table :data="files">
      <b-table-column v-slot="props" label="#" width="24"
        ><span class="has-text-weight-bold">{{
          props.index + 1
        }}</span></b-table-column
      >
      <b-table-column v-slot="props" label="文件名"
        ><a href="#" @click="download(props.index)">{{
          props.row.filename
        }}</a></b-table-column
      >
      <b-table-column v-slot="props" label="预览" width="75%">
        <div class="has-background-light p-3">
          <pre class="p-0">{{ props.row.body }}</pre>
        </div>
      </b-table-column>
      <b-table-column v-slot="props" centered label="操作" width="80">
        <b-button
          icon-left="delete"
          size="is-small"
          type="is-danger"
          @click="remove(props.index)"
        ></b-button>
      </b-table-column>
    </b-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/composition-api';
import {
  downloadStaticFile,
  getAllStaticFilename,
  removeStaticFile,
  uploadStaticFile
} from '@/service/polygon';
import { useDialog, useSnackbar } from '@/utils';

export default defineComponent({
  name: 'UploadStaticFile',
  props: {
    problem: Object
  },
  setup(props) {
    const problem = props.problem!;

    const files = reactive([] as any[]);
    const uploadFile = ref(null as any);
    const isShowUpload = ref(false);

    getAllStaticFilename(problem.parent).then((data: any[]) => {
      files.push(...data);
    });

    const snackbar = useSnackbar();
    const dialog = useDialog();

    const download = async (index: number) => {
      try {
        await downloadStaticFile(problem.parent, files[index].filename);
      } catch (err) {
        snackbar.open({
          message: `静态文件 "${files[index].filename}" 下载失败`,
          type: 'is-danger'
        });
      }
    };

    const modalInput = reactive({ filename: '', body: '' });
    const showUploadModal = () => {
      modalInput.filename = `${files.length + 1}.in`;
      modalInput.body = '';
      isShowUpload.value = true;
    };

    const upload = async (filename: string, body: string) => {
      try {
        await uploadStaticFile(problem.parent, filename, body);
        snackbar.open(`静态文件 "${filename}" 上传成功`);
        files.push({ filename, body });
      } catch (err) {
        snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    };

    const modalUpload = async () => {
      const filename = modalInput.filename;
      const body = modalInput.body;
      await upload(filename, body);
      isShowUpload.value = false;
    };

    const fileUpload = async () => {
      const filename = uploadFile.value.name;
      const reader = new FileReader();
      reader.readAsText(uploadFile.value, 'utf-8');
      const body = await new Promise<string>((res, rej) => {
        reader.addEventListener('load', (e) => {
          res(e.target!.result as string);
        });
      });
      await upload(filename, body);
    };

    const remove = async (index: number) => {
      try {
        await removeStaticFile(problem.parent, files[index].filename);
        snackbar.open(`静态文件 "${files[index].filename}" 成功删除`);
        files.splice(index, 1);
      } catch (err) {
        snackbar.open({
          message: `静态文件 "${files[index].filename}" 删除失败`
        });
      }
    };

    return {
      files,
      uploadFile,
      isShowUpload,
      modalInput,
      download,
      showUploadModal,
      modalUpload,
      fileUpload,
      remove
    };
  }
});
</script>

<style scoped></style>
