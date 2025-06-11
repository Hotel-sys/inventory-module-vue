<script lang="ts" setup>
import { computed, type HTMLAttributes, ref, watch } from "vue";
import { cn } from "../lib/utils";
import { Button, type ButtonVariants } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";


const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes["class"];
    type?: "modal" | "menu";
    enableControl?: boolean;
    control?: boolean;
    auto?: boolean;
    confirmVariant?: ButtonVariants["variant"];
    loading?: boolean;
    confirmType?: HTMLButtonElement["type"];
    confirmDisabled?: boolean;
    confirmText?: string;
  }>(),
  {
    class: "",
    type: "modal",
    open: false,
    loading: false,
  }
);

const controlOpen = ref(false);

const emits = defineEmits<{
  (e: "confirm"): void;
}>();

const onConfirm = () => {
  emits("confirm");
};

watch(
  props,
  () => {
    if (props.control) {
      setTimeout(() => {
        controlOpen.value = false;
      }, 150);
    } else controlOpen.value = true;

    console.log(controlOpen.value);
  },
  { deep: true, flush: "post", immediate: false }
);
</script>

<template>
  <Dialog class="" modal :open="!enableControl ? undefined : controlOpen">
    <DialogTrigger as-child v-if="props.type === 'modal'">
      <slot name="trigger" />
    </DialogTrigger>

    <DialogTrigger as-child v-else>
      <DropdownMenuItem @select.prevent>
        <slot name="trigger" />
      </DropdownMenuItem>
    </DialogTrigger>
    <DialogContent :class="cn('', props.class)">
      <DialogHeader>
        <DialogTitle>
          <slot name="title" />
        </DialogTitle>
      </DialogHeader>
      <div class="w-full flex items-center justify-center space-y-4 px-4">
        <slot name="content" />
      </div>
      <DialogFooter class="mt-2 flex flex-col px-10" v-if="auto">
        <div class="flex items-center justify-center space-x-2">
          <DialogClose as-child>
            <Button size="default" variant="ghost">
              Cancelar
            </Button>
          </DialogClose>
          <Button
            size="default"
            :variant="props?.confirmVariant ?? 'default'"
            @click="onConfirm"
            :type="props?.confirmType ?? 'button'"
            :loading="props.loading"
            :disabled="props?.confirmDisabled"
          >
            {{ props?.confirmText ?? "Confirmar" }}
          </Button>
        </div>
      </DialogFooter>
      <slot name="default" v-else />
    </DialogContent>
  </Dialog>
</template>

<style></style>
