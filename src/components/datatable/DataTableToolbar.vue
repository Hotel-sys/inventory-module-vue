<script setup lang="ts" generic="TData">
import type { Table } from "@tanstack/vue-table";
import { Input } from "@/components/ui/input";
import { computed, type HTMLAttributes, ref } from "vue";
import DataTableViewOptions from "./DataTableViewOptions.vue";
import { Icon } from "@iconify/vue";
import { cn } from "@/lib/utils";
import { useDebounceFn, watchDebounced } from "@vueuse/core";

interface DataTableToolbarProps {
  table: Table<TData>;
  searchText?: string;
  enableSearch?: boolean;
  searchInputClass?: HTMLAttributes["class"];
  searchColumn?: string;
  disableColumnFilters?: boolean;
}

const props = defineProps<DataTableToolbarProps>();
const isFiltered = computed(
  () => props.table.getState().columnFilters.length > 0
);

const isManualSorting = computed(() => props.table.options.manualFiltering);

const searchModel = defineModel<string>("search");
const searchValue = ref("");

watchDebounced(
  searchValue,
  () => {
    searchModel.value = searchValue.value;
  },
  { debounce: 600, flush: "post" }
);

const updateSearch = useDebounceFn((val) => {
  props.table.getColumn(props.searchColumn!)?.setFilterValue(val);
}, 600);

</script>

<template>
  <div
    class="flex items-baseline lg:justify-between mt-0 lg:mt-3 gap-y-4 sm:gap-y-1 flex-col-reverse sm:flex-col md:flex-row lg:gap-y-2 xl:!mt-2"
  >
    <div
      class="flex xl:flex-1 flex-col-reverse md:flex-row items-end sm:gap-x-4 lg:gap-x-4 w-full gap-y-2 md:gap-y-0"
    >
      <div class="relative w-fit items-center" v-if="props.enableSearch">
        <Input
          id="search"
          v-if="isManualSorting"
          :placeholder="
            props.searchText ? props.searchText : 'Search'
          "
          :class="
            cn(
              '!pl-10 h-8 md:min-w-[350px] w-full text-sm',
              props.searchInputClass
            )
          "
          v-model="searchValue"
        />
        <Input
          :placeholder="
            props.searchText ? props.searchText : t('tabela.buscar')
          "
          :model-value="(props.table.getColumn(props.searchColumn!)?.getFilterValue() as string) ?? ''"
          :class="
            cn(
              '!pl-10  h-8 w-full lg:min-w-[350px] text-sm  ',
              props.searchInputClass
            )
          "
          v-else
          @update:model-value="
          ($event: any) => {
            updateSearch($event)
          }
        "
        />
        <span
          class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
        >
          <Icon
            icon="radix-icons:magnifying-glass"
            class="w-5 h-5 text-gray-600"
          />
        </span>
      </div>

      <div
        class="w-full flex flex-col lg:flex-row items-end lg:items-baseline md:justify-between flex-wrap justify-end"
      >
        <slot name="custom-filter" :context="props.table" />
      </div>
      <!-- <Button
        v-if="isFiltered"
        variant="ghost"
        class="h-8 px-2 lg:px-3"
        @click="props.table.resetColumnFilters()"
      >
        Reset
        <Icon icon="radix-vue:cross" class="ml-2 h-4 w-4" />
      </Button> -->
    </div>
    <div
      class="flex items-center flex-row w-full xl:w-auto justify-end space-x-2 mt-2 md:mt-0"
    >
      <slot name="custom-actions" />
      <DataTableViewOptions
        :table="props.table"
        v-if="!props.disableColumnFilters"
      />
    </div>
  </div>
</template>
