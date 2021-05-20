<template>
  <vue-markdown :source="source" :plugins="plugins"></vue-markdown>
</template>

<script>
import VueMarkdown from 'vue-markdown';
import katex from 'markdown-it-katex';

export default {
  name: 'MarkdownView',
  props: {
    source: String
  },
  components: {
    VueMarkdown
  },
  data() {
    return {
      plugins: [
        {
          plugin: katex,
          options: { throwOnError: false, errorColor: ' #cc0000' }
        }
      ]
    };
  }
};
</script>

<style>
@import '~github-markdown-css';
@import '../assets/ghcolors.css';
</style>
