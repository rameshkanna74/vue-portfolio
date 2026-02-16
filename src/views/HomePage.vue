<script setup lang="ts">
import { ref, onMounted, nextTick, computed } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import gsap from 'gsap';
import { usePortfolioStore } from '../stores/portfolio';
import { useOptimizedAnimations } from '../composables/useOptimizedAnimations';
import { useLazyGsap } from '../composables/useLazyGsap';
import { useSEO } from '../composables/useSEO';
import GlowButton from '../components/ui/GlowButton.vue';
import GitHubShowcase from '../components/sections/GitHubShowcase.vue';
import ResumeDownload from '../components/ui/ResumeDownload.vue';
import LeadMagnet from '../components/sections/LeadMagnet.vue';

const portfolioStore = usePortfolioStore();
const router = useRouter();
const { typeWriter, revealOnScroll } = useOptimizedAnimations();
const { lazyAnimate } = useLazyGsap();

useSEO({
  title: 'Ramesh Kanna | Creative Developer & UI/UX Engineer',
  description: 'Portfolio of Ramesh Kanna, a Creative Developer specializing in Vue.js, Three.js, and interactive web experiences.',
  image: '/og-image.png',
});

const nameRef = ref<HTMLElement | null>(null);
const titleRef = ref<HTMLElement | null>(null);
const roleRef = ref<HTMLElement | null>(null);
const taglineRef = ref<HTMLElement | null>(null);
const quickNavRef = ref<HTMLElement | null>(null);

// Spotlight Effect
const spotlightX = ref(0);
const spotlightY = ref(0);

function handleMouseMove(event: MouseEvent) {
  spotlightX.value = event.clientX;
  spotlightY.value = event.clientY;
}

// Typing Animation for Role
// 'Creative Technologist',
// 'UI/UX Engineer',

const roles = [
  'Full Stack Developer',
  'Problem Solver',
];

const currentRole = ref('');
const currentRoleIndex = ref(0);
const isDeleting = ref(false);
const typingSpeed = ref(100);

function typeRole() {
  const fullRole = roles[currentRoleIndex.value];
  if (!fullRole) return;
  
  if (!isDeleting.value) {
    // Typing
    if (currentRole.value.length < fullRole.length) {
      currentRole.value = fullRole.substring(0, currentRole.value.length + 1);
      typingSpeed.value = 100;
      setTimeout(typeRole, typingSpeed.value);
    } else {
      // Pause before deleting
      setTimeout(() => {
        isDeleting.value = true;
        typeRole();
      }, 2000);
    }
  } else {
    // Deleting
    if (currentRole.value.length > 0) {
      currentRole.value = fullRole.substring(0, currentRole.value.length - 1);
      typingSpeed.value = 50;
      setTimeout(typeRole, typingSpeed.value);
    } else {
      // Move to next role
      isDeleting.value = false;
      currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.length;
      setTimeout(typeRole, 500);
    }
  }
}

// --- Terminal Logic ---
const terminalBodyRef = ref<HTMLElement | null>(null);
const commandInputRef = ref<HTMLInputElement | null>(null);
const userInput = ref('');
const terminalLines = ref<{text: string, type: 'command' | 'output' | 'success' | 'info' | 'warn' | 'error', id: number}[]>([]);
let lineId = 0;

// Command History
const commandHistory = ref<string[]>([]);
const historyIndex = ref(-1);

// Virtual File System
const fileSystem = computed(() => ({
  'about.txt': portfolioStore.portfolioData.profile.summary,
  'skills.md': portfolioStore.skillsByCategory.map(cat => `\n# ${cat.category}\n${cat.skills.map(s => `- ${s.name} (${s.level}%)`).join('\n')}`).join('\n'),
  'projects.json': JSON.stringify(portfolioStore.portfolioData.projects.map(p => ({ name: p.title, tech: p.tech })), null, 2),
  'contact.info': `Email: ${portfolioStore.portfolioData.profile.email}\nPhone: ${portfolioStore.portfolioData.profile.phone}\nLocation: ${portfolioStore.portfolioData.profile.location}`,
  'experience.log': portfolioStore.sortedExperience.map(e => `[${e.startDate} - ${e.endDate}] ${e.position} @ ${e.company}`).join('\n'),
}));

