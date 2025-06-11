<script setup lang="ts">
import type { FieldProps } from "./interface";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AutoFormLabel from "./AutoFormLabel.vue";
import { beautifyObjectName } from "./utils";

import { computed, inject, isRef } from "vue";
import { useFormContext } from "vee-validate";

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<FieldProps>();

const deps = inject("inputTypes");

const inputDeps = computed(() => {
  const path = props.fieldName
    .replace(/\[(\w+)\]/g, ".$1")
    .split(".")
    .filter(Boolean);

  let currentValue = deps;

  if (path.length > 0) {
    if (currentValue === null) return null;

    let value: any = null;

    for (const key of path) {
      const isIndexValue = isNaN(Number(key)) === false;

      if (isIndexValue) {
        value = currentValue?.[+key];
      } else {
        value = currentValue?.[key];
      }
    }

    return isRef(value) ? value.value : value;
  }

  if (isRef(currentValue)) {
    return currentValue.value;
  }

  return currentValue as any;
});
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem>
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <Input
            type="number"
            v-bind="{
              ...slotProps.componentField,
              ...props.config?.inputProps,
            }"
            :disabled="disabled"
            :currency="(inputDeps && inputDeps?.currency) ?? undefined"
            :percent="(inputDeps && inputDeps?.percentage as boolean) ?? undefined"
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
