<template>
  <v-card class="case-card" elevation="1">
    <v-img :src="caseData.image" height="140px" class="rounded-t-lg">
      <div class="overlay">
        <div class="text-white text-caption">{{ caseData.category }}</div>
        <div class="text-white text-caption d-flex align-center">
          Difficulty level:
          <v-icon v-for="n in 3" :key="n" size="12" class="ml-1"
            :color="n <= caseData.difficulty ? 'red' : 'white'">
            mdi-circle
          </v-icon>
        </div>
      </div>
    </v-img>
    <v-card-text>
      <h3 class="text-subtitle-1 font-weight-medium">{{ caseData.title }}</h3>
      <p class="text-caption mt-1">{{ caseData.description }}</p>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn variant="text" class="text-primary" :to="`/cases/${caseData.id}`">
        Enroll <v-icon end>mdi-chevron-right</v-icon>
      </v-btn>
      <v-chip
        v-if="status"
        :color="status === 'success' ? 'green' : 'red'"
        variant="tonal"
        size="small"
        class="ml-auto"
      >
        {{ status === 'success' ? 'Успешно' : 'Не пройден' }}
      </v-chip>


    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { computed } from 'vue'
  import { useStore } from 'vuex'


  const store = useStore()

  const props = defineProps({
    caseData: Object
  })

 const status = computed(() => {
    const completed = (store.state.user.userData?.completedCases || []).find(
      c => c.id === props.caseData.id
    )
    return completed?.status || null
  })
</script>

<style scoped>
.case-card {
  border-radius: 12px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.case-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.overlay {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  padding: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
