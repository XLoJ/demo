<template>
  <div class="columns">
    <div class="column is-one-fifth">
      <b-menu>
        <b-menu-list>
          <b-menu-item label="1.cpp"></b-menu-item>
          <b-menu-item label="1.cpp"></b-menu-item>
          <b-menu-item label="1.cpp"></b-menu-item>
        </b-menu-list>
      </b-menu>
    </div>
    <div class="column" style="min-height: 500px">
      <Editor v-model="code" :lang="lang"></Editor>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import Editor from '@/components/Editor.vue';

export default defineComponent({
  name: 'EditGenerators',
  components: {
    Editor
  },
  props: {
    problem: Object
  },
  setup(props) {
    const problem = props.problem!;

    const code = ref('');
    const lang = ref('cpp');

    return {
      code,
      lang
    };
  }
});
</script>

<style scoped></style>
