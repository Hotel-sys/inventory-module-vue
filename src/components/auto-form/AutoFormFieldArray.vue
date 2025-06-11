<script setup lang="ts" generic="T extends z.ZodAny">
import type { Config } from "./interface";
import { Button } from "@/components/ui/button";
import { FormItem } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { PlusIcon, TrashIcon } from "lucide-vue-next";
import { FieldArray, FieldContextKey, useField } from "vee-validate";
import { computed, inject, onMounted, provide } from "vue";
import * as z from "zod";
import AutoFormField from "./AutoFormField.vue";
import AutoFormLabel from "./AutoFormLabel.vue";
import { beautifyObjectName, getBaseType } from "./utils";


const TUPLE_OBJECT_KEY = 'BLAH BLAH'


const props = defineProps<{
  fieldName: string;
  required?: boolean;
  config?: Config<T>;
  schema?: z.ZodArray<T>;
  disabled?: boolean;
}>();

function isZodArray(
  item: z.ZodArray<any> | z.ZodDefault<any>
): item is z.ZodArray<any> {
  return item instanceof z.ZodArray;
}

function isZodDefault(
  item: z.ZodArray<any> | z.ZodDefault<any>
): item is z.ZodDefault<any> {
  return item instanceof z.ZodDefault;
}

const itemShape = computed(() => {
  if (!props.schema) return;

  const schema: z.ZodAny = isZodArray(props.schema)
    ? props.schema._def.type
    : isZodDefault(props.schema)
    ? // @ts-expect-error missing schema
      props.schema._def.innerType._def.type
    : null;

  return {
    type: getBaseType(schema),
    schema,
  };
});

const fieldContext = useField(props.fieldName);
// @ts-expect-error ignore missing `id`
provide(FieldContextKey, fieldContext);

const deps = inject<ProvideInput<any>>("inputTypes");

const inputDeps = computed(() => {
  const [parent, nestedChild] = props.fieldName.split(".");

  if (parent && nestedChild) {
    return deps?.[parent]?.[nestedChild];
  }

  return deps?.[props.fieldName];
});

onMounted(() => {
  console.log(inputDeps.value);
});

provide(TUPLE_OBJECT_KEY, {
  isAccordion: false,
});
</script>

<template>
  <FieldArray v-slot="{ fields, remove, push }" as="section" :name="fieldName">
    <slot v-bind="props">
      <FormItem class="w-full col-span-full flex flex-col mt-4">
        <div class="flex w-full justify-between items-baseline mb-2">
          <AutoFormLabel :required="props.required" class="text-lg">
            {{
              props.config.label || beautifyObjectName(props.fieldName)
            }}
          </AutoFormLabel>
          <Button
            type="button"
            variant="default"
            class="mt-4 flex items-center"
            @click="
              push({
                rule: 'Igual',
                isPercentage: true,
              })
            "
          >
            <PlusIcon class="mr-2" :size="16" />
            Add
          </Button>
        </div>
        <template v-for="(field, index) of fields" :key="field.key">
          <div class="mb-2 p-0">
            <AutoFormField
              :field-name="`${fieldName}[${index}]`"
              :label="fieldName"
              :shape="itemShape!"
              :config="(config as Config<any>)"
            />

            <div class="!my-2 flex justify-end">
              <Button
                type="button"
                size="icon"
                variant="destructive"
                @click="remove(index)"
              >
                <TrashIcon :size="16" />
              </Button>
            </div>
            <Separator v-if="!field.isLast" />
          </div>
        </template>
      </FormItem>
    </slot>
  </FieldArray>
</template>
