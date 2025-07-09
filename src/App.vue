<!-- Спортивное врачевание
Разработка сайта, на котором молодые врачи смогут прокачивать свои навыки, решая интерактивные задачи (по аналогии со спортивным программированием)-->

<template>
  <v-app>
    <AppBar />

    <v-main>
      <router-view />
    </v-main>

    <AppFooter  v-if="showFooter"/>
  </v-app>
</template>


<script>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import AppBar from '@/components/layout/AppBar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: { AppBar, AppFooter },
  setup() {
    const route = useRoute()

    const showFooter = computed(() => {
      return !['/login', '/register', '/profile', ].includes(route.path)
    })

    return { showFooter }
  }
}
</script>
