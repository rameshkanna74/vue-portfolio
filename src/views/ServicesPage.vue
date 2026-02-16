<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Icon } from '@iconify/vue';
import { useGsapAnimations } from '../composables/useGsapAnimations';
import { useSEO } from '../composables/useSEO';

const { slideUp } = useGsapAnimations();

useSEO({
  title: 'Services & Pricing | Ramesh Kanna',
  description: 'Professional full-stack development services. From MVPs to enterprise solutions, get transparent pricing and packages.',
});

const headerRef = ref<HTMLElement | null>(null);

const services = [
  {
    id: 'mvp',
    icon: 'mdi:rocket-launch',
    title: 'MVP Development',
    description: 'Launch your idea fast with a Minimum Viable Product',
    price: '₹50,000 - ₹1,50,000',
    duration: '4-8 weeks',
    features: [
      'Full-stack development (Frontend + Backend)',
      'Responsive design for all devices',
      'Database design & implementation  ',
      'User authentication & authorization',
      'Core feature implementation',
      'Basic SEO optimization',
      '2 weeks post-launch support',
    ],
    ideal: 'Startups, Entrepreneurs, Product Testing',
    color: 'nord-8',
  },
  {
    id: 'webapp',
    icon: 'mdi:web',
    title: 'Web Application',
    description: 'Custom web applications built for scale and performance',
    price: '₹1,50,000 - ₹5,00,000',
    duration: '8-16 weeks',
    features: [
      'Everything in MVP, plus:',
      'Advanced features & integrations',
      'Third-party API integrations',
      'Payment gateway integration',
      'Admin dashboard & analytics',
      'Performance optimization',
      'Comprehensive testing suite',
      '1 month post-launch support',
    ],
    ideal: 'Growing Businesses, SaaS Products',
    color: 'nord-9',
    popular: true,
  },
  {
    id: 'enterprise',
    icon: 'mdi:office-building',
    title: 'Enterprise Solution',
    description: 'Large-scale applications with custom requirements',
    price: 'Custom Quote',
    duration: '16+ weeks',
    features: [
      'Everything in Web Application, plus:',
      'Microservices architecture',
      'High availability & scalability',
      'Advanced security implementation',
      'Multi-tenant support',
      'Custom integrations & automations',
      'Dedicated project management',
      '3 months premium support',
    ],
    ideal: 'Enterprises, Complex Systems',
    color: 'nord-10',
  },
];

const additionalServices = [
  {
    icon: 'mdi:speedometer',
    title: 'Performance Optimization',
    description: 'Speed up your existing application',
    price: '₹30,000+',
  },
  {
    icon: 'mdi:bug',
    title: 'Bug Fixes & Maintenance',
    description: 'Keep your application running smoothly',
    price: '₹15,000/month',
  },
  {
    icon: 'mdi:school',
    title: 'Technical Consulting',
    description: 'Architecture review & technical guidance',
    price: '₹5,000/hour',
  },
  {
    icon: 'mdi:api',
    title: 'API Development',
    description: 'RESTful APIs for your applications',
    price: '₹40,000+',
  },
];

onMounted(() => {
  if (headerRef.value) {
    slideUp(headerRef.value);
  }
});
</script>

