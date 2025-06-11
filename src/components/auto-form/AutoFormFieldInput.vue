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
import { Textarea } from "../ui/textarea";
import { computed, onMounted } from "vue";
import AutoFormLabel from "./AutoFormLabel.vue";
import { beautifyObjectName } from "./utils";
import { inject } from "vue";

const props = defineProps<FieldProps>();
const inputComponent = computed(() =>
  props.config?.component === "textarea" ? Textarea : Input
);

const deps = inject<any>("inputTypes");

const inputDeps = computed(() => {
  const [parent, nestedChild] = props.fieldName.split(".");

  if (parent && nestedChild) {
    // @ts-expect-error ignore missing `id`
    return deps?.[parent]?.[nestedChild] as any;
  }

  // @ts-expect-error ignore missing `id`
  return deps?.[props.fieldName] as any;
});
</script>

<template>
  <FormField v-slot="slotProps" :name="props.fieldName">
    <FormItem v-bind="$attrs">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ props.config?.label || beautifyObjectName(label ?? props.fieldName) }}
      </AutoFormLabel>

      <FormControl>
        <slot v-bind="slotProps">
          <component
            :is="inputComponent"
            type="text"
            v-bind="{ ...slotProps.componentField, ...config?.inputProps }"
            :disabled="disabled"
            :mask="(inputDeps && inputDeps?.mask) || undefined"
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
