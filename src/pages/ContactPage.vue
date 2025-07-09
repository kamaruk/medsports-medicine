<template>
  <v-container class="contact-container" fluid>
    <!-- Заголовок -->
    <v-row justify="center" class="text-center mb-10">
      <v-col cols="12" md="8">
        <h1 class="contact-title">Свяжитесь с нами</h1>
        <p class="contact-subtitle">
          Если у вас есть вопросы, предложения или вы хотите сотрудничать — заполните форму или напишите напрямую.
        </p>
      </v-col>
    </v-row>

    <!-- Контактная форма и информация -->
    <v-row justify="center" align="stretch" class="gap-6">
      <!-- Форма -->
      <v-col cols="12" md="6">
        <v-card class="pa-6 form-card" elevation="5">
          <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
            <v-text-field
              v-model="formData.name"
              label="Ваше имя"
              :rules="[rules.required]"
            />
            <v-text-field
              v-model="formData.email"
              label="Email"
              :rules="[rules.required, rules.email]"
            />
            <v-textarea
              v-model="formData.message"
              label="Сообщение"
              :rules="[rules.required]"
            />
            <v-btn
              type="submit"
              color="primary"
              class="mt-4 rounded-pill text-white"
              :disabled="!valid"
              block
              size="large"
            >
              Отправить
            </v-btn>
          </v-form>
        </v-card>
      </v-col>

      <!-- Контактная информация -->
      <v-col cols="12" md="4">
        <v-card class="pa-6 contact-info-card" elevation="3">
          <h3 class="text-h6 mb-4 font-weight-bold text-primary">📍 Контактная информация</h3>
          <div class="contact-item">
            <v-icon color="primary" start>mdi-map-marker</v-icon>
            <span>Москва, ул. Медицинская, 12</span>
          </div>
          <div class="contact-item">
            <v-icon color="primary" start>mdi-email-outline</v-icon>
            <span>support@mymedtrainer.com</span>
          </div>
          <div class="contact-item">
            <v-icon color="primary" start>mdi-phone-outline</v-icon>
            <span>+7 (495) 123-45-67</span>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { ref } from 'vue'


  const form = ref(null)
  const valid = ref(false)

  const formData = ref({
    name: '',
    email: '',
    message: '',
  })
  const rules = {
    required: v => !!v || 'Обязательное поле',
    email: v => /^\S+@\S+\.\S+$/.test(v) || 'Некорректный email',
  }

  const submitForm = () => {
    if (!form.value.validate()) {
      alert('Пожалуйста, заполните все поля.')
      return
    }

    alert('Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.')
    console.log('Форма отправлена:', formData.value)

    formData.value = { name: '', email: '', message: '' }
    form.value.resetValidation()
  }

</script>

<style scoped>
.contact-container {
  padding-top: 4rem;
  padding-bottom: 6rem;
  background: linear-gradient(135deg, #e3f2fd 0%, #f0f8ff 100%);
}

.contact-title {
  font-size: 2.8rem;
  font-weight: 800;
  color: #0d47a1;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.contact-subtitle {
  font-size: 1.1rem;
  color: #555;
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.6;
}

.form-card {
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 6px 20px rgba(13, 71, 161, 0.1);
}

.contact-info-card {
  border-radius: 16px;
  background: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 50, 100, 0.08);
}

.contact-item {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #333;
}

.contact-item v-icon {
  margin-right: 8px;
}
</style>
