<template>
  <v-dialog v-model="dialog" max-width="500" persistent>
    <v-card>
      <v-card-title class="headline">Редактировать профиль</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="formValid">
          <v-text-field
            v-model="name"
            label="Имя"
            :rules="[rules.required]"
            required
          />
          <v-text-field
            v-model="email"
            label="Email"
            :rules="[rules.required, rules.email]"
            required
          />
          
          <!-- Блок загрузки аватара -->
          <div class="mb-4">
             <v-btn color="secondary" variant="outlined" @click="$refs.fileInput.click()">
               <v-icon start>mdi-camera</v-icon>
               Изменить фото
             </v-btn>
             <input ref="fileInput" type="file" accept="image/*" class="d-none" @change="handleFileUpload" />
             <div v-if="avatarPreview" class="mt-2">
                <v-avatar size="60">
                   <v-img :src="avatarPreview" />
                </v-avatar>
             </div>
          </div>

          <v-text-field
            v-model="password"
            label="Новый пароль (оставьте пустым, если не меняете)"
            type="password"
          />
          <v-text-field
            v-model="confirmPassword"
            label="Подтверждение пароля"
            type="password"
            :rules="[matchPassword]"
            :disabled="!password"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="dialog = false">Отмена</v-btn>
        <v-btn :disabled="!formValid" color="primary" :loading="loading" @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, watch } from 'vue'

const store = useStore()
const dialog = defineModel()
const loading = ref(false)

const user = computed(() => store.state.user.userData || {})

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const selectedFile = ref(null) // Для хранения объекта File
const avatarPreview = ref('') // Для отображения картинки

const form = ref(null)
const formValid = ref(true)

const rules = {
  required: v => !!v || 'Обязательное поле',
  email: v => /.+@.+\..+/.test(v) || 'Некорректный email',
}

const matchPassword = v => v === password.value || 'Пароли не совпадают'

// Сброс формы при открытии
watch(dialog, (open) => {
  if (open) {
    name.value = user.value.name || ''
    email.value = user.value.email || ''
    password.value = ''
    confirmPassword.value = ''
    selectedFile.value = null
    
    // Установка превью аватара
    if (user.value.avatar) {
       if (user.value.avatar.startsWith('http') || user.value.avatar.startsWith('data:')) {
           avatarPreview.value = user.value.avatar;
       } else {
           avatarPreview.value = 'http://localhost:3000' + user.value.avatar;
       }
    } else {
       avatarPreview.value = '';
    }
  }
})

// Обработка выбора файла
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  console.log("Выбран файл:", file); // ОТЛАДКА

  selectedFile.value = file; // Сохраняем сам файл
  
  // Создаем ссылку для предпросмотра
  avatarPreview.value = URL.createObjectURL(file);
}

const save = async () => {
  if (!form.value?.validate()) return

  loading.value = true;
  
  // Создаем объект FormData
  const formData = new FormData();
  formData.append('name', name.value);
  formData.append('email', email.value);
  
  if (password.value) {
    formData.append('password', password.value);
  }

  // Если выбран новый файл, добавляем его
  if (selectedFile.value) {
    formData.append('avatar', selectedFile.value);
    console.log("FormData: файл добавлен", selectedFile.value.name); // ОТЛАДКА
  }

  // Отправляем через store
  const result = await store.dispatch('user/updateProfile', formData);

  loading.value = false;

  if (result.success) {
    dialog.value = false;
  } else {
    alert(result.message || 'Ошибка');
  }
}
</script>