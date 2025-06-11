<script setup lang="ts">
// import type { FieldProps } from './interface'
import { AutoFormLabel } from "@/components/ui/auto-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import type { FieldProps } from "@/components/ui/auto-form";
import EstablishmentFilter from "../filters/EstablishmentFilter.vue";
import { beautifyObjectName } from "@/utils/utils";

defineProps<FieldProps>();
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs" class="min-w-full col-span-1">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <EstablishmentFilter
            :model-value="slotProps.componentField.modelValue"
            @update:model-value="
              slotProps.componentField['onUpdate:modelValue']
            "
          />
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