const availableCommands = [
  { cmd: 'help', desc: 'Show available commands' },
  { cmd: 'ls', desc: 'List directory contents' },
  { cmd: 'cat [file]', desc: 'Show file content' },
  { cmd: 'clear', desc: 'Clear terminal screen' },
  { cmd: 'whoami', desc: 'Display current user' },
  { cmd: 'open [page]', desc: 'Navigate to page (about, skills...)' },
  { cmd: 'neofetch', desc: 'Display system info' },
  { cmd: 'date', desc: 'Show current date/time' },
];

// Enhanced Boot Sequence
const bootSequence = [
  { text: '$ python3 portfolio_core.py --interactive', type: 'command', delay: 600 },
  { text: '', type: 'output', delay: 100 },
  { text: '╔══════════════════════════════════════════╗', type: 'info', delay: 50 },
  { text: '║   PORTFOLIO SYSTEM v2.0.1 - LOADING      ║', type: 'info', delay: 50 },
  { text: '╚══════════════════════════════════════════╝', type: 'info', delay: 200 },
  { text: '', type: 'output', delay: 100 },
  { text: '[INIT] Initializing core modules...', type: 'info', delay: 300 },
  { text: '[LOAD] ✓ Virtual File System... MOUNTED', type: 'success', delay: 200 },
  { text: '[LOAD] ✓ Command Parser... READY', type: 'success', delay: 200 },
  { text: '[LOAD] ✓ Navigation Router... ACTIVE', type: 'success', delay: 200 },
  { text: '[LOAD] ✓ Project Database... SYNCED', type: 'success', delay: 200 },
  { text: '', type: 'output', delay: 100 },
  { text: '[SUCCESS] ✨ Terminal Ready! Type "help" for available commands.', type: 'success', delay: 400 },
  { text: '', type: 'output', delay: 100 },
];

async function runBootSequence() {
  for (const step of bootSequence) {
    await new Promise(resolve => setTimeout(resolve, step.delay));
    addLine(step.text, step.type as any);
  }
  focusInput();
}

function addLine(text: string, type: 'command' | 'output' | 'success' | 'info' | 'warn' | 'error' = 'output') {
  terminalLines.value.push({ text, type, id: lineId++ });
  scrollToBottom();
}

async function scrollToBottom() {
  await nextTick();
  if (terminalBodyRef.value) {
    terminalBodyRef.value.scrollTop = terminalBodyRef.value.scrollHeight;
  }
}

function focusInput() {
  // Only focus if not selecting text to avoid annoying behavior
  if (document.getSelection()?.toString().length === 0) {
    commandInputRef.value?.focus();
  }
}

