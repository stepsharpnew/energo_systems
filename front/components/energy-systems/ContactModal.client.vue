<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div ref="dialogPanel" class="modal-window" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" tabindex="-1">
        <button class="modal-close" type="button" aria-label="Закрыть форму" @click="$emit('close')">
          ×
        </button>
        <div class="modal-body">
          <p class="section-kicker">Обратная связь</p>
          <h2 id="contact-modal-title" ref="dialogTitle" tabindex="-1">Заполните форму</h2>
          <p class="modal-description">Учтём ваши пожелания по времени звонка</p>

          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <label for="name">Имя *</label>
              <input
                id="name"
                name="name"
                v-model="formData.name"
                type="text"
                required
                autocomplete="name"
                minlength="2"
                maxlength="80"
                placeholder="Введите ваше имя"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="phone">Номер телефона *</label>
              <input
                id="phone"
                name="phone"
                :value="formData.phone"
                type="tel"
                required
                autocomplete="tel"
                placeholder="+7 (___) ___-__-__"
                class="form-input"
                @input="formatPhone"
                @keydown="handlePhoneKeydown"
                maxlength="18"
                pattern="\+7 \(\d{3}\)-\d{3}-\d{2}-\d{2}"
              />
            </div>

            <CallbackPreferences v-model="formData.callbackPreferences" dark />

            <div class="form-group">
              <label for="email">Email для обратной связи</label>
              <input
                id="email"
                name="email"
                v-model.trim="formData.email"
                type="email"
                autocomplete="email"
                placeholder="name@example.com"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="service">Выберите услугу *</label>
              <select id="service" ref="serviceSelect" v-model="formData.service" name="service" class="form-select" required>
                <option disabled value="">Выберите услугу</option>
                <option v-for="service in services" :key="service.id" :value="service.id">{{ service.name }}</option>
              </select>
            </div>

            <div class="consent-block">
              <label class="consent-check">
                <input
                  v-model="formData.consent"
                  name="consent"
                  type="checkbox"
                  required
                />
                <span>
                  Даю ООО «Энергосистемы»
                  <a href="/personal-data-consent" target="_blank" rel="noopener">согласие на обработку персональных данных</a>
                  для ответа на заявку.
                </span>
              </label>
              <p>
                Порядок обработки и права пользователя описаны в
                <a href="/privacy" target="_blank" rel="noopener">Политике обработки персональных данных</a>.
              </p>
            </div>

            <button
              type="submit"
              class="submit-button"
              :disabled="isSubmitting || !formData.consent"
            >
              <span v-if="!isSubmitting">Отправить</span>
              <span v-else>Отправка...</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { ref, toRef } from "vue";
import { useModalAccessibility } from "~/composables/useModalAccessibility.js";
import { emptyCallbackPreferences, getCallbackPreferences } from "~/lib/browser/callbackPreferences.js";
import { getLeadAttribution } from "~/utils/attribution";
import { handlePhoneKeydown } from "~/utils/phoneFormatter";

