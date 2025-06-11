<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import Modal from '../../../components/Modal.vue';
import type { Row } from '@tanstack/vue-table';
import type { ExampleUser } from '../types';


const props = defineProps<{
    row: Row<ExampleUser>
}>();

</script>

<template>
  <Modal auto type="menu" confirm-variant="default" confirm-text="Save Changes">
    <template #trigger>
        <Icon icon="lucide:square-pen" />
        Edit Example User
    </template>
    <template #title>
        Edit Example User
    </template>
    <template #content>
        <div class="h-40 flex fle-col items-center justify-center">
            the user you selected was - {{ props.row.original.name }}
        </div>
    </template>
  </Modal>
</template>

<style>

</style>