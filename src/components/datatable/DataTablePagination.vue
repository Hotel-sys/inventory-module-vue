<script setup lang="ts" generic="TColumnType">
import type { Table } from "@tanstack/vue-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { Icon } from "@iconify/vue";

interface DataTablePaginationProps {
  table: Table<TColumnType>;
}

defineProps<DataTablePaginationProps>();
</script>

<template>
  <div
    class="flex items-center justify-between px-0 md:px-2 md:flex-row flex-col gap-y-2 pb-4 md:py-0"
  >
    <div
      class="text-sm text-muted-foreground flex items-baseline w-full justify-between md:w-auto md:items-center md:justify-between"
    >
      <div class="text-wrap w-1/3 md:w-fit text-zinc-800 dark:text-zinc-200">
        {{ table.getFilteredSelectedRowModel().rows.length }}
        Of
        {{ table.getFilteredRowModel().rows.length }}
        row(s) selected.
      </div>

      <div class="flex items-center space-x-2 md:hidden">
        <p class="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          <!-- {{ t("tabela.pagination.rowsPerPage") }} -->
            rows per page
        </p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="
            (val) => {
              table.setPageSize(+val);
            }
          "
        >
          <SelectTrigger class="h-8 min-w-[70px] max-w-fit">
            <SelectValue
              :placeholder="`${table.getState().pagination.pageSize}`"
            />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem
              v-for="pageSize in [5, 10, 20, 30, 40, 50]"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div
      class="flex items-center space-x-6 lg:space-x-8 justify-end w-full lg:w-fit lg:justify-start"
    >
      <div class="items-center space-x-2 hidden md:flex">
        <p class="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Rows per page
        </p>
        <Select
          :model-value="`${table.getState().pagination.pageSize}`"
          @update:model-value="
            (val) => {
              table.setPageSize(+val);
            }
          "
        >
          <SelectTrigger class="h-8 min-w-[70px] max-w-fit">
            <SelectValue
              :placeholder="`${table.getState().pagination.pageSize}`"
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem
              v-for="pageSize in [5, 10, 20, 30, 40, 50]"
              :key="pageSize"
              :value="`${pageSize}`"
            >
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div
        class="flex w-fit items-center justify-center font-medium text-sm text-zinc-800 dark:text-zinc-200"
        v-if="table.getPageCount() > 0"
      >
        Page
        {{ table.getState().pagination.pageIndex + 1 }}
        of
        {{ table.getPageCount() }}
      </div>
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!table.getCanPreviousPage()"
          @click="table.firstPage()"
        >
          <span class="sr-only">
            Go to first page
          </span>
          <Icon icon="radix-icons:double-arrow-left" class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanPreviousPage()"
          @click="table.previousPage()"
        >
          <span class="sr-only">
            Go to previous page
          </span>
          <Icon icon="radix-icons:chevron-left" class="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          class="h-8 w-8 p-0"
          :disabled="!table.getCanNextPage()"
          @click="table.nextPage()"
        >
          <span class="sr-only">
            Go to next page
          </span>
          <Icon icon="radix-icons:chevron-right" class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="!table.getCanNextPage()"
          @click="
            () => {
              //   const currentPage = table.getState().pagination.pageIndex;
              //   if (currentPage <= 1) {
              //     table.setPageIndex(1);
              //     return;
              //   }

              table.setPageIndex(table.getPageCount() - 1);
            }
          "
        >
          <span class="sr-only">
            Go to last page
          </span>
          <Icon icon="radix-icons:double-arrow-right" class="w-4 h-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
