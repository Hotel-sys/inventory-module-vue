// import { ProvideInput } from "@/utils/types/form.types";
import { type Updater } from "@tanstack/vue-table";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type ComputedRef, isRef, provide, type Ref } from "vue";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function animateVisiblityWhen(condition: boolean) {
  return condition ? "animate-on" : "animate-off";
}

export function beautifyObjectName(string: string) {
  let output = string.replace(/\[\d+\]/g, "").replace(/([A-Z])/g, " $1");
  output = output.charAt(0).toUpperCase() + output.slice(1);
  return output;
}

export function valueUpdater<T extends Updater<any>>(
  updaterOrValue: T,
  ref: Ref
) {
  return typeof updaterOrValue === "function"
    ? updaterOrValue(ref.value)
    : updaterOrValue;
}

export function defineInputs<TSchema extends any>(
  deps:
    | TSchema
    | ComputedRef<TSchema>
    | Ref<TSchema>
) {
  if (isRef(deps)) {
    provide("inputTypes", deps.value);
  } else {
    provide<TSchema>("inputTypes", deps);
  }
}



export function defineContext<TFilter extends object>(
  context: string,
  filters: TFilter
) {
  provide(context, filters);
}

export function ReverseMapping<
  T extends Record<string | number, string | number>,
  K extends keyof T,
  V extends T[K],
>(obj: T & Record<K, V>): { [P in V]: K extends string | number ? K : never } {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [value]: key,
    }),
    {}
  ) as { [P in V]: K extends string | number ? K : never };
}




export function camelCaseToWords(s: string) {
  const result = s.replace(/([A-Z])/g, " $1");
  return result.charAt(0).toUpperCase() + result.slice(1);
}



export function trueOrUndefined(condition: boolean) {
  return condition ? true : undefined;
}


export const normalizePercentTax = (value: number) =>
  (value * 100).toFixed(2) + "%";
