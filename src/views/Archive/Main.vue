<template>
  <div>
    <div>
      <Navbar></Navbar>
    </div>
    <div class="container">
      <div class="tabs">
        <ul>
          <li :class="activeClass(0)">
            <router-link :to="{ name: routeTable[0] }">题库</router-link>
          </li>
          <li :class="activeClass(1)">
            <router-link :to="{ name: routeTable[1] }">评测队列</router-link>
          </li>
          <li :class="activeClass(2)" v-if="isUserAdmin">
            <router-link :to="{ name: routeTable[2] }">编辑比赛</router-link>
          </li>
        </ul>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Navbar from '../../components/Navbar.vue';
import { useUser } from '@/service/user';

const routeTable = ['Archive', 'ArchiveStatus', 'EditArchive'];

export default defineComponent({
  name: 'ArchiveMain',
  components: {
    Navbar
  },
  data() {
    const routeName = this.$route.name;
    const active = routeTable.findIndex((name) => name === routeName);
    return {
      active,
      routeTable
    };
  },
  methods: {
    activeClass(index: number) {
      return index === this.active ? 'is-active' : '';
    }
  },
  beforeRouteUpdate(to, from, next) {
    const active = this.routeTable.findIndex((name) => name === to.name);
    this.active = active;
    next();
  },
  setup() {
    const { isUserAdmin } = useUser();
    return {
      isUserAdmin
    };
  }
});
</script>

<style scoped>
.container {
  margin-top: 2rem;
}
</style>
