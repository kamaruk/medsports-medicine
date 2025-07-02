<template>
  <v-container fluid class="py-10">
    <v-row>
      <!-- Filters Left -->
      <v-col cols="12" md="3">
        <CaseFilters :categories="categoryList" @select="filterCategory" />
      </v-col>

      <!-- Cases Right -->
      <v-col cols="12" md="9">
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="caseItem in filteredCases"
            :key="caseItem.id"
          >
            <CaseCard :caseData="caseItem" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'
  import CaseCard from '@/components/cases/CaseCard.vue'
  import CaseFilters from '@/components/cases/CaseFilters.vue'

  const store = useStore()
  const allCases = computed(() => store.state.cases.cases)
  const completedCaseIds = computed(() =>
    (store.state.user.userData?.completedCases || []).map(c => c.id)
  )

  const selectedFilters = ref({
    category: null,
    difficulty: null,
    query: ''
  })

  const filteredCases = computed(() => {
    return allCases.value.filter(c => {
      const byCategory = !selectedFilters.value.category || c.category === selectedFilters.value.category
      const byDifficulty = !selectedFilters.value.difficulty || c.difficulty === selectedFilters.value.difficulty
      const bySearch = !selectedFilters.value.query || c.title.toLowerCase().includes(selectedFilters.value.query)

      const completed = (store.state.user.userData?.completedCases || []).find(cc => cc.id === c.id)
      const status = completed?.status || null

      const byStatus =
        !selectedFilters.value.status ||
        (selectedFilters.value.status === 'completed' && status === 'success') ||
        (selectedFilters.value.status === 'not-completed' && status !== 'success')

      return byCategory && byDifficulty && bySearch && byStatus
    })
  })

  const categoryList = computed(() => {
    const map = {}
    for (const item of allCases.value) {
      map[item.category] = (map[item.category] || 0) + 1
    }
    return Object.entries(map).map(([name, count]) => ({ name, count }))
  })

  function filterCategory(filters) {
    selectedFilters.value = filters
  }
</script>
