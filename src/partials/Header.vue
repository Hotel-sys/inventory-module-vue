<template>
  <header
    class="sticky top-0  rounded-xl before:absolute before:inset-0 before:backdrop-blur-md max-lg:before:bg-neutral-200/90 dark:max-lg:before:bg-gray-800/90 before:-z-10 z-30"
    :class="[
      variant === 'v2' || variant === 'v3'
        ? 'before:bg-white after:absolute after:h-px after:inset-x-0 after:top-full after:bg-gray-200 dark:after:bg-gray-700/60 after:-z-10'
        : 'max-lg:shadow-xs lg:before:bg-gray-100/90 dark:lg:before:bg-gray-900/90',
      variant === 'v2' ? 'dark:before:bg-gray-800' : '',
      variant === 'v3' ? 'dark:before:bg-gray-900' : '',
    ]"
  >
    <div class="px-4 sm:px-6 lg:px-8">
      <div
        class="flex items-center justify-between h-16"
        :class="
          variant === 'v2' || variant === 'v3'
            ? ''
            : 'lg:border-b border-gray-200 dark:border-gray-700/60'
        "
      >
        <!-- Header: Left side -->
        <div class="flex">
          <SidebarTrigger />
        </div>

        <!-- Header: Right side -->
        <div class="flex items-center space-x-3">
          <ThemeToggle />
          <UserMenu align="right" />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ThemeToggle from "./ThemeToggle.vue";
import UserMenu from "./DropdownProfile.vue";
import { SidebarTrigger } from "@/components/ui/sidebar";

defineProps(["sidebarOpen", "variant"]);

const searchModalOpen = ref(false);
</script>
