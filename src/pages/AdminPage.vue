<template>
  <v-container fluid class="admin-panel">
    <!-- Шапка -->
    <v-row class="mb-6">
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold" style="color: #0d47a1;">
          <v-icon large color="primary" class="mr-2">mdi-shield-check</v-icon>
          Панель администратора
        </h1>
        <p class="text-subtitle-1 text-grey">Управление контентом</p>
      </v-col>
    </v-row>

    <!-- Табы -->
    <v-card class="rounded-xl elevation-4">
      <v-tabs v-model="tab" bg-color="primary" slider-color="yellow" grow dark>
        <v-tab value="cases">
          <v-icon start>mdi-folder-edit-outline</v-icon>
          Кейсы
        </v-tab>
        <v-tab value="achievements">
          <v-icon start>mdi-trophy-variant-outline</v-icon>
          Достижения
        </v-tab>
      </v-tabs>

      <v-card-text class="pa-6">
        <!--  ВКЛАДКА КЕЙСОВ  -->
        <div v-if="tab === 'cases'">
          <!-- Панель инструментов -->
          <v-row class="mb-4" align="center">
            <v-col cols="12" md="3">
               <v-select
                  v-model="filterCategory"
                  :items="availableCategories"
                  item-title="name"
                  item-value="name"
                  label="Фильтр по категории"
                  clearable
                  density="compact"
                  variant="outlined"
                  hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" md="5">
              <v-text-field
                v-model="searchCases"
                label="Поиск (ID или Название)"
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                hide-details
                clearable
              />
            </v-col>
            <v-col cols="12" md="4" class="text-right">
              <v-btn color="primary" prepend-icon="mdi-plus" @click="openCaseDialog()" elevation="2" block>
                Добавить кейс
              </v-btn>
            </v-col>
          </v-row>

          <v-table class="rounded-lg">
            <thead>
              <tr>
                <th class="text-left" style="width: 50px;">ID</th>
                <th class="text-left">Название</th>
                <th class="text-left">Категория</th>
                <th class="text-left" style="width: 150px;">Сложность</th>
                <th class="text-right" style="width: 120px;">Действия</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredCases" :key="item.id">
                <td class="font-weight-bold">{{ item.id }}</td>
                <td class="font-weight-medium">{{ item.title }}</td>
                <td>
                  <v-chip size="small" color="info" variant="tonal">{{ item.category }}</v-chip>
                </td>
                <td>
                  <v-rating :model-value="item.difficulty" readonly density="compact" color="red" half-increments></v-rating>
                </td>
                <td class="text-right">
                  <v-btn icon="mdi-pencil" size="small" variant="text" color="primary" @click="openCaseDialog(item)"></v-btn>
                  <v-btn icon="mdi-delete" size="small" variant="text" color="red" @click="deleteCase(item.id)"></v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>

        <!--  ВКЛАДКА ДОСТИЖЕНИЙ  -->
        <div v-if="tab === 'achievements'">
          <div class="d-flex justify-end mb-4">
            <v-btn color="secondary" prepend-icon="mdi-plus" @click="openAchievementDialog()" elevation="2">
              Добавить ачивку
            </v-btn>
          </div>

          <v-row>
            <v-col cols="12" md="4" v-for="ach in achievements" :key="ach.id">
              <v-card class="pa-4" elevation="2">
                <div class="d-flex justify-space-between align-start">
                  <div>
                    <div class="text-h6">{{ ach.title }}</div>
                    <div class="text-caption text-grey">{{ ach.id }}</div>
                    <div class="text-body-2 mt-2">{{ ach.description }}</div>
                  </div>
                  <v-btn icon="mdi-delete" size="small" variant="text" color="red" @click="deleteAchievement(ach.id)"></v-btn>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>

    <!--  ДИАЛОГ ДОБАВЛЕНИЯ/РЕДАКТИРОВАНИЯ КЕЙСА  -->
    <v-dialog v-model="caseDialog" max-width="900px" persistent>
      <v-card class="rounded-xl">
        <v-card-title class="text-h5 pa-6 bg-primary text-white d-flex align-center">
          <span>{{ editingCase ? 'Редактировать кейс' : 'Новый кейс' }}</span>
          <v-spacer></v-spacer>
          <v-btn icon dark variant="text" @click="caseDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text class="pa-6">
          <v-form ref="caseForm">
            <v-row>
              <v-col cols="12" md="8">
                <v-text-field 
                  v-model="caseData.title" 
                  label="Название кейса *" 
                  :rules="[v => !!v || 'Название обязательно']"
                  required 
                />
              </v-col>
              <v-col cols="12" md="4">
                <v-select 
                  v-model="caseData.difficulty" 
                  :items="[1, 2, 3, 4, 5]" 
                  label="Сложность"
                  :rules="[v => !!v || 'Выберите сложность']"
                />
              </v-col>
              
              <!-- ПОЛЕ КАТЕГОРИИ -->
              <v-col cols="12" md="6">
                <v-combobox 
                  v-model="caseData.category" 
                  :items="categoryNames"
                  label="Категория *"
                  chips
                  clearable
                  hint="Выберите из списка или введите новую"
                  persistent-hint
                  :rules="[v => !!v || 'Категория обязательна']"
                ></v-combobox>
              </v-col>

              <v-col cols="12" md="6">
                <v-text-field 
                  v-model="caseData.image" 
                  label="Ссылка на изображение"
                  hint="Оставьте пустым, если нет картинки"
                  persistent-hint
                />
              </v-col>
              <v-col cols="12">
                <v-textarea 
                  v-model="caseData.description" 
                  label="Описание *" 
                  rows="2"
                  :rules="[v => !!v || 'Описание обязательно']"
                />
              </v-col>
              <v-col cols="12">
                <div class="d-flex align-center mb-2">
                    <h3 class="mr-2">Структура шагов (JSON) *</h3>
                    <!-- КНОПКА ВОПРОС -->
                    <v-btn 
                        icon 
                        color="info" 
                        variant="text" 
                        size="small" 
                        @click="helpDialog = true"
                        title="Нажмите для примера"
                    >
                        <v-icon>mdi-help-circle</v-icon>
                    </v-btn>
                </div>
                <v-textarea 
                  v-model="caseData.stepsJson" 
                  auto-grow 
                  rows="10" 
                  label="JSON шагов"
                  :rules="[v => !!v || 'Заполните шаги', validateJson]"
                  hint="Заполните согласно шаблону"
                  persistent-hint
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="pa-6 pt-0">
          <v-spacer></v-spacer>
          <v-btn text @click="caseDialog = false">Отмена</v-btn>
          <v-btn color="primary" :loading="saving" @click="saveCase" size="large">
            <v-icon start>mdi-content-save</v-icon>
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!--  ДИАЛОГ ПОДСКАЗКИ (HELP)  -->
    <v-dialog v-model="helpDialog" max-width="800px">
        <v-card class="rounded-xl">
            <v-card-title class="text-h6 bg-info text-white pa-4">
                <v-icon start>mdi-information</v-icon>
                Справка по заполнению JSON
            </v-card-title>
            <v-card-text class="pa-4 text-body-1">
                <p class="mb-4">Поле <strong>steps</strong> должно содержать массив объектов. Каждый объект — это шаг кейса.</p>
                
                <h3 class="mb-2">1. Шаг с вопросом (type: question)</h3>
                <pre class="bg-grey-lighten-3 pa-3 rounded-lg overflow-x-auto" style="font-size: 0.8rem;">{
                    "id": 1,
                    "type": "question",
                    "question": "Текст вашего вопроса?",
                    "options": [
                        { "text": "Вариант ответа 1 (Правильный)", "correct": true },
                        { "text": "Вариант ответа 2 (Неверный)", "correct": false }
                    ],
                    "explanation": "Объяснение, почему правильный ответ верный."
                    }</pre>

                                    <h3 class="mb-2 mt-4">2. Информационный шаг (type: info)</h3>
                                    <pre class="bg-grey-lighten-3 pa-3 rounded-lg overflow-x-auto" style="font-size: 0.8rem;">{
                    "id": 2,
                    "type": "info",
                    "content": "Текст информации для чтения пациентом."
                    }
                </pre>

                <v-alert type="warning" class="mt-4" density="compact">
                    Внимательно следите за запятыми между объектами и квадратными скобками в начале и конце массива.
                </v-alert>
            </v-card-text>
            <v-card-actions class="pa-4 pt-0">
                <v-spacer></v-spacer>
                <v-btn color="primary" variant="text" @click="helpDialog = false">Понятно</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <!-- ДИАЛОГ АЧИВОК -->
    <v-dialog v-model="achievementDialog" max-width="500px">
      <v-card class="rounded-xl">
        <v-card-title class="text-h6 pa-4 bg-secondary text-white">Новая ачивка</v-card-title>
        <v-card-text class="pa-4">
          <v-text-field v-model="newAchievement.id" label="ID (латиница, напр. first_win)" />
          <v-text-field v-model="newAchievement.title" label="Название" />
          <v-textarea v-model="newAchievement.description" label="Описание" rows="2" />
        </v-card-text>
        <v-card-actions class="pa-4 pt-0">
          <v-spacer></v-spacer>
          <v-btn text @click="achievementDialog = false">Отмена</v-btn>
          <v-btn color="secondary" @click="saveAchievement">Создать</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script setup>
    import { ref, computed, onMounted } from 'vue';
    import api from '@/api';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';

    const store = useStore();
    const router = useRouter();

    
    const tab = ref('cases');
    const cases = ref([]);
    const achievements = ref([]);
    const searchCases = ref('');
    const filterCategory = ref(null); 
    const saving = ref(false);

    
    const caseDialog = ref(false);
    const achievementDialog = ref(false);
    const helpDialog = ref(false); 

    
    const caseForm = ref(null);
    const editingCase = ref(null);
    const caseData = ref({
    title: '',
    category: '',
    description: '',
    image: '',
    difficulty: 1,
    stepsJson: '[]'
    });

    const newAchievement = ref({
    id: '', title: '', description: ''
    });

    // Пример шаблона по умолчанию для нового кейса
    const defaultStepsTemplate = `[]`;

    // Проверка прав доступа при загрузке
    onMounted(async () => {
    const user = store.state.user.userData;
    if (!user || user.role !== 'admin') {
        setTimeout(() => {
            const u = store.state.user.userData;
            if (u?.role !== 'admin') {
                alert('Доступ запрещен');
                router.push('/');
            }
        }, 500);
    }
    await loadCases();
    await loadAchievements();
    });

    // Загрузка данных
    const loadCases = async () => {
    try {
        const res = await api.get('/cases');
        cases.value = res.data;
    } catch (e) { console.error(e); }
    };

    const loadAchievements = async () => {
    try {
        const res = await api.get('/admin/achievements');
        achievements.value = res.data;
    } catch (e) { console.error(e); }
    };

    
    const availableCategories = computed(() => {
        const map = {};
        cases.value.forEach(c => {
            if(c.category) map[c.category] = (map[c.category] || 0) + 1;
        });
        return Object.entries(map).map(([name, count]) => ({ name, count }));
    });

    
    const categoryNames = computed(() => {
        const categories = cases.value.map(c => c.category).filter(c => c);
        return [...new Set(categories)];
    });

    
    const filteredCases = computed(() => {
    return cases.value.filter(c => {
        const matchCategory = !filterCategory.value || c.category === filterCategory.value;
        const searchTerm = searchCases.value ? searchCases.value.toLowerCase() : '';
        const matchSearch = !searchTerm || 
                            c.id.toString().includes(searchTerm) || 
                            c.title.toLowerCase().includes(searchTerm);
        return matchCategory && matchSearch;
    });
    });

    

    const openCaseDialog = (item = null) => {
    editingCase.value = item;
    if (item) {
        
        caseData.value = { 
        ...item, 
        stepsJson: typeof item.steps === 'string' ? item.steps : JSON.stringify(item.steps, null, 2)
        };
    } else {
        
        caseData.value = {
        title: '',
        category: '',
        description: '',
        image: '',
        difficulty: 1,
        stepsJson: defaultStepsTemplate
        };
    }
    caseDialog.value = true;
    };

    
    const validateJson = (v) => {
    try {
        JSON.parse(v);
        return true;
    } catch (e) {
        return 'Неверный формат JSON';
    }
    };

    const saveCase = async () => {
    
    const { valid } = await caseForm.value.validate();
    if (!valid) return;

    saving.value = true;
    try {
        const payload = { ...caseData.value };
        payload.steps = JSON.parse(payload.stepsJson); // Парсим, так как валидация уже прошла

        if (editingCase.value) {
        await api.put(`/admin/cases/${editingCase.value.id}`, payload);
        } else {
        await api.post('/admin/cases', payload);
        }
        
        await loadCases();
        caseDialog.value = false;
    } catch (err) {
        alert('Ошибка сохранения: ' + (err.response?.data?.error || err.message));
    } finally {
        saving.value = false;
    }
    };

    const deleteCase = async (id) => {
    if (confirm('Удалить этот кейс? Это действие необратимо.')) {
        try {
        await api.delete(`/admin/cases/${id}`);
        await loadCases();
        } catch (e) { alert('Ошибка удаления'); }
    }
    };

    

    const openAchievementDialog = () => {
    newAchievement.value = { id: '', title: '', description: '' };
    achievementDialog.value = true;
    };

    const saveAchievement = async () => {
    try {
        await api.post('/admin/achievements', newAchievement.value);
        await loadAchievements();
        achievementDialog.value = false;
    } catch (err) {
        alert('Ошибка создания ачивки');
    }
    };

    const deleteAchievement = async (id) => {
    if (confirm('Удалить достижение?')) {
        try {
        await api.delete(`/admin/achievements/${id}`);
        await loadAchievements();
        } catch (e) { alert('Ошибка удаления'); }
    }
    };
</script>

<style scoped>
    .admin-panel {
    max-width: 1400px;
    margin: 0 auto;
    }
    .bg-primary { background-color: #1976d2; color: white; }
    .bg-secondary { background-color: #9c27b0; color: white; }
    .bg-info { background-color: #2196f3; color: white; }
</style>
