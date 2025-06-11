import { type ButtonVariants } from "@/components/ui/button";
import { type Row } from "@tanstack/vue-table";
import { type Component } from "vue";
import { type RouterLinkProps } from "vue-router";

type RowActionComponent<TRow = any, TFilter = any> = {
  component: Component;
  props: (
    row: Row<TRow>,
    context: TFilter | null
  ) => { row: Row<TRow>; context: TFilter | null; otherProps?: object };

  showIf?: (row: Row<TRow>) => boolean;
};

export interface RowActionItem<TRow = any, TContext = any> {
  label?: string;
  icon?: string;
  callback?: (row: Row<TRow>, context: TContext | null) => void;
  subrow?: RowActionItemProps<TRow, TContext>;
  insertSeparator?: boolean;
  custom?: RowActionComponent<TRow, TContext>;
  loadingState?: boolean;
  href?: (row: Row<TRow>) => RouterLinkProps["to"];
  showIf?: (row: Row<TRow>) => boolean;
}

export interface RowActionItemTrigger<TRow = any, TContext = any>
  extends Omit<RowActionItem<TRow, TContext>, "label"> {
  label?: string;
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  icon?: string;
  showIf?: (row: Row<TRow>) => boolean;
}

export interface RowActionItemProps<TRow = any, TContext = any> {
  trigger: RowActionItemTrigger<TRow, TContext>;
  items: RowActionItem<TRow, TContext>[];
  contextKey?: string;
}
