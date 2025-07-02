<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <ProfileCard @edit="editDialog = true" />
        <EditProfileDialog v-model="editDialog" />
      </v-col>

      <!-- Статистика -->
      <v-col cols="12" md="8">
        <v-card class="pa-4 mb-6" elevation="2">
          <h3 class="text-h6 font-weight-bold mb-4">📊 Ваша статистика</h3>
          <v-row>
            <v-col cols="12" sm="4">
              <div class="stat-box">
                <h2 class="text-h5 text-primary">{{ completedCount }}</h2>
                <span class="text-caption">Пройдено кейсов</span>
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="stat-box">
                <h2 class="text-h5 text-primary">{{ averageAccuracy }}</h2>
                <span class="text-caption">Средняя точность</span>
              </div>
            </v-col>
            <v-col cols="12" sm="4">
              <div class="stat-box">
                <h2 class="text-h5 text-primary">{{ totalPoints }}</h2>
                <span class="text-caption">Баллы</span>
              </div>
            </v-col>

          </v-row>
        </v-card>
      </v-col>

      <!-- Последние кейсы -->
      <v-col cols="12" md="8">
        <v-card class="pa-4 mb-6" elevation="2">
          <h3 class="text-h6 font-weight-bold mb-4">🕘 Последние кейсы</h3>
          <v-list density="compact">
            <v-list-item
              v-for="(caseItem, i) in recentCases"
              :key="i"
              :title="caseItem.title"
              :subtitle="`Пройдено: ${caseItem.date}`"
            >
              <template #prepend>
                <v-icon color="primary">mdi-clipboard-check-outline</v-icon>
              </template>

              
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

     
      
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed,ref  } from 'vue'
  import { useStore } from 'vuex'
  import ProfileCard from '@/components/profile/ProfileCard.vue'
  import EditProfileDialog from '@/components/profile/EditProfileDialog.vue'

  const store = useStore()
  const userData = computed(() => store.state.user.userData || {})

  const completedCases = computed(() =>
    (userData.value.completedCases || []).filter(c => c.status === 'success')
  )


  const completedCount = computed(() => completedCases.value.length)

  const averageAccuracy = computed(() => {
    if (completedCases.value.length === 0) return '0%'
    const sum = completedCases.value.reduce((acc, c) => acc + (c.accuracy || 0), 0)
    return `${Math.round(sum / completedCases.value.length)}%`
  })

  const totalPoints = computed(() => {
    return completedCases.value.reduce((acc, c) => acc + (c.accuracy || 0), 0)
  })

 const recentCases = computed(() => {
  return [...completedCases.value]
    .filter(c => !!c) 
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)
})


  const editDialog = ref(false)

</script>




<style scoped>
  .stat-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 12px 0;
  }
</style>
