<template>
  <div class="filters-container">
    <!-- Поиск -->
    <div class="filter-block search-block">
      <v-text-field
        v-model="search"
        label="Поиск"
        density="compact"
        variant="outlined"
        clearable
        prepend-inner-icon="mdi-magnify"
      />
    </div>

    <!-- Категории -->
    <div class="filter-block categories-block">
      <h3 class="filter-title">Категории</h3>
      <v-list nav dense class="category-list">
        <v-list-item
          :value="null"
          :active="!selectedCategory"
          @click="selectCategory(null)"
          class="category-item"
        >
          <v-list-item-title>Все</v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="cat in sortedCategories"
          :key="cat.name"
          :value="cat.name"
          :active="selectedCategory === cat.name"
          @click="selectCategory(cat.name)"
          class="category-item"
        >
          <v-list-item-title>{{ cat.name }}</v-list-item-title>
          <v-chip size="small" class="ml-auto" variant="tonal">{{ cat.count }}</v-chip>
        </v-list-item>
      </v-list>
    </div>

    <!-- Сложность -->
    <div class="filter-block toggles-block">
      <h3 class="filter-title">Сложность</h3>
      <v-btn-toggle
        v-model="selectedDifficulty"
        class="difficulty-toggle"
        mandatory
        density="compact"
        rounded="xl"
      >
        <v-btn :value="null">Все</v-btn>
        <v-btn v-for="n in 3" :key="n" :value="n">{{ n }}</v-btn>
      </v-btn-toggle>

      <h3 class="filter-title status-title">Статус</h3>
      <v-btn-toggle
        v-model="selectedStatus"
        class="status-toggle"
        mandatory
        density="compact"
        rounded="xl"
      >
        <v-btn :value="null">Все</v-btn>
        <v-btn value="completed">Успешно</v-btn>
        <v-btn value="not-completed">Не пройдено</v-btn>
      </v-btn-toggle>
    </div>
  </div>
</template>

<script setup>
  import { ref, watch,computed } from 'vue'

  const props = defineProps({
    categories: Array
  })
  const emit = defineEmits(['select'])

  const selectedCategory = ref(null)
  const selectedDifficulty = ref(null)
  const selectedStatus = ref(null)
  const search = ref('')

  const sortedCategories = computed(() => {
    return [...props.categories].sort((a, b) => a.name.localeCompare(b.name))
  })

  function emitFilters() {
    emit('select', {
      category: selectedCategory.value,
      difficulty: selectedDifficulty.value !== null ? Number(selectedDifficulty.value) : null,
      query: search.value.trim().toLowerCase(),
      status: selectedStatus.value
    })
  }

  function selectCategory(name) {
    selectedCategory.value = name
    emitFilters()
  }

  watch([selectedDifficulty, search, selectedStatus], emitFilters)
</script>

<style scoped>
  .filters-container {
    background: #fafafa;
    border: 1px solid #d3d3d3;
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    font-family: "Roboto", sans-serif;
  }


  .toggles-block {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .filter-block {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .filter-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #0d47a1;
    margin-bottom: 0.25rem;
    position: relative;
  }
  .filter-title::after {
    content: "";
    display: block;
    width: 30px;
    height: 2px;
    background: #0d47a1;
    margin-top: 4px;
  }

  .category-list {
    border-radius: 12px;
    border: 1px solid #d0d0d0;
    background: #ffffff;
    max-height: 200px;
    overflow-y: auto;
  }
  .category-item {
    border-radius: 8px;
    margin: 2px 0;
    transition: background 0.2s, box-shadow 0.2s;
    padding-left: 8px;
  }
  .category-item.v-list-item--active {
    background-color: #e3f2fd !important;
    color: #1565c0;
    font-weight: 600;
    box-shadow: inset 2px 0 0 #1565c0;
  }

  .difficulty-toggle,
  .status-toggle {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .v-btn {
    min-width: 40px;
    border-radius: 20px !important;
    background: #f5f2f5;
    border: 1px solid #cfd8dc;
    color: #1565c0;
    transition: all 0.2s ease;
  }
  .v-btn:hover {
    background: #e3f2fd;
  }
  .v-btn.v-btn--active {
    background: #1565c0 !important;
    color: #fff !important;
  }

  .v-text-field input {
    background: #ffffff;
    border-radius: 8px;
  }


  @media (max-width: 600px) {
    .filters-container {
      padding: 1rem;
      gap: 1rem;
    }
    
    .filters-container {
      flex-direction: row;
      overflow-x: auto;
    }
    .filter-block {
      flex: 0 0 auto;
      min-width: 140px;
      margin-right: 1rem;
    }
    
    .status-title,
    .filter-title {
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    .category-list {
      max-height: 120px;
    }
    .search-block {
      min-width: 200px;
    }
  }
</style>
