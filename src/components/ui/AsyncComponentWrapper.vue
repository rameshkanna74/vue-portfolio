<script setup lang="ts">
import { defineAsyncComponent, type Component } from 'vue';
import LoadingSpinner from './LoadingSpinner.vue'; // We need to create this or use a placeholder
import ErrorBoundary from './ErrorBoundary.vue';

const props = defineProps<{
  loader: () => Promise<Component>;
}>();

const AsyncComp = defineAsyncComponent({
  loader: props.loader,
  loadingComponent: LoadingSpinner,
  delay: 200,
  timeout: 3000,
});
</script>

<template>
  <ErrorBoundary>
    <AsyncComp v-bind="$attrs" />
  </ErrorBoundary>
</template>
