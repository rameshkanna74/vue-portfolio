<script setup lang="ts">
import{ ref, computed, onMounted } from 'vue';
import gsap from 'gsap';
import { Icon } from '@iconify/vue';
import { usePortfolioStore } from '../stores/portfolio';
import { useGsapAnimations } from '../composables/useGsapAnimations';
import { useSEO } from '../composables/useSEO';
import { useAnalytics } from '../composables/useAnalytics';
import GlowButton from '../components/ui/GlowButton.vue';

const portfolioStore = usePortfolioStore();
const { slideUp } = useGsapAnimations();
const { trackEvent } = useAnalytics();

useSEO({
  title: 'Contact Me | Ramesh Kanna',
  description: 'Get in touch for collaborations, freelance opportunities, or just to say hi.',
});

const profile = computed(() => portfolioStore.portfolioData.profile);

const headerRef = ref<HTMLElement | null>(null);
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: '',
});

const touched = ref({
  name: false,
  email: false,
  subject: false,
  message: false,
});

const isSubmitting = ref(false);
const submitStatus = ref<'idle' | 'success' | 'error'>('idle');
const statusMessage = ref('');

// Validation rules
const errors = computed(() => ({
  name: touched.value.name && !formData.value.name ? 'Name is required' : '',
  email: touched.value.email && !formData.value.email 
    ? 'Email is required' 
    : touched.value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)
    ? 'Invalid email format'
    : '',
  subject: touched.value.subject && !formData.value.subject ? 'Subject is required' : '',
  message: touched.value.message && !formData.value.message 
    ? 'Message is required' 
    : touched.value.message && formData.value.message.length < 10
    ? 'Message must be at least 10 characters'
    : '',
}));

const isValid = computed(() => {
  return formData.value.name && 
         formData.value.email && 
         /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email) &&
         formData.value.subject && 
         formData.value.message.length >= 10;
});

function markTouched(field: keyof typeof touched.value) {
  touched.value[field] = true;
}

