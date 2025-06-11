<script setup lang="ts" generic="TData">
import type { Table } from "@tanstack/vue-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DataTableViewOptionsProps {
  table: Table<TData>;
}

const props = defineProps<DataTableViewOptionsProps>();
const columns = computed(() =>
  props.table
    .getAllColumns()
    .filter(
      (column) =>
        typeof column.accessorFn !== "undefined" && column.getCanHide()
    )
);
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <TooltipTrigger as-child>
            <Button
              variant="outline"
              size="icon"
              class="ml-auto hidden h-8 lg:flex"
            >
              <Icon icon="radix-icons:mixer-horizontal" />
            </Button>
          </TooltipTrigger>
          <TooltipContent> Toggle columns </TooltipContent>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" class="w-[150px]">
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuCheckboxItem
            v-for="column in columns"
            :key="column.id"
            class="capitalize"
            :checked="column.getIsVisible()"
            @update:checked="(value) => column.toggleVisibility(!!value)"
          >
            {{ column.id }}
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </Tooltip>
  </TooltipProvider>
</template>
