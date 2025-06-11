<script lang="ts" setup generic="TRow">
import DataTableRowActions from './DataTableRowActions.vue';
import { Button } from "@/components/ui/button";
import { type RowActionItemProps } from "@/components/datatable/table.types";
import { Icon } from "@iconify/vue";
import { type Row } from "@tanstack/vue-table";
import { inject } from "vue";

interface DataTableRowActionsProps {
  row: Row<TRow>;
  actionMenu: RowActionItemProps[];
}

const props = defineProps<DataTableRowActionsProps>();
</script>

<template>
  <div class="flex justify-start w-full gap-x-2">
    <DataTableRowActions
      :row="props.row"
      v-for="(actions, index) in props.actionMenu"
      :actionMenu="actions"
      v-bind:key="index"
    >
      <template #buttons="{ loading }">
        <Button
          :loading="loading"
          :variant="actions.trigger.variant"
          :size="actions.trigger.size"
          :disabled="loading"
          @click="
            actions.trigger.callback &&
              actions.trigger.callback(
                props.row,
                inject(actions.contextKey ?? '')
              )
          "
          v-if="
            actions.trigger.showIf ? actions.trigger.showIf(props.row) : true
          "
        >
          <span class="flex items-center">
            <!-- <Loader2 v-if="loading" class="animate-spin" /> -->
            <Icon :icon="actions.trigger.icon" v-if="actions.trigger.icon" />
            {{ actions.trigger.label }}
          </span>
          <Icon
            icon="radix-icons:chevron-down"
            v-if="actions.items.length > 0 && !Boolean(actions.trigger.icon)"
          />
        </Button>
      </template>
    </DataTableRowActions>
  </div>
</template>

<style></style>
