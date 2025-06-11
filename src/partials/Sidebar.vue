<script setup lang="ts">
import { Building, Group, Home, Users } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { Icon } from '@iconify/vue'
import { h } from "vue";
import { RouterLink } from "vue-router";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Company",
    url: "/company",
    icon: Building,
  },
  {
    title: "Departments",
    url: "/departments",
    icon: Group,
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: h(Icon, {
      icon: 'ph:money'
    }),
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  
];
</script>

<template>
  <Sidebar variant="floating" collapsible="icon">
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                    <RouterLink :to="item.url">
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
                    </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>