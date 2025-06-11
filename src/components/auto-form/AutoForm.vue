<script setup lang="ts" generic="T extends ZodObjectOrWrapped">
import type { FormContext, GenericObject } from "vee-validate";
import type { z, ZodAny } from "zod";
import type { Config, ConfigItem, Dependency, Shape } from "./interface";
import { Form } from "@/components/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import { computed, type HTMLAttributes, type HtmlHTMLAttributes, toRefs } from "vue";
import AutoFormField from "./AutoFormField.vue";
import { provideDependencies } from "./dependencies";
import {
  getBaseSchema,
  getBaseType,
  getDefaultValueInZodStack,
  getObjectFormSchema,
  type ZodObjectOrWrapped,
} from "./utils";
import { cn } from "../../lib/utils";
import { Button, type ButtonVariants } from "@/components/ui/button";
import { Icon } from "@iconify/vue";

const props = withDefaults(
  defineProps<{
    schema: T;
    form?: FormContext<GenericObject>;
    fieldConfig?: Config<z.infer<T>>;
    dependencies?: Dependency<z.infer<T>>[];
    class?: HtmlHTMLAttributes["class"];
    isLoading?: boolean;
    showSubmit?: boolean;
    submitText?: string;
    isFormSubmitting?: boolean;
    submitClass?: HTMLAttributes["class"];
    submitDisabled?: boolean;
    submitVariant?: ButtonVariants["variant"];
    size?: "small" | "large";
    formClass?: string;
    submitIcon?: string;
  }>(),
  {
    showSubmit: true,
    isFormSubmitting: false,
    submitDisabled: false,
    submitVariant: "default",
    size: "large",
  }
);

const emits = defineEmits<{
  submit: [event: z.infer<T>];
}>();

const { dependencies } = toRefs(props);
provideDependencies(dependencies);

const shapes = computed(() => {
  // @ts-expect-error ignore {} not assignable to object
  const val: { [key in keyof T]: Shape } = {};
  const baseSchema = getObjectFormSchema(props.schema);
  const shape = baseSchema.shape;
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
      schema: baseItem,
    };
  });
  return val;
});

const fields = computed(() => {
  // @ts-expect-error ignore {} not assignable to object
  const val: {
    [key in keyof z.infer<T>]: {
      shape: Shape;
      fieldName: string;
      config: ConfigItem;
    };
  } = {};
  for (const key in shapes.value) {
    const shape = shapes.value[key];
    val[key as keyof z.infer<T>] = {
      shape,
      config: props.fieldConfig?.[key] as ConfigItem,
      fieldName: key,
    };
  }
  return val;
});

const formComponent = computed(() => (props.form ? "form" : Form));
const formComponentProps = computed(() => {
  if (props.form) {
    return {
      onSubmit: props.form.handleSubmit((val) => emits("submit", val)),
    };
  } else {
    const formSchema = toTypedSchema(props.schema);
    return {
      keepValues: true,
      validationSchema: formSchema,
      onSubmit: (val: GenericObject) => emits("submit", val),
    };
  }
});
</script>

<template>
  <component
    :is="formComponent"
    v-bind="formComponentProps"
    :class="
      cn(
        'gap-x-4 space-y-2 relative z-10 w-full h-full',
        props.size === 'large' ? 'h-full' : 'h-fit',
        props.showSubmit && 'px-0.5 mb-auto',
        props.formClass
      )
    "
  >
    <div
      v-if="props.showSubmit"
      :class="
        cn(
          'flex flex-col space-y-2 gap-x-4 w-full  overflow-auto !z-20 px-1',
          props.showSubmit && 'px-0.5 h-full !mb-auto pb-4 !z-20',
          props.showSubmit && props.class
        )
      "
    >
      <slot name="customAutoForm" :fields="fields">
        <template v-for="(shape, key) of shapes" :key="key">
          <slot
            :shape="shape"
            :name="(key.toString() as keyof z.infer<T>)"
            :field-name="key.toString()"
            :config="(fieldConfig?.[key as keyof typeof fieldConfig] as ConfigItem)"
            :fields="fields"
          >
            <AutoFormField
              :config="(fieldConfig?.[key as keyof typeof fieldConfig] as ConfigItem)"
              :field-name="key.toString()"
              :shape="shape"
              :is-loading="props.isLoading"
            />
          </slot>
        </template>
      </slot>
    </div>
    <slot name="customAutoForm" :fields="fields" v-else>
      <template v-for="(shape, key) of shapes" :key="key">
        <slot
          :shape="shape"
          :name="(key.toString() as keyof z.infer<T>)"
          :field-name="key.toString()"
          :config="(fieldConfig?.[key as keyof typeof fieldConfig] as ConfigItem)"
          :fields="fields"
        >
          <AutoFormField
            :config="(fieldConfig?.[key as keyof typeof fieldConfig] as ConfigItem)"
            :field-name="key.toString()"
            :shape="shape"
            :is-loading="props.isLoading"
          />
        </slot>
      </template>
    </slot>

    <slot name="submitButton">
      <div
        v-if="props.showSubmit"
        :class="
          cn(
            'flex flex-col w-full justify-end pb-0 right-0 left-0 z-0  ',
            props.size === 'large'
              ? '!mt-auto pt-4 pb-2 mx-0 -bottom-8 sticky bg-white z-10 dark:!bg-zinc-800'
              : '!mt-6 bottom-0 bg-transparent relative'
          )
        "
      >
        <Button
          type="submit"
          :variant="props.submitVariant"
          size="lg"
          :class="cn('w-full rounded-md', props.submitClass)"
          :disabled="
            props.isLoading || props.isFormSubmitting || props.submitDisabled
          "
          :loading="props.isFormSubmitting"
        >
          <Icon :icon="props.submitIcon" v-if="props.submitIcon" />
          {{ props.submitText ?? "Submit" }}
        </Button>
      </div>
    </slot>

    <slot :shapes="shapes" />
  </component>
</template>
