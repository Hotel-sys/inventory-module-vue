import { valueUpdater } from "@/lib/utils";
import {
  type ColumnDef,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowModel,
  type RowSelectionState,
  type Table,
  useVueTable,
} from "@tanstack/vue-table";
import { computed, type Ref, ref, toRef } from "vue";
import { type IFilterModelWithCustom } from "@/composables/use-filter-model";
// import { Response } from "@/utils/types/api.types"
// ;

import type { Response } from "@/api/api.types";

interface UseDataTableProps<T, TFilter = any> {
  data: Ref<Response<T>> | Ref<undefined>;
  columns: ColumnDef<T>[];
  filters: Ref<IFilterModelWithCustom<TFilter>>;
}

interface UseDataTableConfig<T> {
  clientSidePagination?: boolean;
  manualFiltering?: boolean;
  hideRowsWhere?(): (table: Table<any>) => () => RowModel<any>;
}

export default function useDatatable<T, TFilter>({
  data,
  columns,
  filters,
  clientSidePagination = false,
  manualFiltering = false,
}: UseDataTableProps<T, TFilter> & UseDataTableConfig<T>) {
  const rowSelection = ref<RowSelectionState>({});

  const table = computed(() =>
    useVueTable({
      rowCount: data.value?.count ?? 0,
      get data() {
        return (
          data.value?.results ?? []
        );
      },
      get columns() {
        return columns;
      },
      state: {
        pagination: {
          pageIndex: filters.value.pagination!.pageIndex ?? 0,
          pageSize: filters.value.pagination!.pageSize ?? 5,
        },
        sorting: filters.value.sorting,
        get columnFilters() {
          return filters.value.columnFilters;
        },
        get columnVisibility() {
          return filters.value.columnVisibility;
        },
        get rowSelection() {
          return rowSelection.value;
        },
      },
      onPaginationChange: (updaterOrValue) => {
        filters.value.pagination = valueUpdater(
          updaterOrValue,
          toRef(filters.value.pagination)
        );
      },
      manualPagination: !clientSidePagination,
      manualSorting: !clientSidePagination,
      enableMultiRowSelection: true,
      manualFiltering: manualFiltering,
      onSortingChange: (updaterOrValue) => {
        filters.value.sorting = valueUpdater(
          updaterOrValue,
          toRef(filters.value.sorting)
        );
      },
      onColumnFiltersChange: (updaterOrValue) => {
        filters.value.columnFilters = valueUpdater(
          updaterOrValue,
          toRef(filters.value.columnFilters)
        );
      },
      onColumnVisibilityChange: (updaterOrValue) =>
        valueUpdater(updaterOrValue, toRef(filters.value.columnVisibility)),
      onRowSelectionChange: (updaterOrValue) => {
        rowSelection.value = valueUpdater(updaterOrValue, rowSelection);
      },
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
    })
  );

  return table;
}
