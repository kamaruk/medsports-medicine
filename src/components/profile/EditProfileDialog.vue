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
          
          <!-- Загрузка аватара -->
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
const avatar = ref('') // Тут будет Base64 строка
const avatarPreview = ref('') // Для превью

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
    avatar.value = user.value.avatar || ''
    avatarPreview.value = user.value.avatar || ''
  }
})

// Обработка файла
const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 500 * 1024) { // 500 КБ
    alert('Фото слишком большое. Пожалуйста, выберите файл меньше 500КБ.');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    avatar.value = reader.result; // Base64 строка
    avatarPreview.value = reader.result;
  };
  reader.readAsDataURL(file);
}

const save = async () => {
  if (!form.value?.validate()) return

  loading.value = true;
  
  const payload = {
    name: name.value,
    email: email.value,
    avatar: avatar.value
  };

  
  if (password.value) {
    payload.password = password.value;
  }

  const result = await store.dispatch('user/updateProfile', payload);

  loading.value = false;

  if (result.success) {
    dialog.value = false;
  } else {
    alert(result.message || 'Ошибка');
  }
}
</script>