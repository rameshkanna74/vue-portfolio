<script setup lang="ts">
interface Props {
  variant?: 'card' | 'text' | 'avatar' | 'list';
  count?: number;
  width?: string;
  height?: string;
  shimmer?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'card',
  count: 1,
  width: '100%',
  height: '200px',
  shimmer: true,
});
</script>

<template>
  <div class="skeleton-loader">
    <!-- Card Variant -->
    <div v-if="variant === 'card'" :class="shimmer ? 'skeleton-shimmer' : 'skeleton'" :style="{ width, height }">
      <div class="p-6 space-y-4">
        <div :class="shimmer ? 'skeleton-shimmer' : 'skeleton'" class="h-6 w-3/4" />
        <div :class="shimmer ? 'skeleton-shimmer' : 'skeleton'" class="h-4 w-full" />
        <div :class="shimmer ? 'skeleton-shimmer' : 'skeleton'" class="h-4 w-5/6" />
        <div class="flex gap-2 mt-4">
          <div :class="shimmer ? 'skeleton-shimmer' : 'skeleton'" class="h-8 w-20" />
          <div :class="shimmer ? 'skeleton-shimmer' : 'skeleton'" class="h-8 w-20" />
        </div>
      </div>
    </div>

    <!-- Text Variant -->
    <div v-else-if="variant === 'text'" class="space-y-3">
      <div v-for="i in count" :key="i" :class="shimmer ? 'skeleton-shimmer' : 'skeleton'" class="h-4" :style="{ width }" />
    </div>

    <!-- Avatar Variant -->
    <div v-else-if="variant === 'avatar'" class="flex items-center gap-4">
      <div :class="shimmer ? 'skeleton-shimmer' : 'skeleton'" class="w-16 h-16 rounded-full" />
      <div class="flex-1 space-y-2">
        <div :class="shimmer ? 'skeleton-shimmer' : 'skeleton'" class="h-4 w-1/2" />
        <div :class="shimmer ? 'skeleton-shimmer' : 'skeleton'" class="h-3 w-1/3" />
      </div>
    </div>

    <!-- List Variant -->
    <div v-else-if="variant === 'list'" class="space-y-4">
      <div v-for="i in count" :key="i" class="flex items-center gap-4">
        <div :class="shimmer ? 'skeleton-shimmer' : 'skeleton'" class="w-12 h-12 rounded" />
        <div class="flex-1 space-y-2">
          <div :class="shimmer ? 'skeleton-shimmer' : 'skeleton'" class="h-4 w-3/4" />
          <div :class="shimmer ? 'skeleton-shimmer' : 'skeleton'" class="h-3 w-1/2" />
        </div>
      </div>
    </div>
  </div>
</template>