function handleCommand() {
  const cmd = userInput.value.trim();
  if (!cmd) return;

  // Save history
  commandHistory.value.push(cmd);
  historyIndex.value = commandHistory.value.length;

  // Print command
  addLine(`ramesh@portfolio:~$ ${cmd}`, "command");

  const [command, ...args] = cmd.split(" ");
  if (!command) return;
  const input = command.toLowerCase();

  /** Helper: file safe access */
  const fileExists = (name: string) => name in fileSystem.value;

  /** Helper: alignment */
  const pad = (label: string, value: string) =>
    `│  ${label.padEnd(9)}: ${value.padEnd(33)}│`;

  /** COMMAND DEFINITIONS **/
  const commands: Record<string, () => void> = {
    help: () => {
      addLine("Available commands:", "info");
      availableCommands.forEach(c =>
        addLine(`  ${c.cmd.padEnd(15)} - ${c.desc}`, "output")
      );
    },

    ls: () => {
      addLine(Object.keys(fileSystem.value).join("  "), "success");
    },

    cat: () => {
      if (!args.length) return addLine("Usage: cat [filename]", "warn");
      const file = args[0] as keyof typeof fileSystem.value;
      return fileExists(file)
        ? addLine(fileSystem.value[file], "output")
        : addLine(`cat: ${file}: No such file or directory`, "error");
    },

    clear: () => (terminalLines.value = []),

    whoami: () => addLine("ramesh (guest)", "output"),

    date: () => addLine(new Date().toString(), "output"),

    open: () => {
      if (!args.length)
        return addLine(
          "Usage: open [page] (about, skills, projects, experience, contact)",
          "warn"
        );

      const page = args[0]?.toLowerCase();
      if (!page) return;
      const valid = ["about", "skills", "projects", "experience", "contact"];

      return valid.includes(page)
        ? (addLine(`Navigating to /${page}...`, "success"),
          setTimeout(() => router.push(`/${page}`), 500))
        : addLine(`Page not found: ${page}`, "error");
    },

    sudo: () => {
      if (args.join(" ") === "rm -rf /") {
        addLine("CORE SYSTEM DELETION INITIATED...", "error");
        ["Deleting /bin...", "Deleting /usr...", "Deleting /home/ramesh..."].forEach(
          (msg, i) => setTimeout(() => addLine(msg, "error"), 400 * (i + 1))
        );
        return setTimeout(
          () => addLine("KERNEL PANIC: JUST KIDDING! DON'T DO THAT!", "success"),
          2000
        );
      }
      addLine("Permission denied: you are not root. Nice try though.", "error");
    },

    neofetch: () => {
      const uptime = Math.floor(performance.now() / 1000);
      const uptimeStr = `${Math.floor(uptime / 60)}m ${uptime % 60}s`;

      const w = window.innerWidth;
      const h = window.innerHeight;

      const line = "─".repeat(46);

      addLine(
        `
  ╭${line}╮
  │  🚀 SYSTEM STATUS: ONLINE${" ".repeat(20)}│
  ├${line}┤
  ${pad("USER", "ramesh@portfolio")}
  ${pad("OS", "PortfolioOS (Vue 3 Edition)")}
  ${pad("KERNEL", "7.8-arch-rolling")}
  ${pad("UPTIME", uptimeStr)}
  ${pad("SHELL", "ZSH (Web Emulation)")}
  ${pad("DISPLAY", `${w}x${h}`)}
  ${pad("THEME", "Nord Dark")}
  ├${line}┤
  ${pad("CPU", "[▮▮▮▮▯▯▯▯▯▯] 32% (Optimized)")}
  ${pad("MEMORY", "[▮▮▮▯▯▯▯▯▯▯] 128MB (Light)")}
  ╰${line}╯
        `,
        "info"
      );
    },

    uname: () => {
      const full =
        "Linux portfolio 7.8-arch-rolling #1 SMP PREEMPT_DYNAMIC Tue, 03 Dec 2025 x86_64 GNU/Linux";
      addLine(args.includes("-a") ? full : "Linux", "output");
    },

    top: () =>
      addLine(
        "CPU: 1% (Optimized) | MEM: 128MB (Vue is lightweight) | TASKS: 1 running",
        "info"
      ),
    htop: () =>
      addLine(
        "CPU: 1% (Optimized) | MEM: 128MB (Vue is lightweight) | TASKS: 1 running",
        "info"
      ),

    vi: () =>
      addLine(
        "Error: Cannot open editor. This is a read-only filesystem (for now).",
        "warn"
      ),
    vim: () =>
      addLine(
        "Error: Cannot open editor. This is a read-only filesystem (for now).",
        "warn"
      ),
    nvim: () =>
      addLine(
        "Error: Cannot open editor. This is a read-only filesystem (for now).",
        "warn"
      ),
    nano: () =>
      addLine(
        "Error: Cannot open editor. This is a read-only filesystem (for now).",
        "warn"
      ),
    emacs: () =>
      addLine(
        "Error: Cannot open editor. This is a read-only filesystem (for now).",
        "warn"
      )
  };

  /** Execute command or fallback */
  if (commands[input]) commands[input]();
  else addLine(`command not found: ${input}`, "error");

  userInput.value = "";
  scrollToBottom();
}


