<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useAnalytics } from '../../composables/useAnalytics';

const { trackEvent } = useAnalytics();

const email = ref('');
const isSubmitting = ref(false);
const submitStatus = ref<'idle' | 'success' | 'error'>('idle');

async function handleSubscribe() {
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    submitStatus.value = 'error';
    setTimeout(() => submitStatus.value = 'idle', 3000);
    return;
  }

  isSubmitting.value = true;
  submitStatus.value = 'idle';

  try {
    trackEvent('newsletter_subscribe', { source: 'footer' });
    
    // TODO: Integrate with newsletter service
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    submitStatus.value = 'success';
    email.value = '';
    
    setTimeout(() => submitStatus.value = 'idle', 5000);
  } catch (error) {
    submitStatus.value = 'error';
    setTimeout(() => submitStatus.value = 'idle', 3000);
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="newsletter-signup bg-gradient-to-br from-nord-3/20 to-nord-8/10 rounded-xl p-6 border border-nord-3/30">
    <div class="flex items-center gap-3 mb-3">
      <div class="flex items-center justify-center w-10 h-10 bg-nord-8/20 rounded-lg">
        <Icon icon="mdi:email-newsletter" class="w-5 h-5 text-nord-8" />
      </div>
      <div>
        <h3 class="text-lg font-semibold text-nord-6">Stay Updated</h3>
        <p class="text-xs text-nord-4">Get tips & resources monthly</p>
      </div>
    </div>

    <form @submit.prevent="handleSubscribe" class="space-y-3">
      <div class="relative">
        <input
          v-model="email"
          type="email"
          required
          placeholder="your@email.com"
          :disabled="isSubmitting"
          class="w-full px-4 py-2.5 bg-nord-1/50 border border-nord-3/50 rounded-lg text-nord-6 placeholder-nord-4/50 focus:outline-none focus:border-nord-8 focus:ring-2 focus:ring-nord-8/20 transition-all font-mono text-sm disabled:opacity-50"
        />
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full px-4 py-2.5 bg-nord-8 text-nord-0 rounded-lg font-semibold text-sm transition-all duration-300 hover:bg-nord-9 hover:shadow-glow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Icon v-if="!isSubmitting" icon="mdi:send" class="w-4 h-4" />
        <Icon v-else icon="mdi:loading" class="w-4 h-4 animate-spin" />
        <span>{{ isSubmitting ? 'Subscribing...' : 'Subscribe' }}</span>
      </button>

      <!-- Status messages -->
      <Transition name="fade">
        <div v-if="submitStatus === 'success'" class="text-terminal-green text-xs font-mono flex items-center gap-1">
          <Icon icon="mdi:check-circle" class="w-4 h-4" />
          <span>Subscribed! Check your email.</span>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="submitStatus === 'error'" class="text-nord-11 text-xs font-mono flex items-center gap-1">
          <Icon icon="mdi:alert-circle" class="w-4 h-4" />
          <span>Invalid email. Try again.</span>
        </div>
      </Transition>
    </form>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
