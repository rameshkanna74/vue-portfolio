<script setup lang="ts">
interface Props {
  variant?: 'default' | 'glass' | 'gradient-border' | 'elevated' | 'flat';
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glow?: boolean;
}

withDefaults(defineProps<Props>(), {
  variant: 'default',
  hover: true,
  padding: 'md',
  glow: false,
});
</script>

<template>
  <div
    class="rounded-lg transition-all duration-300"
    :class="[
      {
        // Default variant
        'bg-nord-1 border border-nord-3 hover:border-nord-8': variant === 'default',
        
        // Glass variant
        'bg-nord-1/80 backdrop-blur-md border border-nord-3/50 hover:bg-nord-1/90 hover:border-nord-8/70': variant === 'glass',
        
        // Gradient border variant
        'gradient-border-animated': variant === 'gradient-border',
        
        // Elevated variant
        'bg-nord-1 border-0 shadow-elevated hover:shadow-elevated-lg': variant === 'elevated',
        
        // Flat variant
        'bg-nord-2 border-0': variant === 'flat',
        
        // Hover effects
        'hover:shadow-glow-md hover:-translate-y-1': hover && variant !== 'elevated',
        'hover:shadow-colored-glow': hover && glow,
      },
      {
        'p-0': padding === 'none',
        'p-4': padding === 'sm',
        'p-6': padding === 'md',
        'p-8': padding === 'lg',
      }
    ]"
  >
    <slot></slot>
  </div>
</template>
