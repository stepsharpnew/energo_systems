<template>
  <transition name="modal-fade">
    <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <button class="modal-close" type="button" @click="$emit('close')">
          ×
        </button>
        <div class="modal-body">
          <p class="section-kicker">Обратная связь</p>
          <h2>Заполните форму</h2>
          <p class="modal-description">Мы свяжемся с вами в ближайшее время</p>

          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-group">
              <label for="name">Имя *</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                placeholder="Введите ваше имя"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="phone">Номер телефона *</label>
              <input
                id="phone"
                :value="formData.phone"
                type="tel"
                required
                placeholder="+7 (___) ___-__-__"
                class="form-input"
                @input="formatPhone"
                @keydown="handlePhoneKeydown"
                maxlength="18"
              />
            </div>

            <div class="form-group">
              <label for="service">Выберите услугу *</label>
              <select
                id="service"
                v-model="formData.service"
                required
                class="form-select"
              >
                <option value="" disabled>Выберите услугу</option>
                <option
                  v-for="service in services"
                  :key="service.id"
                  :value="service.id"
                >
                  {{ service.name }}
                </option>
              </select>
            </div>

            <button
              type="submit"
              class="submit-button"
              :disabled="isSubmitting"
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
import { handlePhoneKeydown } from "../../utils/phoneFormatter";

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
  },
  emits: ["close"],
  data() {
    return {
      formData: {
        name: "",
        phone: "",
        service: "",
      },
      isSubmitting: false,
    };
  },
  watch: {
    show(newVal) {
      if (newVal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
        this.resetForm();
      }
    },
  },
  beforeUnmount() {
    document.body.style.overflow = "";
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
    handleSubmit() {
      this.isSubmitting = true;

      // Здесь можно добавить отправку данных на сервер
      console.log("Form data:", this.formData);

      // Имитация отправки
      setTimeout(() => {
        this.isSubmitting = false;
        alert("Спасибо! Мы свяжемся с вами в ближайшее время.");
        this.$emit("close");
        this.resetForm();
      }, 1000);
    },
    resetForm() {
      this.formData = {
        name: "",
        phone: "",
        service: "",
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
}

.modal-body {
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

.modal-body {
  padding: clamp(24px, 5vw, 48px);
  color: #e2e8f0;
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

.form-input,
.form-select {
  width: 100%;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  transition: all 0.3s ease;
  outline: none;
}

.form-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.form-input:focus,
.form-select:focus {
  background: rgba(255, 255, 255, 0.12);
  border-color: #ef4422;
  box-shadow: 0 0 0 3px rgba(239, 68, 34, 0.1);
}

.form-select {
  cursor: pointer;
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
  background: linear-gradient(135deg, #ef4422, #ff6934);
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
  box-shadow: 0 12px 24px rgba(239, 68, 34, 0.4);
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
