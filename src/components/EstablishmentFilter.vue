<template>
  <ComboBox
    :isLoading="isLoading"
    :options="options"
    v-model="modelValue"
    resultNotFoundTest="No results..."
    class="w-full"
    seachPlaceholder="Search a establishment..."
    triggerButtonText="Select a establishment"
    :selector="props.selector"
    triggerButtonClass="mt-0 text-xs sm:text-sm px-1.5 md:px-3 min-w-full col-span-1"
  >
  </ComboBox>
</template>

<script setup lang="ts">
import ComboBox from "@/components/parts/combobox/ComboBox.vue";
import { useCompaniesForSelect } from "@/composables/query/company.query";
import {
  DefaultUniqueFilters,
  useFilterModel,
} from "@/composables/use-filter-model";
import { toReactive, useVModel } from "@vueuse/core";
import { computed } from "vue";

const { filters } = useFilterModel<DefaultUniqueFilters>(
  { search: "" },
  { pagination: { pageIndex: 0, pageSize: -1 } }
);

const { data, isLoading, isSuccess } = useCompaniesForSelect();

const emits = defineEmits<{
  (e: "update:modelValue", payload: string | number): void;
}>();

interface ModelProps {
  modelValue: string | number;
  defaultValue?: string | number;
  selector?: "label" | "value";
}

const props = defineProps<ModelProps>();

const modelValue = useVModel(props, "modelValue", emits, {
  passive: true,
  defaultValue: props.defaultValue,
  deep: true,
});

const options = computed(() => {
  if (isSuccess.value && Array.isArray(data.value)) {
    return data.value.map((estabelecimentoId) => ({
      label: estabelecimentoId.nomeFantasia || "Unknown",
      value: estabelecimentoId.id || "Unknown",
    }));
  }
  return [];
});
</script>

<style lang="scss" scoped></style>
