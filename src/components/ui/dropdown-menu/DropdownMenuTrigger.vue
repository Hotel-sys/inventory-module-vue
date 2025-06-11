<script setup lang="ts">
import { cn } from '@/lib/utils';
import { DropdownMenuTrigger, type DropdownMenuTriggerProps, useForwardProps } from 'reka-ui'
import type { HTMLAttributes } from 'vue';

const props = defineProps<DropdownMenuTriggerProps & { class?: HTMLAttributes }>()

const forwardedProps = useForwardProps(props)
</script>

<template>
  <DropdownMenuTrigger
    data-slot="dropdown-menu-trigger"
    v-bind="forwardedProps"
    :class="cn('cursor-pointer', props.class)"
  >
    <slot />
  </DropdownMenuTrigger>
</template>
