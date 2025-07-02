<template>
  <v-container v-if="caseData" class="case-detail py-10">
    <v-row class="align-stretch">
      <!-- Изображение кейса -->
      <v-col cols="12" md="6">
        <v-card elevation="4" class="image-card">
          <v-img :src="caseData.image" height="100%" cover class="rounded-lg" />
        </v-card>
      </v-col>

      <!-- Информация -->
      <v-col cols="12" md="6" class="d-flex flex-column justify-space-between">
        <div>
          <h1 class="case-title mb-2">{{ caseData.title }}</h1>
          <v-chip color="primary" class="mb-4" label>{{ caseData.category }}</v-chip>

          <div class="d-flex align-center mb-3">
            <span class="text-subtitle-1 font-weight-medium mr-2">Сложность:</span>
            <v-icon
              v-for="n in 3"
              :key="n"
              size="18"
              class="mr-1"
              :color="n <= caseData.difficulty ? 'red' : 'grey'"
            >
              mdi-circle
            </v-icon>
          </div>

          <p class="case-description">{{ caseData.description }}</p>
        </div>

        <div class="mt-6">
          <v-btn color="primary" size="large" class="rounded-pill" :to="`/cases/${caseData.id}/steps`">
            Начать обучение
            <v-icon end>mdi-play-circle</v-icon>
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <!-- Кейс не найден -->
  <v-container v-else class="text-center py-10">
    <v-icon size="64" color="grey">mdi-alert-circle-outline</v-icon>
    <p class="mt-4 text-h6">Кейс не найден</p>
    <v-btn class="mt-4" to="/cases" color="primary" variant="outlined" rounded>
      Назад к кейсам
    </v-btn>
  </v-container>
</template>


<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'

  const store = useStore()
  const route = useRoute()
  const router = useRouter()

  const caseId = Number(route.params.id)

  const caseData = computed(() =>
    store.getters['cases/allCases'].find(c => c.id === caseId)
  )

  function startCase() {
    alert(`Вы начали кейс: ${caseData.value.title}`)
    
  }
</script>

<style scoped>
  .case-detail {
  max-width: 1200px;
  margin: 0 auto;
  }

  .case-title {
    font-size: 2.2rem;
    font-weight: 700;
    color: #0d47a1;
  }

  .case-description {
    font-size: 1.1rem;
    color: #444;
    line-height: 1.6;
    margin-top: 1rem;
  }

  .image-card {
    height: 100%;
    border-radius: 12px;
    overflow: hidden;
  }

  @media (max-width: 960px) {
    .case-title {
      font-size: 1.8rem;
      text-align: center;
    }

    .case-description {
      text-align: center;
    }

    .v-col.md\\:6 {
      text-align: center;
    }
  }

</style>