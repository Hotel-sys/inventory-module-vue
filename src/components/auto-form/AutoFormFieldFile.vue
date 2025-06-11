<script setup lang="ts">
import type { FieldProps } from "./interface";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TrashIcon } from "@radix-icons/vue";
import { ref } from "vue";
import AutoFormLabel from "./AutoFormLabel.vue";
import { beautifyObjectName } from "./utils";

defineProps<FieldProps>();

const inputFile = ref<File>();
async function parseFileAsString(file: File | undefined): Promise<string> {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = (err) => {
        reject(err);
      };
      reader.readAsDataURL(file);
    }
  });
}
</script>

<template>
  <FormField v-slot="slotProps" :name="fieldName">
    <FormItem v-bind="$attrs" class="col-span-2 mt-2">
      <AutoFormLabel v-if="!config?.hideLabel" :required="required">
        {{ config?.label || beautifyObjectName(label ?? fieldName) }}
      </AutoFormLabel>
      <FormControl>
        <slot v-bind="slotProps">
          <input
            v-if="!inputFile"
            type="file"
            class="!h-8 !flex !w-full !text-sm !text-zinc-800 !bg-white dark:!bg-zinc-800 dark:!text-zinc-400 !px-3 !py-1 !rounded-lg !border !border-zinc-300 focus-visible:!outline-none focus-visible:!ring-1 focus-visible:!ring-zinc-400 disabled:!cursor-not-allowed disabled:!opacity-60 focus-visible:!ring-offset-1 focus-visible:!ring-offset-zinc-50 !transition-all !duration-150 !ease-in-out file:inline-flex file:pb-4 file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-700 dark:file:text-zinc-100 aria-invalid:ring-red-500/20 dark:aria-invalid:ring-red-500/40 aria-invalid:border-red-500"
            v-bind="{ ...config?.inputProps }"
            :disabled="disabled"
            @change="
              async (ev: any) => {
                console.log(ev);

                const file = (ev.target as HTMLInputElement).files?.[0];
                inputFile = file;
                const parsed = await parseFileAsString(file);
                slotProps.componentField.onInput(parsed);
              }
            "
          />
          <div
            v-else
            class="flex h-8 items-center justify-between rounded-md border border-zinc-200 bg-transparent pl-3 pr-1 py-1 text-sm shadow-sm transition-colors dark:border-zinc-800"
          >
            <p class="w-full dark:text-zinc-300">{{ inputFile?.name }}</p>
            <Button
              :size="'icon'"
              :variant="'ghost'"
              class="h-[26px] w-[26px] dark:!text-zinc-300"
              aria-label="Remove file"
              type="button"
              @click="
                () => {
                  inputFile = undefined;
                  slotProps.componentField.onInput(undefined);
                }
              "
            >
              <TrashIcon />
            </Button>
          </div>
        </slot>
      </FormControl>
      <FormDescription v-if="config?.description">
        {{ config.description }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
