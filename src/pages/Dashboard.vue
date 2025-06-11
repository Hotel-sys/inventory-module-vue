<template>
  <SidebarProvider>
    <Sidebar />
    <main class="w-full h-screen">
      <Header />
      <router-view></router-view>
    </main>
  </SidebarProvider>
</template>

<script lang="ts" setup>
import { SidebarProvider } from '../components/ui/sidebar';
import Header from '../partials/Header.vue';
import Sidebar from '../partials/Sidebar.vue';
</script>
