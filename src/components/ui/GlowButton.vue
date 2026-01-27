<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost' | 'gradient';
  loading?: boolean;
  disabled?: boolean;
  shimmer?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  loading: false,
  disabled: false,
  shimmer: true,
});

const variantClasses = {
  primary: 'bg-nord-10 hover:bg-nord-9 text-nord-6 shadow-glow-sm hover:shadow-glow-md',
  secondary: 'bg-nord-3 hover:bg-nord-2 text-nord-4 border border-nord-3',
  success: 'bg-nord-14 hover:bg-nord-14/90 text-nord-0 shadow-glow-sm',
  danger: 'bg-nord-11 hover:bg-nord-11/90 text-nord-6 shadow-glow-sm',
  ghost: 'bg-transparent hover:bg-nord-3/30 text-nord-4 border border-nord-3/50 hover:border-nord-8/50',
  gradient: 'bg-gradient-to-r from-nord-10 via-nord-9 to-nord-8 text-nord-6 shadow-colored-glow',
};

const showRipple = ref(false);
const rippleX = ref(0);
const rippleY = ref(0);

const handleClick = (event: MouseEvent) => {
  if (props.disabled || props.loading) return;

  const button = event.currentTarget as HTMLButtonElement;
  const rect = button.getBoundingClientRect();
  
  rippleX.value = event.clientX - rect.left;
  rippleY.value = event.clientY - rect.top;
  
  showRipple.value = true;
  setTimeout(() => {
    showRipple.value = false;
  }, 600);
};
</script>

<template>
  <button
    class="glow-button relative overflow-hidden group"
    :class="[
      variantClasses[variant],
      { 'opacity-50 cursor-not-allowed': disabled || loading }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Shimmer Effect -->
    <span 
      v-if="shimmer && !disabled && !loading" 
      class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"
    />
    
    <!-- Ripple Effect -->
    <span
      v-if="showRipple"
      class="absolute rounded-full bg-white/30 animate-ping"
      :style="{
        left: `${rippleX}px`,
        top: `${rippleY}px`,
        width: '20px',
        height: '20px',
        transform: 'translate(-50%, -50%)',
      }"
    />
    
    <!-- Content -->
    <span class="relative z-10 flex items-center justify-center gap-2">
      <Icon v-if="loading" icon="mdi:loading" class="w-5 h-5 animate-spin" />
      <slot></slot>
    </span>
  </button>
</template>
