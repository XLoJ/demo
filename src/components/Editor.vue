<template>
  <div class="editor-container">
    <AceEditor
      v-model="content"
      height="500px"
      width="100%"
      :lang="lang | parseLang"
      theme="chrome"
      @init="editorInit"
    ></AceEditor>
  </div>
</template>

<script>
import AceEditor from 'vue2-ace-editor';
import 'brace/ext/language_tools';
import 'brace/theme/chrome';
import 'brace/mode/c_cpp';
import 'brace/mode/python';
import 'brace/mode/java';

export default {
  name: 'Editor',
  components: {
    AceEditor
  },
  model: {
    prop: 'code',
    event: 'change'
  },
  props: {
    lang: String,
    code: String
  },
  data() {
    return {
      content: this.code
    };
  },
  watch: {
    code(nV, oV) {
      if (nV !== oV) {
        this.content = nV;
      }
    },
    content(nV, oV) {
      if (nV !== oV) {
        this.$emit('change', nV);
      }
    }
  },
  methods: {
    editorInit(editor) {
      editor.setOptions({
        fontFamily: 'Fira Code',
        fontSize: '14px'
      });
    }
  },
  filters: {
    parseLang(lang) {
      if (
        lang === 'c' ||
        lang === 'cpp' ||
        lang === 'cc14' ||
        lang === 'cc17'
      ) {
        return 'c_cpp';
      } else if (lang === 'java') {
        return 'java';
      } else if (lang === 'python' || lang === 'py2') {
        return 'python';
      } else {
        return 'c_cpp';
      }
    }
  }
};
</script>

<style>
.editor-container {
  display: flex;
  justify-content: center;
  text-align: left;
  height: 100%;
}
.editor {
  width: 100%;
  min-height: 500px;
  border: 1px solid rgb(238, 238, 238);
  tab-size: 2 !important;
  -moz-tab-size: 2 !important;
}
</style>