// function handleCommand() {
//   const cmd = userInput.value.trim();
//   if (!cmd) return;

//   // Add command to history
//   commandHistory.value.push(cmd);
//   historyIndex.value = commandHistory.value.length;

//   // Display command
//   addLine(`ramesh@portfolio:~$ ${cmd}`, 'command');

//   // Process command
//   const parts = cmd.split(' ');
//   const command = parts[0].toLowerCase();
//   const args = parts.slice(1);

//   switch (command) {
//     case 'help':
//       addLine('Available commands:', 'info');
//       availableCommands.forEach(c => addLine(`  ${c.cmd.padEnd(15)} - ${c.desc}`, 'output'));
//       break;

//     case 'ls':
//       addLine(Object.keys(fileSystem.value).join('  '), 'success');
//       break;

//     case 'cat':
//       if (args.length === 0) {
//         addLine('Usage: cat [filename]', 'warn');
//       } else {
//         const fileName = args[0];
//         if (fileName in fileSystem.value) {
//           addLine(fileSystem.value[fileName as keyof typeof fileSystem.value], 'output');
//         } else {
//           addLine(`cat: ${fileName}: No such file or directory`, 'error');
//         }
//       }
//       break;

//     case 'clear':
//       terminalLines.value = [];
//       break;

//     case 'whoami':
//       addLine('ramesh (guest)', 'output');
//       break;
      
//     case 'date':
//       addLine(new Date().toString(), 'output');
//       break;

//     case 'open':
//       if (args.length === 0) {
//         addLine('Usage: open [page] (about, skills, projects, experience, contact)', 'warn');
//       } else {
//         const page = args[0].toLowerCase();
//         const validPages = ['about', 'skills', 'projects', 'experience', 'contact'];
//         if (validPages.includes(page)) {
//           addLine(`Navigating to /${page}...`, 'success');
//           setTimeout(() => router.push(`/${page}`), 500);
//         } else {
//           addLine(`Page not found: ${page}`, 'error');
//         }
//       }
//       break;
      
//     case 'sudo':
//       if (args.join(' ') === 'rm -rf /') {
//          addLine('CORE SYSTEM DELETION INITIATED...', 'error');
//          setTimeout(() => addLine('Deleting /bin...', 'error'), 400);
//          setTimeout(() => addLine('Deleting /usr...', 'error'), 800);
//          setTimeout(() => addLine('Deleting /home/ramesh...', 'error'), 1200);
//          setTimeout(() => addLine('KERNEL PANIC: JUST KIDDING! DON\'T DO THAT!', 'success'), 2000);
//       } else {
//          addLine('Permission denied: you are not root. Nice try though.', 'error');
//       }
//       break;

//     case 'neofetch': {
//       const uptime = Math.floor(performance.now() / 1000);
//       const uptimeStr = `${Math.floor(uptime / 60)}m ${uptime % 60}s`;
//       const w = window.innerWidth;
//       const h = window.innerHeight;
      
//       const dash = '─'.repeat(46);
//       // Helper to pad line: "  LABEL    : VALUE"
//       // Total inner width 46. Prefix 13. Value 33.
//       const p = (l: string, v: string) => `│  ${l.padEnd(9)}: ${v.padEnd(33)}│`;
      
