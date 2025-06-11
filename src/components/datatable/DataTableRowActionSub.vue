<script lang="ts" setup generic="TData">
import type { RowActionItemProps } from "../datatable/table.types";

import {
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuItem
} from "../ui/dropdown-menu";

interface DTableRowActionSubProps {
  subitems: RowActionItemProps;
}

const { subitems } = defineProps<DTableRowActionSubProps>();
</script>

<template>
  <DropdownMenuSub>
    <DropdownMenuSubTrigger>
      <span class="sr-only">
        {{ subitems.trigger.label }}
      </span>
    </DropdownMenuSubTrigger>
    <DropdownMenuSubContent>
      <div class="" v-for="item in subitems.items">
        <DataTableRowActionSub
          v-if="item.subrow && item.subrow.items.length > 0"
          :subitems="item.subrow"
        />
        <DropdownMenuItem v-else @click="item.callback">
          {{ item.label }}
        </DropdownMenuItem>

        <DropdownMenuSeparator v-if="item.insertSeparator" />
      </div>
    </DropdownMenuSubContent>
  </DropdownMenuSub>
</template>

<style></style>
