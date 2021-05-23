<template>
  <b-modal
    v-model="isActive"
    :destroy-on-hide="false"
    has-modal-card
    trap-focus
  >
    <template>
      <div class="modal-card" style="width: 960px">
        <header class="modal-card-head">
          <p class="mb-0 modal-card-title">
            <span>{{ code.name }}.{{ code.language }}</span>
            <span> : 版本 {{ code.version }}</span>
          </p>
          <button class="delete" type="button" @click="$emit('close')" />
        </header>
        <section class="modal-card-body" style="height: 600px">
          <Editor :code="source" :lang="lang"></Editor>
        </section>
        <footer class="modal-card-foot"></footer>
      </div>
    </template>
  </b-modal>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Editor from '@/components/Editor.vue';
import { b64decode } from '@/utils';

export default defineComponent({
  name: 'CodeHistoryView',
  components: {
    Editor
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    code: Object
  },
  model: {
    prop: 'active',
    event: 'change'
  },
  data() {
    return {
      isActive: this.active,
      source: b64decode(this.code?.body ?? ''),
      lang: this.code?.language ?? 'cpp'
    };
  },
  watch: {
    active(nV, oV) {
      if (nV !== oV) {
        this.isActive = nV;
      }
    },
    isActive(nV, oV) {
      if (nV !== oV) {
        this.$emit('change', nV);
      }
    },
    code(nV, oV) {
      if (nV) {
        const nSource = b64decode(nV.body ?? '');
        const nLang = nV.language ?? 'cpp';
        if (nSource !== this.source || nLang !== this.lang) {
          this.source = nSource;
          this.lang = nLang;
        }
      }
    }
  }
});
</script>

<style scoped></style>
