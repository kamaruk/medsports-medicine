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

         <!-- Достижения -->
      <!-- Достижения -->
      <v-col cols="12" md="8">
        <v-card class="pa-4 mb-6" elevation="2">
          <h3 class="text-h6 font-weight-bold mb-4">🏅 Достижения</h3>

          <v-row dense>
            <v-col
              v-for="badge in earnedBadges"
              :key="badge.id"
              cols="12"
              sm="6"
              md="4"
              lg="3"
            >
              <v-hover v-slot="{ hover }">
                <v-card
                  class="badge-card"
                  :elevation="hover ? 8 : 2"
                  :class="{ 'badge-card--hover': hover }"
                >
                  <v-card-text class="text-center">
                    <v-icon size="48" class="mb-2">mdi-trophy-outline</v-icon>
                    <h4 class="badge-title">{{ badge.title }}</h4>
                  </v-card-text>

                  <v-expand-transition>
                    <div v-if="hover" class="badge-desc px-4 pb-4">
                      {{ badge.description }}
                    </div>
                  </v-expand-transition>
                </v-card>
              </v-hover>
            </v-col>

            <v-col v-if="earnedBadges.length === 0" cols="12">
              <p class="text-body-2 text-center">
                Пока нет достижений — начните проходить кейсы, чтобы заработать первый бейдж!
              </p>
            </v-col>
          </v-row>
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

  const earnedBadges = computed(() =>
    store.getters['achievements/earnedBadges'] || []
  )

  const editDialog = ref(false)

</script>




<style scoped>
.badge-card {
  border-radius: 12px;
  transition: transform 0.2s, box-shadow 0.2s;
  cursor: pointer;
  overflow: hidden;
}
.badge-card--hover {
  transform: translateY(-4px);
}
.badge-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}
.badge-desc {
  font-size: 0.95rem;
  color: #555;
  background-color: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  border-radius: 0 0 12px 12px;
}
</style>