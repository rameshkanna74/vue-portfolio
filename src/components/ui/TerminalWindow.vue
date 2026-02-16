<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  title?: string;
  closable?: boolean;
  draggable?: boolean;
  fullHeight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Terminal',
  closable: false,
  draggable: false,
  fullHeight: false,
});

const emit = defineEmits<{
  close: [];
}>();

const handleClose = () => {
  if (props.closable) {
    emit('close');
  }
};

const containerClass = computed(() => ({
  'h-full': props.fullHeight,
}));
</script>

<template>
  <div class="terminal-window" :class="containerClass">
    <div class="terminal-header">
      <div class="flex items-center gap-2">
        <div class="terminal-controls">
          <div
            class="terminal-control terminal-control-close"
            :class="{ 'cursor-pointer hover:scale-125': closable }"
            @click="handleClose"
          ></div>
          <div class="terminal-control terminal-control-minimize"></div>
          <div class="terminal-control terminal-control-maximize"></div>
        </div>
        <span class="terminal-title">{{ title }}</span>
      </div>
    </div>
    
    <div class="terminal-content">
      <slot></slot>
    </div>
  </div>
</template>
