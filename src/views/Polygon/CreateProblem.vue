<template>
  <div>
    <h4 class="title is-4">创建题目</h4>
    <section>
      <b-field label="题目名称">
        <b-input v-model="name"></b-input>
      </b-field>
      <b-button type="is-success" @click="submit">创建</b-button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { createNewProblem } from '@/service/polygon';

export default defineComponent({
  name: 'CreateProblem',
  data() {
    return {
      name: ''
    };
  },
  methods: {
    async submit() {
      try {
        const name = this.name.replaceAll('-', '_');
        const data = await createNewProblem(name, 'classic');
        this.$buefy.snackbar.open(`题目 ${data.id}. ${data.title} 创建成功`);
        this.$router.push({ name: 'Polygon', params: { id: data.id } });
      } catch (err) {
        this.$buefy.snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
        this.name = '';
      }
    }
  }
});
</script>

<style scoped></style>
