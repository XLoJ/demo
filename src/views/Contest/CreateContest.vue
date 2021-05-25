<template>
  <div>
    <div class="title is-4">创建比赛</div>
    <section>
      <b-field label="比赛名称">
        <b-input v-model="name"></b-input>
      </b-field>
      <b-button type="is-success" @click="submit">创建</b-button>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { createContest } from '@/service/contest';

export default defineComponent({
  name: 'CreateContest',
  data() {
    return {
      name: ''
    };
  },
  methods: {
    async submit() {
      try {
        const data = await createContest(this.name);
        this.$buefy.snackbar.open(`比赛 ${data.name} 创建成功`);
        await this.$router.push({ name: 'ContestList' });
      } catch (err) {
        this.$buefy.snackbar.open({
          message: err.message,
          type: 'is-danger'
        });
      }
    }
  }
});
</script>

<style scoped></style>