<template>
  <div class="min-h-screen py-20 px-4">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div ref="headerRef" class="text-center mb-16">
        <h1 class="text-5xl font-bold text-nord-6 mb-4">
          <span class="text-gradient-premium">Services & Pricing</span>
        </h1>
        <p class="text-nord-4 font-mono text-lg max-w-2xl mx-auto">
          Transparent pricing. No hidden fees. Choose the package that fits your needs.
        </p>
      </div>

      <!-- Main Service Packages -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div
          v-for="service in services"
          :key="service.id"
          class="relative glassmorphism-card rounded-2xl p-8 border transition-all duration-300 hover:shadow-glow-lg hover:-translate-y-2"
          :class="[
            service.popular ? 'border-terminal-green/50 scale-105' : 'border-nord-3/30',
          ]"
        >
          <!-- Popular Badge -->
          <div v-if="service.popular" class="absolute -top-4 left-1/2 -translate-x-1/2">
            <span class="px-4 py-1 bg-gradient-to-r from-terminal-green to-nord-8 text-nord-0 text-xs font-bold rounded-full shadow-glow-sm">
              MOST POPULAR
            </span>
          </div>

          <!-- Icon -->
          <div class="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-nord-8 to-nord-9 rounded-full mb-6">
            <Icon :icon="service.icon" class="w-7 h-7 text-nord-0" />
          </div>

          <!-- Title & Description -->
          <h3 class="text-2xl font-bold text-nord-6 mb-2">{{ service.title }}</h3>
          <p class="text-nord-4 text-sm mb-6">{{ service.description }}</p>

          <!-- Pricing -->
          <div class="mb-6 pb-6 border-b border-nord-3/30">
            <div class="text-3xl font-bold text-terminal-green mb-1">{{ service.price }}</div>
            <div class="text-xs text-nord-4 font-mono flex items-center gap-2">
              <Icon icon="mdi:clock-outline" class="w-4 h-4" />
              {{ service.duration }}
            </div>
          </div>

          <!-- Features -->
          <ul class="space-y-3 mb-6">
            <li
              v-for="(feature, index) in service.features"
              :key="index"
              class="flex items-start gap-2 text-sm text-nord-4"
            >
              <Icon icon="mdi:check-circle" class="w-5 h-5 text-terminal-green flex-shrink-0 mt-0.5" />
              <span>{{ feature }}</span>
            </li>
          </ul>

          <!-- Ideal For -->
          <div class="bg-nord-1/50 rounded-lg p-4 mb-6">
            <div class="text-xs text-nord-4/60 mb-1 font-mono">IDEAL FOR:</div>
            <div class="text-sm text-nord-6 font-semibold">{{ service.ideal }}</div>
          </div>

          <!-- CTA -->
          <RouterLink 
            to="/contact" 
            class="block w-full px-6 py-3 text-center rounded-lg font-semibold transition-all duration-300"
            :class="service.popular 
              ? 'bg-gradient-to-r from-terminal-green to-nord-8 text-nord-0 hover:shadow-glow-md' 
              : 'bg-nord-3/30 text-nord-6 hover:bg-nord-3/50 border border-nord-3/50'"
          >
            Get Started
          </RouterLink>
        </div>
      </div>

      <!-- Additional Services -->
      <div class="mb-20">
        <h2 class="text-3xl font-bold text-nord-6 mb-8 text-center">
          Additional Services
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="service in additionalServices"
            :key="service.title"
            class="glassmorphism-card rounded-xl p-6 border border-nord-3/30 hover:border-nord-8/50 transition-all duration-300 hover:shadow-glow-md"
          >
            <Icon :icon="service.icon" class="w-8 h-8 text-nord-8 mb-4" />
            <h3 class="text-lg font-semibold text-nord-6 mb-2">{{ service.title }}</h3>
            <p class="text-sm text-nord-4 mb-3">{{ service.description }}</p>
            <div class="text-terminal-green font-bold font-mono text-sm">{{ service.price }}</div>
          </div>
        </div>
      </div>

      <!-- Why Work With Me -->
      <div class="glassmorphism-card rounded-2xl p-8 md:p-12 border border-nord-3/30 mb-12">
        <h2 class="text-3xl font-bold text-nord-6 mb-8 text-center">Why Work With Me?</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-nord-8/20 rounded-full mb-4">
              <Icon icon="mdi:lightning-bolt" class="w-6 h-6 text-nord-8" />
            </div>
            <h3 class="text-lg font-semibold text-nord-6 mb-2">Fast Delivery</h3>
            <p class="text-sm text-nord-4">Agile development with weekly updates. Ship features, not excuses.</p>
          </div>
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-nord-8/20 rounded-full mb-4">
              <Icon icon="mdi:code-braces" class="w-6 h-6 text-nord-8" />
            </div>
            <h3 class="text-lg font-semibold text-nord-6 mb-2">Clean Code</h3>
            <p class="text-sm text-nord-4">Maintainable, scalable, and well-documented code you can build on.</p>
          </div>
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-nord-8/20 rounded-full mb-4">
              <Icon icon="mdi:handshake" class="w-6 h-6 text-nord-8" />
            </div>
            <h3 class="text-lg font-semibold text-nord-6 mb-2">Full Transparency</h3>
            <p class="text-sm text-nord-4">Regular communication, progress tracking, and honest timelines.</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="text-center">
        <h3 class="text-2xl font-bold text-nord-6 mb-4">Ready to Start Your Project?</h3>
        <p class="text-nord-4 mb-6">Let's discuss your requirements and find the best solution for you.</p>
        <RouterLink to="/contact">
          <button class="px-8 py-4 bg-gradient-to-r from-terminal-green to-nord-8 text-nord-0 rounded-lg font-semibold text-lg hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1">
            Schedule a Free Consultation
          </button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
