<template>
  <v-footer
    padless
    
    class="footer"
  >
    <v-container>
      <v-row>
        <!-- Соцсети -->
        <v-col cols="12" md="4" class="footer-section">
          <h3 class="footer-title">Мы в соцсетях</h3>
          <v-btn
            icon
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
          >
            <v-icon size="28">mdi-facebook</v-icon>
          </v-btn>
          <v-btn
            icon
            href="https://twitter.com"
            target="_blank"
            aria-label="Twitter"
          >
            <v-icon size="28">mdi-twitter</v-icon>
          </v-btn>
          <v-btn
            icon
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
          >
            <v-icon size="28">mdi-instagram</v-icon>
          </v-btn>
          <v-btn
            icon
            href="https://linkedin.com"
            target="_blank"
            aria-label="LinkedIn"
          >
            <v-icon size="28">mdi-linkedin</v-icon>
          </v-btn>
        </v-col>

        <!-- Контакты -->
        <v-col cols="12" md="4" class="footer-section">
          <h3 class="footer-title">Контакты</h3>
          <p>
            <v-icon left size="20">mdi-map-marker</v-icon>
            Москва, ул. Медицинская, 12
          </p>
          <p>
            <v-icon left size="20">mdi-email</v-icon>
            <a href="mailto:support@mymedtrainer.com" class="footer-link">
              support@mymedtrainer.com
            </a>
          </p>
          <p>
            <v-icon left size="20">mdi-phone</v-icon>
            +7 (495) 123-45-67
          </p>
        </v-col>

        <!-- Информация -->
        <v-col cols="12" md="4" class="footer-section info-section">
          <h3 class="footer-title">О My Med Trainer</h3>
          <p>
            My Med Trainer — обучающая платформа, которая помогает врачам и студентам
            совершенствовать свои навыки через практические медицинские кейсы.
          </p>
        </v-col>
      </v-row>

      <v-row justify="center" class="footer-bottom">
        <v-col cols="12" class="text-center">
          © {{ new Date().getFullYear() }} My Med Trainer. Все права защищены.
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>

</script>

<style scoped>
.footer {
  background-color: #fff;
  color: #4a4a4a;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem 1rem;
  min-height: 320px;
}

.footer-section {
  margin-bottom: 2rem;
}

.footer-title {
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333333;
  font-size: 1.1rem;
}

.footer-link {
  color: #4a4a4a;
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
  color: #1565c0;
}

.footer-bottom {
  font-size: 0.875rem;
  color: #777777;
  margin-top: 2rem;
}

.v-icon {
  vertical-align: middle;
  color: #1976d2;
}

@media (max-width: 960px) {
  .footer {
    text-align: center;
  }
  .footer-section {
    margin-bottom: 2rem;
  }
  .v-btn {
    margin: 0 4px;
  }
}


</style>
