import type {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/vue-table";

import { ref, toRef } from "vue";

export interface IFilterModel {
  sorting?: SortingState;
  columnFilters?: ColumnFiltersState;
  columnVisibility?: VisibilityState;
  pagination?: Partial<PaginationState>;
}

export type IFilterModelWithCustom<TUniqueFilters = any> =
  Partial<IFilterModel> & {
    uniqueFilters: TUniqueFilters;
  };

export type DefaultUniqueFilters = {
  search?: string;
  status?: string | number;
  estabelecimentoId?: number;
};

export type ExcludeFilters<TFilterModel extends object> = Record<
  keyof TFilterModel,
  boolean
>;

export function useFilterModel<TUniqueFilters = DefaultUniqueFilters>(
  uniqueFilters?: TUniqueFilters,
  customTableFilters?: IFilterModel
) {
  const snapshot = uniqueFilters;

  const defaultFilters = {
    columnFilters: [],
    columnVisibility: {},
    pagination: {
      pageIndex: 0,
      pageSize: 5,
    },
    sorting: [{ id: "id", desc: true }],
  } satisfies IFilterModel;

  const filters = ref<IFilterModelWithCustom<TUniqueFilters>>({
    ...defaultFilters,
    ...customTableFilters,
    uniqueFilters: uniqueFilters ?? ({} as TUniqueFilters),
  });

  const resetFilters = () => {
    filters.value = {
      ...defaultFilters,
      ...customTableFilters,
      uniqueFilters: snapshot ?? ({} as TUniqueFilters),
    };
  };

  return {
    filters,
    resetFilters,
  };
}