//       addLine(`
//   ╭${dash}╮
//   │  🚀 SYSTEM STATUS: ONLINE${' '.repeat(20)}│
//   ├${dash}┤
//   ${p('USER', 'ramesh@portfolio')}
//   ${p('OS', 'PortfolioOS (Vue 3 Edition)')}
//   ${p('KERNEL', '7.8-arch-rolling')}
//   ${p('UPTIME', uptimeStr)}
//   ${p('SHELL', 'ZSH (Web Emulation)')}
//   ${p('DISPLAY', `${w}x${h}`)}
//   ${p('THEME', 'Nord Dark')}
//   ├${dash}┤
//   ${p('CPU', '[▮▮▮▮▯▯▯▯▯▯] 32% (Optimized)')}
//   ${p('MEMORY', '[▮▮▮▯▯▯▯▯▯▯] 128MB (Light)')}
//   ╰${dash}╯
//       `, 'info');
//       break;
//     }

//     case 'uname':
//       if (args.includes('-a')) {
//         addLine('Linux portfolio 6.9-arch-rolling #1 SMP PREEMPT_DYNAMIC Tue, 03 Dec 2025 x86_64 GNU/Linux', 'output');
//       } else {
//         addLine('Linux', 'output');
//       }
//       break;

//     case 'top':
//     case 'htop':
//       addLine('CPU: 1% (Optimized) | MEM: 128MB (Vue is lightweight) | TASKS: 1 running', 'info');
//       break;

//     case 'vi':
//     case 'vim':
//     case 'nvim':
//     case 'nano':
//     case 'emacs':
//       addLine('Error: Cannot open editor. This is a read-only filesystem (for now).', 'warn');
//       break;

//     default:
//       addLine(`command not found: ${command}`, 'error');
//   }

//   userInput.value = '';
//   scrollToBottom();
// }

function navigateHistory(direction: 'up' | 'down') {
  if (commandHistory.value.length === 0) return;

  if (direction === 'up') {
    if (historyIndex.value > 0) {
      historyIndex.value--;
      userInput.value = commandHistory.value[historyIndex.value] || '';
    }
  } else {
    if (historyIndex.value < commandHistory.value.length - 1) {
      historyIndex.value++;
      userInput.value = commandHistory.value[historyIndex.value] || '';
    } else {
      historyIndex.value = commandHistory.value.length;
      userInput.value = '';
    }
  }
}

// --- Lifecycle ---
onMounted(async () => {
  // Type name
  if (nameRef.value) {
    await typeWriter(nameRef.value, portfolioStore.portfolioData.profile.name, { speed: 80 });
  }
  
  // Reveal title
  if (titleRef.value) {
    gsap.to(titleRef.value, { opacity: 1, y: 0, duration: 0.6, delay: 0.3 });
  }
  
  // Start typing animation for role
  setTimeout(() => {
    if (roleRef.value) {
      gsap.from(roleRef.value, { opacity: 0, y: 10, duration: 0.5, clearProps: 'all' });
    }
    typeRole();
  }, 800);

  // Start terminal boot sequence
  runBootSequence();
  
  // Reveal tagline
  if (taglineRef.value) {
    gsap.to(taglineRef.value, { opacity: 1, y: 0, duration: 0.6, delay: 0.6 });
  }
  
  // Reveal quick nav cards
  if (quickNavRef.value) {
    revealOnScroll(quickNavRef.value);
  }
  
  // Lazy load gradient orb animations when they enter viewport
  const orbsRef = ref<HTMLElement | null>(null);
  if (orbsRef.value) {
    const orbs = orbsRef.value.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
      lazyAnimate(
        orb as HTMLElement,
        () => gsap.to(orb, {
          x: `+=${Math.random() * 100 - 50}`,
          y: `+=${Math.random() * 100 - 50}`,
          duration: 10 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        }),
        { threshold: 0.1, triggerOnce: false }
      );
    });
  }
});
</script>

