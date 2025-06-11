<script setup lang="ts" generic="T extends ZodRawShape">
import type { ZodAny, ZodObject, ZodRawShape } from "zod";
import type { Config, ConfigItem, Shape } from "./interface";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { FormItem } from "@/components/ui/form";
import { FieldContextKey, useField } from "vee-validate";
import { computed, inject, provide } from "vue";
import AutoFormField from "./AutoFormField.vue";
import AutoFormLabel from "./AutoFormLabel.vue";
import {
  beautifyObjectName,
  getBaseSchema,
  getBaseType,
  getDefaultValueInZodStack,
} from "./utils";
// import { TUPLE_OBJECT_KEY } from "@/components/ui/auto-form/constant";

const TUPLE_OBJECT_KEY = 'BLAH BLAH'

const props = defineProps<{
  fieldName: string;
  required?: boolean;
  config?: Config<T>;
  schema?: ZodObject<T>;
  disabled?: boolean;
  group?: boolean;
}>();

const shapes = computed(() => {
  // @ts-expect-error ignore {} not assignable to object
  const val: { [key in keyof T]: Shape } = {};

  if (!props.schema) return;
  const shape = getBaseSchema(props.schema)?.shape;
  if (!shape) return;

  Object.keys(shape).forEach((name) => {
    const item = shape[name] as ZodAny;
    const baseItem = getBaseSchema(item) as ZodAny;
    let options =
      baseItem && "values" in baseItem._def
        ? (baseItem._def.values as string[])
        : undefined;
    if (!Array.isArray(options) && typeof options === "object")
      options = Object.values(options);

    val[name as keyof T] = {
      type: getBaseType(item),
      default: getDefaultValueInZodStack(item),
      options,
      required: !["ZodOptional", "ZodNullable"].includes(item._def.typeName),
      schema: item,
    };
  });
  return val;
});

const fieldContext = useField(props.fieldName);
// @ts-expect-error ignore missing `id`
provide(FieldContextKey, fieldContext);

const tupleFieldContext = inject(TUPLE_OBJECT_KEY, {
  isAccordion: false,
});
</script>

<template>
  <section>
    <slot v-bind="props">
      <FormItem
        v-if="!tupleFieldContext.isAccordion"
        class="grid grid-cols-1 md:flex flex-wrap w-full gap-x-4 items-center"
      >
        <template v-for="(shape, key) in shapes" :key="key">
          <!-- <AutoFormLabel
            v-if="config && !config.hideLabel"
            class="text-base"
            :required="props.required"
          >
            {{ beautifyObjectName(key.toString()) }}
          </AutoFormLabel> -->
          <AutoFormField
            :config="(config?.[key as keyof typeof config] as ConfigItem)"
            :field-name="`${fieldName}.${key.toString()}`"
            :label="beautifyObjectName(key.toString())"
            :shape="shape"
          />
        </template>
      </FormItem>

      <Accordion
        type="single"
        as-child
        class="w-full"
        collapsible
        :disabled="disabled"
        :multiple="false"
        orientation="horizontal"
        :value="1"
        v-else
      >
        <FormItem>
          <AccordionItem
            :value="fieldName"
            class="hover:bg-gray-100 gap-x-2 focus:bg-gray-100 rounded-lg px-4"
          >
            <AccordionTrigger>
              <AutoFormLabel class="text-base" :required="required">
                {{ schema?.description || beautifyObjectName(fieldName) }}
              </AutoFormLabel>
            </AccordionTrigger>
            <AccordionContent class="py-2 px-0 md:p-2 gap-2 grid grid-cols-2">
              <template v-for="(shape, key) in shapes" :key="key">
                <AutoFormField
                  :config="config?.[key as keyof typeof config] as ConfigItem"
                  :field-name="`${fieldName}.${key.toString()}`"
                  :label="key.toString()"
                  :shape="shape"
                />
              </template>
            </AccordionContent>
          </AccordionItem>
        </FormItem>
      </Accordion>
    </slot>
  </section>
</template>
