/**
 * Форматирует номер телефона в формат +7 (XXX)-XXX-XX-XX
 * @param {string} value - Входное значение
 * @returns {string} - Отформатированный номер телефона
 */
export function formatPhoneNumber(value) {
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
}

/**
 * Обработчик события input для поля телефона
 * @param {Event} event - Событие input
 * @param {Function} setValue - Функция для установки значения (например, v-model)
 * @returns {void}
 */
export function handlePhoneInput(event, setValue) {
  const input = event.target;
  const value = input.value;
  const cursorPosition = input.selectionStart;
  const oldLength = value.length;

  const formatted = formatPhoneNumber(value);
  const newLength = formatted.length;

  // Сразу обновляем значение в input для мгновенной реакции
  input.value = formatted;

  // Устанавливаем значение в Vue модель
  if (setValue) {
    setValue(formatted);
  }

  // Восстанавливаем позицию курсора
  requestAnimationFrame(() => {
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
}

/**
 * Обработчик события keydown для поля телефона
 * Разрешает только цифры и служебные клавиши
 * @param {KeyboardEvent} event - Событие keydown
 * @returns {void}
 */
export function handlePhoneKeydown(event) {
  // Разрешаем: Backspace, Delete, Tab, Escape, Enter, стрелки
  const allowedKeys = [
    "Backspace",
    "Delete",
    "Tab",
    "Escape",
    "Enter",
    "ArrowLeft",
    "ArrowRight",
    "ArrowUp",
    "ArrowDown",
    "Home",
    "End",
  ];

  // Разрешаем Ctrl/Cmd + A, C, V, X
  if (event.ctrlKey || event.metaKey) {
    if (["a", "c", "v", "x"].includes(event.key.toLowerCase())) {
      return;
    }
  }

  if (allowedKeys.includes(event.key)) {
    return;
  }

  // Разрешаем только цифры
  if (!/^\d$/.test(event.key)) {
    event.preventDefault();
  }
}
