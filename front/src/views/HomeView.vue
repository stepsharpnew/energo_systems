<template>
  <div class="home">
    <EnergySystems />
  </div>
</template>

<script>
// @ is an alias to /src
import EnergySystems from '@/components/EnergySystems.vue'

export default {
  name: 'HomeView',
  components: {
    EnergySystems
  }
}
</script>
