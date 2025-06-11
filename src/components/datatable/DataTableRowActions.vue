<script setup lang="ts" generic="TData, TFilter=any">
import type { Row } from "@tanstack/vue-table";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/vue";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { computed, inject, ref, useSlots } from "vue";
import type { RowActionItemProps } from "@/components/datatable/table.types";
import DataTableRowActionSub from "./DataTableRowActionSub.vue";
import { toReactive, watchDeep } from "@vueuse/core";
import { RouterLink } from "vue-router";

interface DataTableRowActionsProps {
  row: Row<TData>;
  actionMenu: RowActionItemProps;
}

const props = defineProps<DataTableRowActionsProps>();

const slots = useSlots();

const { items, trigger, contextKey } = toReactive(props.actionMenu);
const contextData = (
  contextKey ? inject<TFilter>(contextKey) : null
) as TFilter | null;

type RowWithMiscProps = { row: Row<TData>; context: TFilter | null } & {
  otherProps?: object;
};

const flattenProps = ({
  row,
  context,
  otherProps,
}: {
  row: Row<TData>;
  context: TFilter | null;
  otherProps?: object;
}): RowWithMiscProps => {
  return {
    row,
    context,
    ...otherProps,
  };
};

const isLoading = ref(false);
// const isLoading = computed(() => {
//   const state = items.some((item) => item.loadingState);
//   console.log(state);
//   return state;
// });

watchDeep(
  items,
  () => {
    const state = items.some((item) => item.loadingState);
    isLoading.value = state;
    console.log(isLoading.value);
  },
  { immediate: true }
);

const canShow = computed(() =>
  trigger.showIf ? trigger.showIf(props.row) : true
);
</script>

<template>
  <component
    :is="trigger.custom?.component"
    v-bind="flattenProps(trigger.custom!.props(row, contextData!))"
    v-if="trigger.custom && canShow"
  />
  <DropdownMenu v-else-if="items.length > 0 && canShow">
    <DropdownMenuTrigger as-child>
      <slot
        v-if="slots.buttons"
        name="buttons"
        :loading="isLoading"
        :id="props.row.id"
        data-[state="open]:bg-muted"
      />

      <Button
        v-else
        variant="ghost"
        class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
      >
        <Icon icon="radix-icons:dots-horizontal" class="h-4 w-4" />
        <span class="sr-only" v-if="Boolean(trigger.label)">
          <!-- <Loader2 class="animate-spin h-6 w-6" v-if="isLoading" /> -->
          <template>
            {{ trigger.label }}
          </template>
        </span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="max-w-[260px]">
      <div class="" v-for="item in items" v-bind:key="item.label">
        <DataTableRowActionSub
          v-if="item.subrow && item.subrow.items.length > 0"
          :subitems="item.subrow"
        />

        <component
          :is="item.custom?.component"
          v-bind="flattenProps(item.custom!.props(row, contextData!))"
          v-else-if="
            Boolean(item.custom) && (item.showIf ? item.showIf(row) : true)
          "
        />

        <DropdownMenuItem
          v-else-if="item.showIf ? item.showIf(row) : true"
          @click="item.callback && item.callback(props.row, contextData)"
          :as-child="Boolean(item.href)"
        >
          <RouterLink :to="item.href(row)" v-if="item.href">
            <template v-if="item.icon && !Boolean(item.custom)">
              <Icon :icon="item.icon" class="!h-4 !w-4" />
            </template>
            <template v-if="item.label && !Boolean(item.custom)">
              {{ item.label }}
            </template>
          </RouterLink>
          <template v-else>
            <template v-if="item.icon && !Boolean(item.custom)">
              <Icon :icon="item.icon" class="!h-4 !w-4" />
            </template>
            <template v-if="item.label && !Boolean(item.custom)">
              {{ item.label }}
            </template>
          </template>

          <!-- <component :is="item.custom?.component" v-bind="item.custom?.props" v-else /> -->
        </DropdownMenuItem>

        <DropdownMenuSeparator v-if="item.insertSeparator" />
      </div>
    </DropdownMenuContent>
  </DropdownMenu>
  <template v-else-if="items.length <= 0 && canShow">
    <Button
      :loading="trigger.loadingState"
      :variant="trigger.variant"
      :size="trigger.size"
      :disabled="trigger.loadingState"
      @click="trigger.callback && trigger.callback(props.row, contextData!)"
    >
      <span class="flex items-center">
        <!-- <Loader2 v-if="loading" class="animate-spin" /> -->
        <Icon :icon="trigger.icon" v-if="trigger.icon" />
        {{ trigger.label }}
      </span>
    </Button>
  </template>
  <template v-else>
    <slot v-if="slots.buttons" name="buttons" data-[state="open]:bg-muted" />
    <Button
      v-else
      variant="ghost"
      class="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
    >
      <Icon icon="radix-icons:dots-horizontal" class="h-4 w-4" />
      <span class="sr-only" v-if="Boolean(trigger.label)">
        {{ trigger.label }}
      </span>
    </Button>
  </template>
</template>
