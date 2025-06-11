<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Wallet } from "@/utils/types/wallet.types";
import { animateVisiblityWhen, cn } from "@/utils/utils";
import { Table } from "@tanstack/vue-table";
import {
  CheckboxRootEmits,
  CheckboxRootProps,
  useForwardPropsEmits,
} from "radix-vue";
import { computed, HTMLAttributes } from "vue";
import { Icon } from "@iconify/vue";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "vue-i18n";

const props = defineProps<
  {
    table: Table<Wallet>;
    class: HTMLAttributes["class"];
  } & CheckboxRootProps
>();

const emits = defineEmits<CheckboxRootEmits>();

const delegatedProps = computed(() => {
  const { table, class: _, ...delegated } = props;

  return delegated;
});

const { t } = useI18n();

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <div class="flex items-center gap-x-2">
    <Checkbox v-bind="forwarded" :class="cn('translate-y-0.5', props.class)" />

    <Button
      size="xs"
      variant="ghost"
      @click="props.table.resetRowSelection()"
      :class="
        cn(
          'transition-all duration-150',
          animateVisiblityWhen(
            props.table.getSelectedRowModel().rows.length >= 1
          )
        )
      "
    >
      <Icon icon="tabler:filter-check" />

      {{ t("carteiraPagamento.clearSelection") }}
      <Badge variant="default">{{
        props.table.getSelectedRowModel().rows.length
      }}</Badge>
    </Button>
  </div>
</template>

<style></style>