<template>
  <div class="min-h-screen bg-nord-0 relative overflow-x-hidden" @mousemove="handleMouseMove">
    <!-- Gradient Orbs Background -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden" style="z-index: 1;">
      <!-- Orb 1 - Cyan -->
      <div class="gradient-orb absolute rounded-full blur-3xl opacity-40 bg-gradient-to-br from-nord-8 to-nord-9" style="top: 10%; left: 10%; width: 400px; height: 400px;"></div>
      
      <!-- Orb 2 - Blue -->
      <div class="gradient-orb absolute rounded-full blur-3xl opacity-30 bg-gradient-to-br from-nord-9 to-nord-10" style="top: 60%; right: 15%; width: 350px; height: 350px;"></div>
      
      <!-- Orb 3 - Purple -->
      <div class="gradient-orb absolute rounded-full blur-3xl opacity-25 bg-gradient-to-br from-nord-10 to-nord-15" style="bottom: 20%; left: 50%; width: 300px; height: 300px;"></div>
    </div>
    
    <!-- Spotlight Effect -->
    <div 
      class="fixed pointer-events-none transition-all duration-300 ease-out"
      style="z-index: 1;"
      :style="{
        left: spotlightX + 'px',
        top: spotlightY + 'px',
        width: '600px',
        height: '600px',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(136, 192, 208, 0.08) 0%, transparent 70%)',
      }"
    ></div>
    
    <!-- Hero Section -->
    <section class="relative h-screen flex items-center justify-center hero-section" style="z-index: 5;">
      <!-- CSS-based animated background (no Three.js for performance) -->
      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <!-- Text Content -->
          <div class="pointer-events-auto space-y-8">
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-terminal-green font-mono text-sm mb-4">
                <span class="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></span>
                {{ $t('hero.systemOnline') || 'System Online' }}
              </div>
              
              <h1 class="text-5xl md:text-7xl font-bold text-nord-6 tracking-tight">
                {{ $t('hero.greeting') }} <span ref="nameRef" class="text-gradient-premium"></span>
                <span class="animate-terminal-blink text-terminal-green">_</span>
              </h1>
              
              <div ref="titleRef" class="opacity-0 transform translate-y-4">
                <h2 class="text-xl md:text-2xl font-semibold text-nord-4 mt-2">
                  {{ portfolioStore.portfolioData.profile.title }}
                </h2>
              </div>
              
              <!-- Typing Animation for Role -->
              <div ref="roleRef" class="mt-4">
                <div class="flex items-center gap-2">
                  <span class="text-terminal-green font-mono text-sm">$</span>
                  <span class="text-2xl md:text-3xl font-mono text-nord-8">
                    {{ currentRole }}
                    <span class="animate-terminal-blink text-nord-8">|</span>
                  </span>
                </div>
              </div>
            </div>

            <div ref="taglineRef" class="opacity-0 transform translate-y-4">
              <p class="text-nord-4/80 text-lg max-w-xl leading-relaxed border-l-2 border-nord-3 pl-4">
                {{ portfolioStore.portfolioData.profile.tagline }}
              </p>
            </div>
            
            <div class="flex flex-wrap gap-4 pt-4 opacity-0 animate-fade-in" style="animation-delay: 2s; animation-fill-mode: forwards;">
              <RouterLink to="/projects">
                <GlowButton variant="primary" class="font-mono">
                  <Icon icon="mdi:folder-multiple" class="w-5 h-5 inline mr-2" />
                  <span>View My Work</span>
                  <Icon icon="mdi:arrow-right" class="w-4 h-4 inline ml-2" />
                </GlowButton>
              </RouterLink>
              <RouterLink to="/contact">
                <GlowButton variant="secondary" class="font-mono border border-nord-3 bg-nord-0/50 backdrop-blur-sm hover:bg-nord-3/50">
                  <Icon icon="mdi:calendar-check" class="w-5 h-5 inline mr-2" />
                  <span>Let's Talk About Your Project</span>
                </GlowButton>
              </RouterLink>
              <ResumeDownload />
            </div>
            
            <!-- Social Proof Stats -->
            <div class="flex flex-wrap gap-6 pt-8 opacity-0 animate-fade-in" style="animation-delay: 2.3s; animation-fill-mode: forwards;">
              <div class="flex items-center gap-2 text-nord-4">
                <Icon icon="mdi:briefcase" class="w-5 h-5 text-nord-8" />
                <span class="font-mono text-sm"><span class="text-terminal-green font-bold">5+</span> Years Experience</span>
              </div>
              <div class="flex items-center gap-2 text-nord-4">
                <Icon icon="mdi:folder-multiple" class="w-5 h-5 text-nord-8" />
                <span class="font-mono text-sm"><span class="text-terminal-green font-bold">50+</span> Projects Completed</span>
              </div>
              <div class="flex items-center gap-2 text-nord-4">
                <Icon icon="mdi:github" class="w-5 h-5 text-nord-8" />
                <span class="font-mono text-sm"><span class="text-terminal-green font-bold">Open Source</span> Contributor</span>
              </div>
            </div>
          </div>

          <!-- Terminal Window (Interactive) -->
          <div class="hidden lg:block pointer-events-auto transform hover:scale-[1.02] transition-transform duration-500">
            <div 
              class="terminal-window bg-nord-0/95 backdrop-blur-xl border border-nord-3/50 shadow-glass h-[450px] flex flex-col relative overflow-hidden"
              @click="focusInput"
            >
              <!-- Subtle gradient overlay -->
              <div class="absolute inset-0 bg-gradient-to-br from-nord-8/5 to-transparent pointer-events-none"></div>
              
              <div class="terminal-header bg-nord-1/50 border-b border-nord-3/50 flex-shrink-0 relative z-10">
                <div class="flex items-center gap-2">
                  <div class="terminal-controls">
                    <div class="terminal-control terminal-control-close"></div>
                    <div class="terminal-control terminal-control-minimize"></div>
                    <div class="terminal-control terminal-control-maximize"></div>
                  </div>
                  <span class="terminal-title text-nord-4/60">ramesh@portfolio:~/home</span>
                </div>
              </div>
              
              <div ref="terminalBodyRef" class="terminal-content p-6 space-y-1 font-mono text-sm overflow-y-auto flex-1 scrollbar-hide">
                <div 
                  v-for="line in terminalLines" 
                  :key="line.id" 
                  class="break-words"
                >
                  <template v-if="line.type === 'command'">
                    <span class="text-nord-4 font-bold whitespace-pre-wrap">{{ line.text }}</span>
                  </template>
                  
                  <template v-else-if="line.type === 'info'">
                    <span class="text-nord-9 whitespace-pre-wrap">{{ line.text }}</span>
                  </template>
                  
                  <template v-else-if="line.type === 'success'">
                    <span class="text-terminal-green whitespace-pre-wrap">{{ line.text }}</span>
                  </template>
                  
                  <template v-else-if="line.type === 'warn'">
                    <span class="text-yellow-400 whitespace-pre-wrap">{{ line.text }}</span>
                  </template>
                  
                  <template v-else-if="line.type === 'error'">
                    <span class="text-red-400 whitespace-pre-wrap">{{ line.text }}</span>
                  </template>
                  
                  <template v-else>
                    <span class="text-nord-4/80 whitespace-pre-wrap">{{ line.text }}</span>
                  </template>
                </div>
                
                <!-- Input Line -->
                <div class="flex gap-2 pt-2 items-center">
                  <span class="text-terminal-green font-bold">ramesh@portfolio:~$</span>
                  <input 
                    ref="commandInputRef"
                    v-model="userInput"
                    type="text" 
                    class="bg-transparent border-none outline-none text-nord-4 flex-1 font-mono caret-terminal-green"
                    @keydown.enter="handleCommand"
                    @keydown.up.prevent="navigateHistory('up')"
                    @keydown.down.prevent="navigateHistory('down')"
                    autocomplete="off"
                    spellcheck="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div class="flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
          <span class="text-xs font-mono text-nord-4">SCROLL</span>
          <Icon icon="mdi:chevron-down" class="w-6 h-6 text-nord-4" />
        </div>
      </div>
    </section>
    
    <!-- GitHub Open Source Showcase -->
    <section class="py-24 px-4 relative z-10">
      <div class="max-w-6xl mx-auto">
        <GitHubShowcase />
      </div>
    </section>
    
    <!-- Lead Magnet Section -->
    <section class="py-24 px-4 relative z-10">
      <div class="max-w-4xl mx-auto">
        <LeadMagnet />
      </div>
    </section>
    
    <!-- Quick Links Section -->
    <section class="py-24 px-4 relative z-10">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center gap-4 mb-12">
          <h2 class="text-3xl font-bold text-nord-6">
            <span class="text-terminal-green">#</span> {{ $t('homeNav.title') }}
          </h2>
          <div class="h-px bg-nord-3 flex-1"></div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <RouterLink to="/about" class="group quick-nav-card">
            <div class="h-full p-6 bg-nord-2/50 backdrop-blur-sm border border-nord-3/50 rounded-lg hover:border-terminal-green/50 hover:bg-nord-2 transition-all duration-300 hover:shadow-glow-md hover:-translate-y-2 relative overflow-hidden">
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-br from-terminal-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div class="relative z-10">
                <div class="w-12 h-12 bg-nord-3/50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all text-terminal-green">
                  <Icon icon="mdi:account" class="w-6 h-6" />
                </div>
                <h3 class="text-xl font-bold text-nord-6 mb-2 group-hover:text-terminal-green transition-colors">
                  {{ $t('homeNav.about.title') }}
                </h3>
                <p class="text-nord-4/70 text-sm leading-relaxed">
                  {{ $t('homeNav.about.description') }}
                </p>
              </div>
            </div>
          </RouterLink>
          
          <RouterLink to="/skills" class="group quick-nav-card">
            <div class="h-full p-6 bg-nord-2/50 backdrop-blur-sm border border-nord-3/50 rounded-lg hover:border-nord-9/50 hover:bg-nord-2 transition-all duration-300 hover:shadow-glow-md hover:-translate-y-2 relative overflow-hidden">
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-br from-nord-9/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div class="relative z-10">
                <div class="w-12 h-12 bg-nord-3/50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all text-nord-9">
                  <Icon icon="mdi:code-braces" class="w-6 h-6" />
                </div>
                <h3 class="text-xl font-bold text-nord-6 mb-2 group-hover:text-nord-9 transition-colors">
                  {{ $t('homeNav.skills.title') }}
                </h3>
                <p class="text-nord-4/70 text-sm leading-relaxed">
                  {{ $t('homeNav.skills.description') }}
                </p>
              </div>
            </div>
          </RouterLink>
          
          <RouterLink to="/experience" class="group quick-nav-card">
            <div class="h-full p-6 bg-nord-2/50 backdrop-blur-sm border border-nord-3/50 rounded-lg hover:border-nord-10/50 hover:bg-nord-2 transition-all duration-300 hover:shadow-glow-md hover:-translate-y-2 relative overflow-hidden">
              <!-- Gradient overlay on hover -->
              <div class="absolute inset-0 bg-gradient-to-br from-nord-10/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div class="relative z-10">
                <div class="w-12 h-12 bg-nord-3/50 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all text-nord-10">
                  <Icon icon="mdi:briefcase" class="w-6 h-6" />
                </div>
                <h3 class="text-xl font-bold text-nord-6 mb-2 group-hover:text-nord-10 transition-colors">
                  {{ $t('homeNav.experience.title') }}
                </h3>
                <p class="text-nord-4/70 text-sm leading-relaxed">
                  {{ $t('homeNav.experience.description') }}
                </p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