export default {
  name: "ContactModal",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    services: {
      type: Array,
      default: () => [],
    },
    selectedServiceId: {
      type: [String, Number],
      default: null,
    },
  },
  emits: ["close"],
  setup(props, { emit }) {
    const dialogPanel = ref(null), dialogTitle = ref(null);
    useModalAccessibility(dialogPanel, toRef(props, "show"), () => emit("close"), { initialFocus: dialogTitle });
    return { dialogPanel, dialogTitle };
  },
  data() {
    return {
      formData: {
        name: "",
        phone: "",
        callbackPreferences: emptyCallbackPreferences(),
        email: "",
        service: "",
        consent: false,
      },
      consentVersion: "2026-07-13",
      isSubmitting: false,
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(newVal) {
        if (newVal && this.selectedServiceId) this.formData.service = this.selectedServiceId;
      },
    },
    selectedServiceId(newVal) {
      // Обновляем выбранную услугу при изменении пропа
      if (newVal && this.show) {
        this.formData.service = newVal;
      }
    },
  },
  methods: {
    formatPhone(event) {
      const input = event.target;
      const value = input.value;
      const cursorPosition = input.selectionStart;
      const oldLength = value.length;

      const formatted = this.formatPhoneNumber(value);
      const newLength = formatted.length;

      // Сразу обновляем значение в input для мгновенной реакции
      input.value = formatted;

      // Обновляем Vue модель
      this.formData.phone = formatted;

      // Восстанавливаем позицию курсора
      this.$nextTick(() => {
        let newCursorPosition = cursorPosition;

        // Если текст был удален, курсор остается на месте
        if (newLength < oldLength) {
          newCursorPosition = Math.min(cursorPosition, formatted.length);
        } else {
          // Если текст был добавлен, курсор перемещается вперед
          const digitsBeforeCursor = value
            .slice(0, cursorPosition)
            .replace(/\D/g, "").length;
          let position = 0;
          let digitCount = 0;

          for (
            let i = 0;
            i < formatted.length && digitCount < digitsBeforeCursor;
            i++
          ) {
            if (/\d/.test(formatted[i])) {
              digitCount++;
            }
            position = i + 1;
          }

          newCursorPosition = position;
        }

        input.setSelectionRange(newCursorPosition, newCursorPosition);
      });
    },
    formatPhoneNumber(value) {
      // Удаляем все нецифровые символы
      let digits = value.replace(/\D/g, "");

      // Обработка начала ввода
      if (digits.length > 0) {
        // Если начинается с 8, заменяем на 7
        if (digits[0] === "8") {
          digits = "7" + digits.slice(1);
        }
        // Если начинается с 7, оставляем как есть
        // Если начинается с 9 или другой цифры, добавляем 7 в начало
        else if (digits[0] !== "7") {
          digits = "7" + digits;
        }
      }

      // Ограничиваем до 11 цифр (7 + 10 цифр номера)
      if (digits.length > 11) {
        digits = digits.slice(0, 11);
      }

      // Форматируем в формат +7 (XXX)-XXX-XX-XX
      let formatted = "";
      if (digits.length > 0) {
        formatted = "+7";
        if (digits.length > 1) {
          formatted += " (" + digits.slice(1, 4);
          if (digits.length > 4) {
            formatted += ")-" + digits.slice(4, 7);
            if (digits.length > 7) {
              formatted += "-" + digits.slice(7, 9);
              if (digits.length > 9) {
                formatted += "-" + digits.slice(9, 11);
              }
            }
          } else if (digits.length > 1) {
            formatted += ")";
          }
        }
      }

      return formatted;
    },
    handlePhoneKeydown,
    async handleSubmit(event) {
      if (!this.formData.service) {
        this.$refs.serviceSelect?.focus();
        return;
      }

      this.isSubmitting = true;

      try {
        const selectedService = this.services.find(
          (s) => s.id === this.formData.service
        );

        const payload = {
          attribution: getLeadAttribution(),
          type: "service",
          name: this.formData.name,
          contact: this.formData.phone,
          callbackPreferences: getCallbackPreferences(this.formData.phone, this.formData.callbackPreferences),
          email: this.formData.email || undefined,
          service: selectedService ? selectedService.name : undefined,
          consent: this.formData.consent,
          consentVersion: this.consentVersion,
        };

        const response = await $fetch("/api/lead", {
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response?.ok !== true) throw new Error("Заявка не подтверждена сервером");

        alert("Спасибо! Ваша заявка отправлена. Учтём ваши пожелания по времени звонка.");
        this.$emit("close");
        this.resetForm();
      } catch (error) {
        console.error("Ошибка при отправке заявки на email:", error);
        alert("Произошла ошибка при отправке заявки. Попробуйте еще раз позже.");
      } finally {
        this.isSubmitting = false;
      }
    },
    resetForm() {
      this.formData = {
        name: "",
        phone: "",
        callbackPreferences: emptyCallbackPreferences(),
        email: "",
        service: "",
        consent: false,
      };
      this.isSubmitting = false;
    },

  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(8, 13, 34, 0.65);
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 9999;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}

.modal-window {
  background: #0f172a;
  width: min(600px, 95vw);
  max-height: calc(100vh - 40px);
  border-radius: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.45);
  margin: auto;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
}

.modal-body {
  flex: 1;
  padding: clamp(24px, 5vw, 48px);
  color: #e2e8f0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.section-kicker {
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
  margin-bottom: 12px;
}

.modal-body h2 {
  margin: 6px 0 14px;
  color: #fff;
  font-size: clamp(24px, 3vw, 32px);
}

.modal-description {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 32px;
  font-size: 15px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  color: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  font-weight: 500;
}

.consent-block {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
}

.consent-check {
  display: grid;
  grid-template-columns: 20px 1fr;
  align-items: start;
  gap: 10px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  line-height: 1.5;
  cursor: pointer;
}

.consent-check input {
  width: 18px;
  height: 18px;
  margin: 2px 0 0;
  accent-color: #ff4800;
}

.consent-block p {
  margin: 0 0 0 30px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 12px;
  line-height: 1.5;
}

.consent-block a {
  color: #ff9a72;
}

.consent-block a:hover {
  color: #fff;
}

.form-input,
.form-select {
  width: 100%;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  outline: none;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-input:focus-visible,
.form-select:focus-visible {
  background: rgba(255, 255, 255, 0.12);
  border-color: #ff9a72;
  outline: 2px solid #ff9a72;
  outline-offset: 2px;
}

.form-select {
  cursor: pointer;
  color-scheme: dark;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23ffffff' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 18px center;
  padding-right: 40px;
}

.form-select option {
  background: #0f172a;
  color: #fff;
}


.submit-button {
  margin-top: 8px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #c94218, #b63812);
  border: none;
  border-radius: 16px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.submit-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(255, 72, 0, 0.4);
}

.submit-button:active:not(:disabled) {
  transform: translateY(0);
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.modal-close {
  position: absolute;
  top: 18px;
  right: 18px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  transition: background 0.3s ease;
  z-index: 1;
}

.modal-close:focus-visible,
.submit-button:focus-visible { outline: 2px solid #ff9a72; outline-offset: 3px; }

.modal-close:hover {
  background: rgba(255, 255, 255, 0.35);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .modal-window {
    width: 95vw;
    max-height: 95vh;
  }

  .modal-body {
    padding: 32px 24px;
  }

  .contact-form {
    gap: 20px;
  }
}
</style>
