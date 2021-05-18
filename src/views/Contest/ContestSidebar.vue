<template>
  <div>
    <div class="card">
      <header class="card-header">
        <p class="has-text-centered card-header-title">倒计时</p>
      </header>
      <div class="card-content">
        <div class="content">
          <b-progress type="is-success" :value="100" show-value></b-progress>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'ContestSidebar'
});
</script>

<style scoped></style>
