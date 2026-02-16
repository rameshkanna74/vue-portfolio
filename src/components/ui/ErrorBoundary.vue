<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue';

const error = ref<Error | null>(null);

onErrorCaptured((err) => {
  error.value = err as Error;
  return false; // Prevent error from propagating further
});

const resetError = () => {
  error.value = null;
};
</script>

<template>
  <div v-if="error" class="p-6 bg-nord-11/10 border border-nord-11 rounded-lg text-center">
    <div class="text-nord-11 text-xl font-bold mb-2">System Error</div>
    <p class="text-nord-4 mb-4 font-mono text-sm">{{ error.message }}</p>
    <button
      @click="resetError"
      class="px-4 py-2 bg-nord-11 text-nord-6 rounded hover:bg-nord-11/90 transition-colors"
    >
      Retry Operation
    </button>
  </div>
  <slot v-else></slot>
</template>
