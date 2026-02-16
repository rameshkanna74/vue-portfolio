<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useAnalytics } from '../../composables/useAnalytics';

const { trackEvent } = useAnalytics();

const email = ref('');
const isSubmitting = ref(false);
const submitStatus = ref<'idle' | 'success' | 'error'>('idle');
const statusMessage = ref('');

async function handleSubscribe() {
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    submitStatus.value = 'error';
    statusMessage.value = 'Please enter a valid email address';
    return;
  }

  isSubmitting.value = true;
  submitStatus.value = 'idle';

  try {
    // Track newsletter signup
    trackEvent('newsletter_signup', { source: 'lead_magnet' });

    // In production, send to your backend or newsletter service
    // For now, just simulate success
    await new Promise(resolve => setTimeout(resolve, 1000));

    // TODO: Integrate with newsletter service (Mailchimp, ConvertKit, etc.)
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter/`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: email.value })
    // });

    submitStatus.value = 'success';
    statusMessage.value = 'Success! Check your email for the download link.';
    email.value = '';
    
  } catch (error) {
    console.error('Newsletter signup error:', error);
    submitStatus.value = 'error';
    statusMessage.value = 'Something went wrong. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
  <div class="lead-magnet-popup glassmorphism-card rounded-2xl p-8 border border-nord-8/30 max-w-2xl mx-auto">
    <!-- Header -->
    <div class="text-center mb-6">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-nord-8 to-nord-9 rounded-full mb-4">
        <Icon icon="mdi:file-document-download" class="w-8 h-8 text-nord-0" />
      </div>
      <h3 class="text-2xl font-bold text-nord-6 mb-2">
        Free Developer Toolkit
      </h3>
      <p class="text-nord-4 text-sm">
        Get my curated list of tools, libraries, and resources I use for every project
      </p>
    </div>

    <!-- What's Included -->
    <div class="bg-nord-1/50 rounded-lg p-6 mb-6 border border-nord-3/30">
      <h4 class="text-sm font-semibold text-nord-6 mb-3 flex items-center gap-2">
        <Icon icon="mdi:package-variant" class="w-4 h-4 text-nord-8" />
        What's Inside:
      </h4>
      <ul class="space-y-2 text-sm text-nord-4">
        <li class="flex items-start gap-2">
          <Icon icon="mdi:check-circle" class="w-4 h-4 text-terminal-green mt-0.5 flex-shrink-0" />
          <span>50+ Essential VS Code Extensions for productivity</span>
        </li>
        <li class="flex items-start gap-2">
          <Icon icon="mdi:check-circle" class="w-4 h-4 text-terminal-green mt-0.5 flex-shrink-0" />
          <span>Frontend & Backend boilerplate templates</span>
        </li>
        <li class="flex items-start gap-2">
          <Icon icon="mdi:check-circle" class="w-4 h-4 text-terminal-green mt-0.5 flex-shrink-0" />
          <span>API testing & debugging tools checklist</span>
        </li>
        <li class="flex items-start gap-2">
          <Icon icon="mdi:check-circle" class="w-4 h-4 text-terminal-green mt-0.5 flex-shrink-0" />
          <span>Performance optimization resources</span>
        </li>
        <li class="flex items-start gap-2">
          <Icon icon="mdi:check-circle" class="w-4 h-4 text-terminal-green mt-0.5 flex-shrink-0" />
          <span>Code snippet library for common patterns</span>
        </li>
      </ul>
    </div>

    <!-- Email Capture Form -->
    <form @submit.prevent="handleSubscribe" class="space-y-4">
      <div>
        <label for="lead-email" class="sr-only">Email address</label>
        <div class="relative">
          <Icon icon="mdi:email" class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nord-4" />
          <input
            id="lead-email"
            v-model="email"
            type="email"
            required
            placeholder="Enter your email address"
            class="w-full pl-12 pr-4 py-3 bg-nord-2/50 border border-nord-3/50 rounded-lg text-nord-6 placeholder-nord-4/50 focus:outline-none focus:border-nord-8 focus:ring-2 focus:ring-nord-8/20 transition-all font-mono text-sm"
            :disabled="isSubmitting"
          />
        </div>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full px-6 py-3 bg-gradient-to-r from-terminal-green to-nord-8 text-nord-0 rounded-lg font-semibold transition-all duration-300 hover:shadow-glow-md hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Icon v-if="!isSubmitting" icon="mdi:download" class="w-5 h-5" />
        <Icon v-else icon="mdi:loading" class="w-5 h-5 animate-spin" />
        <span>{{ isSubmitting ? 'Sending...' : 'Get Free Toolkit' }}</span>
      </button>

      <!-- Status Messages -->
      <Transition name="fade">
        <div v-if="submitStatus === 'success'" class="flex items-center gap-2 p-3 bg-nord-14/10 border border-nord-14/30 rounded-lg text-nord-14 text-sm">
          <Icon icon="mdi:check-circle" class="w-5 h-5 flex-shrink-0" />
          <span>{{ statusMessage }}</span>
        </div>
      </Transition>

      <Transition name="fade">
        <div v-if="submitStatus === 'error'" class="flex items-center gap-2 p-3 bg-nord-11/10 border border-nord-11/30 rounded-lg text-nord-11 text-sm">
          <Icon icon="mdi:alert-circle" class="w-5 h-5 flex-shrink-0" />
          <span>{{ statusMessage }}</span>
        </div>
      </Transition>
    </form>

    <!-- Privacy Note -->
    <p class="text-xs text-nord-4/60 text-center mt-4 font-mono">
      🔒 No spam. Unsubscribe anytime. Your privacy matters.
    </p>
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
  transform: translateY(-10px);
}
</style>
