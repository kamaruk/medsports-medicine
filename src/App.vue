<template>
  <v-app>
    <AppBar />

    <v-main>
      <router-view />
    </v-main>

    <AppFooter v-if="showFooter" />
  </v-app>
</template>

<script>
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import AppBar from '@/components/layout/AppBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: { AppBar, AppFooter },
  setup() {
    const route = useRoute()
    const store = useStore()

    // Логика показа футера
    const showFooter = computed(() => {
      return !['/login', '/register', '/profile'].includes(route.path)
    })

    // ЗАГРУЗКА ДАННЫХ ПРИ СТАРТЕ ПРИЛОЖЕНИЯ
    onMounted(async () => {
      
      await store.dispatch('cases/fetchCases');

      
      if (store.state.user.isAuthenticated) {
         await store.dispatch('user/fetchProfile');
      }
    });

    return { showFooter }
  }
}
</script>

<style>

</style>