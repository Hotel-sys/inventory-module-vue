<script setup lang="ts" generic="TData, TValue">
import type { Table as VueTable } from "@tanstack/vue-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FlexRender } from "@tanstack/vue-table";
import DataTablePagination from "./DataTablePagination.vue";
import { Skeleton } from "@/components/ui/skeleton";

interface DataTableProps {
  table: VueTable<TData>;
  isLoading?: boolean;
}

const props = defineProps<DataTableProps>();
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col gap-y-4">
      <slot name="toolbar" :table="table" />
    </div>

    <div class="rounded-md border dark:!border-zinc-500">
      <Table class="bg-white dark:bg-zinc-800">
        <TableHeader class="transition-all duration-300">
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
            class="transition-all duration-300"
          >
            <TableHead
              v-for="header in headerGroup.headers"
              :key="header.id"
              class="transition-all duration-300"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
                class="transition-all duration-300"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody class="bg-white dark:bg-zinc-800">
          <template v-if="isLoading">
            <TableRow v-for="_ in table.getState().pagination.pageSize">
              <TableCell v-for="__ in table.getAllColumns().length">
                <Skeleton class="h-5 w-2/4 min-w-[50px]" />
              </TableCell>
            </TableRow>
          </template>
          <template v-else-if="table.getRowModel().rows?.length > 0">
            <TableRow
              v-for="row in table.getRowModel().rows"
              :key="row.id"
              :data-state="row.getIsSelected() && 'selected'"
            >
              <TableCell
                v-for="(cell, index) in row.getVisibleCells()"
                class="min-w-28 px-2"
                :key="cell.id"
              >
                <FlexRender
                  :render="cell.column.columnDef.cell"
                  :props="cell.getContext()"
                />
              </TableCell>
            </TableRow>
          </template>

          <TableRow v-else>
            <TableCell
              :colspan="props.table.getAllColumns().length"
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <DataTablePagination :table="table" />
  </div>
</template>
