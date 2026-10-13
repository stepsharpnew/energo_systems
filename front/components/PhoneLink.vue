<template>
  <a :href="`tel:+${phoneNumber}`">
    <slot><span :id="numberId">{{ formattedNumber }}</span></slot>
  </a>
</template>

<script setup>
defineProps({
  numberId: { type: String, default: undefined },
})

const phoneNumber = useTrackingPhoneNumber()
const formattedNumber = computed(() => phoneNumber.value.replace(
  /^7(\d{3})(\d{3})(\d{2})(\d{2})$/,
  '+7 ($1) $2-$3-$4',
))
</script>
