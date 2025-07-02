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
          <v-text-field
            v-model="password"
            label="Новый пароль"
            type="password"
            :rules="[rules.minLength]"
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
        <v-btn :disabled="!formValid" color="primary" @click="save">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, computed, watch } from 'vue'

const store = useStore()
const dialog = defineModel()

const user = computed(() => store.state.user.userData || {})

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const form = ref(null)
const formValid = ref(true)

const rules = {
  required: v => !!v || 'Обязательное поле',
  email: v => /.+@.+\..+/.test(v) || 'Некорректный email',
  minLength: v => !v || v.length >= 6 || 'Мин. 6 символов',
}

const matchPassword = v => v === password.value || 'Пароли не совпадают'

watch(dialog, (open) => {
  if (open) {
    name.value = user.value.name || ''
    email.value = user.value.email || ''
    password.value = ''
    confirmPassword.value = ''
  }
})

const save = () => {
  if (!form.value?.validate()) return

  const updatedUser = {
    ...user.value,
    name: name.value,
    email: email.value,
    
  }

  store.commit('user/setUser', updatedUser)
  dialog.value = false


}
</script>