async function handleSubmit() {
  // Mark all fields as touched
  Object.keys(touched.value).forEach(key => {
    touched.value[key as keyof typeof touched.value] = true;
  });

  if (!isValid.value) {
    // Shake animation for invalid form
    const form = document.querySelector('.contact-form');
    if (form) {
      gsap.fromTo(form, 
        { x: -10 },
        { x: 10, duration: 0.1, repeat: 3, yoyo: true, ease: 'power1.inOut', onComplete: () => {
          gsap.set(form, { x: 0 });
        }}
      );
    }
    return;
  }

  isSubmitting.value = true;
  submitStatus.value = 'idle';
  
  try {
    // Get API URL from environment variable
    const apiUrl = import.meta.env.VITE_API_URL || '';
    
    if (!apiUrl) {
      throw new Error('API URL not configured. Please set VITE_API_URL environment variable.');
    }
    
    // Send request to Django backend
    const response = await fetch(`${apiUrl}/api/contact/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData.value),
      // Include credentials if your Django backend requires it
      // credentials: 'include'
    });
    
    if (response.ok) {
      submitStatus.value = 'success';
      statusMessage.value = 'Message sent successfully! I\'ll get back to you soon.';
      formData.value = { name: '', email: '', subject: '', message: '' };
      touched.value = { name: false, email: false, subject: false, message: false };
      
      // Track successful submission
      trackEvent('contact_form_submit', {
        subject: formData.value.subject,
        success: true
      });
      
      // Animate success message
      setTimeout(() => {
        const successMsg = document.querySelector('.success-message');
        if (successMsg) {
          gsap.fromTo(successMsg,
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
          );
        }
      }, 50);
    } else {
      // Handle HTTP errors
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }
  } catch (error) {
    console.error('Contact form error:', error);
    submitStatus.value = 'error';
    
    // Provide helpful error messages
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      statusMessage.value = 'Backend not configured. Please email me directly at rameshkanna788@gmail.com';
    } else if (error instanceof TypeError && error.message.includes('fetch')) {
      statusMessage.value = 'Cannot connect to server. Please check if Django backend is running or email me at rameshkanna788@gmail.com';
    } else {
      statusMessage.value = 'Failed to send message. Please try again or email me directly at rameshkanna788@gmail.com';
    }
    
    // Animate error message
    setTimeout(() => {
      const errorMsg = document.querySelector('.error-message');
      if (errorMsg) {
        gsap.fromTo(errorMsg,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.7)' }
        );
      }
    }, 50);
  } finally {
    isSubmitting.value = false;
  }
}


onMounted(() => {
  if (headerRef.value) {
    slideUp(headerRef.value);
  }
});
</script>

<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-12">
        <h1 class="text-5xl font-bold text-nord-6 mb-4">
          <span class="text-gradient-premium">Get In Touch</span>
        </h1>
        <p class="text-nord-4 font-mono text-lg flex items-center justify-center gap-2">
          <Icon icon="mdi:email-fast" class="w-5 h-5 text-nord-8" />
          <span class="text-terminal-green">$</span> echo "Let's connect!"
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Contact Info -->
        <div class="space-y-6">
          <div class="relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-6 transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-8/70 hover:shadow-glow-md group">
            <div class="absolute inset-0 bg-gradient-to-br from-nord-8/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div class="relative z-10 space-y-4">
              <h3 class="text-lg font-semibold text-nord-6 mb-4 flex items-center gap-2">
                <Icon icon="mdi:information" class="w-5 h-5 text-nord-8" />
                Contact Information
              </h3>
              
              <div class="space-y-4">
                <a :href="`mailto:${profile.email}`" class="group/link flex items-center gap-3 text-nord-4 hover:text-nord-8 transition-all duration-200 p-2 rounded-lg hover:bg-nord-2/50">
                  <Icon icon="mdi:email" class="w-5 h-5 text-nord-8 group-hover/link:scale-110 transition-transform" />
                  <span class="text-sm break-all">{{ profile.email }}</span>
                </a>
                
                <a :href="`tel:${profile.phone}`" class="group/link flex items-center gap-3 text-nord-4 hover:text-nord-8 transition-all duration-200 p-2 rounded-lg hover:bg-nord-2/50">
                  <Icon icon="mdi:phone" class="w-5 h-5 text-nord-8 group-hover/link:scale-110 transition-transform" />
                  <span class="text-sm">{{ profile.phone }}</span>
                </a>
                
                <div class="flex items-center gap-3 text-nord-4 p-2">
                  <Icon icon="mdi:map-marker" class="w-5 h-5 text-nord-8" />
                  <span class="text-sm">{{ profile.location }}</span>
                </div>
              </div>
              
              <div class="pt-4 border-t border-nord-3/30">
                <h4 class="text-sm font-semibold text-nord-6 mb-3 flex items-center gap-2">
                  <Icon icon="mdi:link-variant" class="w-4 h-4 text-nord-10" />
                  Social Links
                </h4>
                <div class="space-y-2">
                  <a :href="profile.links.github" target="_blank" rel="noopener noreferrer" class="group/link flex items-center gap-3 text-nord-4 hover:text-nord-8 transition-all duration-200 p-2 rounded-lg hover:bg-nord-2/50">
                    <Icon icon="mdi:github" class="w-5 h-5 text-nord-8 group-hover/link:scale-110 group-hover/link:rotate-12 transition-all" />
                    <span class="text-sm">GitHub</span>
                    <Icon icon="mdi:open-in-new" class="w-3 h-3 ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                  <a :href="profile.links.linkedin" target="_blank" rel="noopener noreferrer" class="group/link flex items-center gap-3 text-nord-4 hover:text-nord-8 transition-all duration-200 p-2 rounded-lg hover:bg-nord-2/50">
                    <Icon icon="mdi:linkedin" class="w-5 h-5 text-nord-8 group-hover/link:scale-110 group-hover/link:rotate-12 transition-all" />
                    <span class="text-sm">LinkedIn</span>
                    <Icon icon="mdi:open-in-new" class="w-3 h-3 ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                  <a :href="profile.links.leetcode" target="_blank" rel="noopener noreferrer" class="group/link flex items-center gap-3 text-nord-4 hover:text-nord-8 transition-all duration-200 p-2 rounded-lg hover:bg-nord-2/50">
                    <Icon icon="mdi:code-braces-box" class="w-5 h-5 text-nord-8 group-hover/link:scale-110 group-hover/link:rotate-12 transition-all" />
                    <span class="text-sm">LeetCode</span>
                    <Icon icon="mdi:open-in-new" class="w-3 h-3 ml-auto opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="relative overflow-hidden rounded-lg bg-nord-1/80 backdrop-blur-md border border-nord-3/50 p-6 transition-all duration-300 hover:bg-nord-1/90 hover:border-nord-14/70 hover:shadow-glow-md group">
            <div class="absolute inset-0 bg-gradient-to-br from-nord-14/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div class="relative z-10">
              <h3 class="text-lg font-semibold text-nord-6 mb-3 flex items-center gap-2">
                <Icon icon="mdi:calendar-check" class="w-5 h-5 text-nord-14" />
                Availability
              </h3>
              <p class="text-nord-4 text-sm leading-relaxed">
                I'm currently open to new opportunities and collaborations. Feel free to reach out!
              </p>
            </div>
          </div>
        </div>
        
        <!-- Contact Form -->
        <div class="glassmorphism-card rounded-2xl p-8 border border-nord-3/30 hover:border-nord-8/30 transition-all duration-500">
          <h3 class="text-lg font-semibold text-nord-6 mb-6 flex items-center gap-2">
            <Icon icon="mdi:message-text" class="w-5 h-5 text-nord-8" />
            Send Message
          </h3>
          
          <form @submit.prevent="handleSubmit" class="contact-form space-y-5" aria-label="Contact form">
            <!-- Name Field -->
            <div>
              <label for="contact-name" class="block text-sm font-medium text-nord-6 mb-2 flex items-center gap-2">
                <Icon icon="mdi:account" class="w-4 h-4 text-nord-8" />
                Your Name *
              </label>
              <input
                id="contact-name"
                v-model="formData.name"
                @blur="markTouched('name')"
                type="text"
                required
                aria-required="true"
                :aria-invalid="!!errors.name"
                :aria-describedby="errors.name ? 'name-error' : undefined"
                class="w-full px-4 py-2.5 bg-nord-2/50 backdrop-blur-sm border rounded-lg font-mono text-sm text-nord-6 placeholder-nord-3/50 transition-all duration-200 focus:outline-none focus:ring-2"
                :class="errors.name ? 'border-nord-11 focus:ring-nord-11/50' : 'border-nord-3/50 focus:border-nord-8 focus:ring-nord-8/50'"
                placeholder="John Doe"
              />
              <Transition name="error-slide">
                <p v-if="errors.name" id="name-error" class="mt-1.5 text-xs text-nord-11 font-mono flex items-center gap-1" role="alert">
                  <Icon icon="mdi:alert-circle" class="w-3 h-3" />
                  {{ errors.name }}
                </p>
              </Transition>
            </div>
            
            <!-- Email Field -->
            <div>
              <label for="contact-email" class="block text-sm font-medium text-nord-6 mb-2 flex items-center gap-2">
                <Icon icon="mdi:email" class="w-4 h-4 text-nord-8" />
                Your Email *
              </label>
              <input
                id="contact-email"
                v-model="formData.email"
                @blur="markTouched('email')"
                type="email"
                required
                aria-required="true"
                :aria-invalid="!!errors.email"
                :aria-describedby="errors.email ? 'email-error' : undefined"
                class="w-full px-4 py-2.5 bg-nord-2/50 backdrop-blur-sm border rounded-lg font-mono text-sm text-nord-6 placeholder-nord-3/50 transition-all duration-200 focus:outline-none focus:ring-2"
                :class="errors.email ? 'border-nord-11 focus:ring-nord-11/50' : 'border-nord-3/50 focus:border-nord-8 focus:ring-nord-8/50'"
                placeholder="john@example.com"
              />
              <Transition name="error-slide">
                <p v-if="errors.email" id="email-error" class="mt-1.5 text-xs text-nord-11 font-mono flex items-center gap-1" role="alert">
                  <Icon icon="mdi:alert-circle" class="w-3 h-3" />
                  {{ errors.email }}
                </p>
              </Transition>
            </div>
            
            <!-- Subject Field -->
            <div>
              <label for="contact-subject" class="block text-sm font-medium text-nord-6 mb-2 flex items-center gap-2">
                <Icon icon="mdi:tag" class="w-4 h-4 text-nord-8" />
                Subject *
              </label>
              <input
                id="contact-subject"
                v-model="formData.subject"
                @blur="markTouched('subject')"
                type="text"
                required
                aria-required="true"
                :aria-invalid="!!errors.subject"
                :aria-describedby="errors.subject ? 'subject-error' : undefined"
                class="w-full px-4 py-2.5 bg-nord-2/50 backdrop-blur-sm border rounded-lg font-mono text-sm text-nord-6 placeholder-nord-3/50 transition-all duration-200 focus:outline-none focus:ring-2"
                :class="errors.subject ? 'border-nord-11 focus:ring-nord-11/50' : 'border-nord-3/50 focus:border-nord-8 focus:ring-nord-8/50'"
                placeholder="Project Collaboration"
              />
              <Transition name="error-slide">
                <p v-if="errors.subject" id="subject-error" class="mt-1.5 text-xs text-nord-11 font-mono flex items-center gap-1" role="alert">
                  <Icon icon="mdi:alert-circle" class="w-3 h-3" />
                  {{ errors.subject }}
                </p>
              </Transition>
            </div>
            
            <!-- Message Field -->
            <div>
              <label for="contact-message" class="block text-sm font-medium text-nord-6 mb-2 flex items-center gap-2">
                <Icon icon="mdi:message-text-outline" class="w-4 h-4 text-nord-8" />
                Message *
              </label>
              <textarea
                id="contact-message"
                v-model="formData.message"
                @blur="markTouched('message')"
                rows="5"
                required
                aria-required="true"
                :aria-invalid="!!errors.message"
                :aria-describedby="errors.message ? 'message-error' : undefined"
                class="w-full px-4 py-2.5 bg-nord-2/50 backdrop-blur-sm border rounded-lg font-mono text-sm text-nord-6 placeholder-nord-3/50 transition-all duration-200 focus:outline-none focus:ring-2 resize-none"
                :class="errors.message ? 'border-nord-11 focus:ring-nord-11/50' : 'border-nord-3/50 focus:border-nord-8 focus:ring-nord-8/50'"
                placeholder="Tell me about your project..."
              ></textarea>
              <Transition name="error-slide">
                <p v-if="errors.message" id="message-error" class="mt-1.5 text-xs text-nord-11 font-mono flex items-center gap-1" role="alert">
                  <Icon icon="mdi:alert-circle" class="w-3 h-3" />
                  {{ errors.message }}
                </p>
              </Transition>
            </div>
            
            <!-- Submit Button -->
            <GlowButton
              type="submit"
              variant="primary"
              :disabled="isSubmitting"
              :aria-busy="isSubmitting"
              aria-label="Send message"
              class="w-full group"
            >
              <Icon v-if="!isSubmitting" icon="mdi:send" class="w-5 h-5 inline mr-2 group-hover:translate-x-1 transition-transform" />
              {{ isSubmitting ? 'Sending...' : 'Send Message' }}
            </GlowButton>
            
            <!-- Status Messages -->
            <Transition name="status-fade">
              <div v-if="submitStatus === 'success'" class="success-message flex items-center gap-2 p-3 bg-nord-14/10 border border-nord-14/30 rounded-lg text-nord-14 text-sm font-mono">
                <Icon icon="mdi:check-circle" class="w-5 h-5 flex-shrink-0" />
                <span>{{ statusMessage }}</span>
              </div>
            </Transition>
            
            <Transition name="status-fade">
              <div v-if="submitStatus === 'error'" class="error-message flex items-center gap-2 p-3 bg-nord-11/10 border border-nord-11/30 rounded-lg text-nord-11 text-sm font-mono">
                <Icon icon="mdi:alert-circle" class="w-5 h-5 flex-shrink-0" />
                <span>{{ statusMessage }}</span>
              </div>
            </Transition>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.error-slide-enter-active,
.error-slide-leave-active {
  transition: all 0.3s ease;
}

.error-slide-enter-from {
  opacity: 0;
  transform: translateY(-5px);
}

.error-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.status-fade-enter-active,
.status-fade-leave-active {
  transition: all 0.4s ease;
}

.status-fade-enter-from,
.status-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
