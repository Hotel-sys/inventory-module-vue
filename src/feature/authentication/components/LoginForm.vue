
<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { loginFieldConfig, loginSchema, type TLoginSchema } from '../utils/schema';
import { toTypedSchema } from '@vee-validate/zod';
import { AutoForm } from '@/components/auto-form';
import { useSignInWithEmail } from '../query';
import { useRouter } from 'vue-router';
import { toast } from 'vue-sonner';


const form = useForm<TLoginSchema>({
    validationSchema: toTypedSchema(loginSchema),
    validateOnMount: false,
    keepValuesOnUnmount: false
});

const { mutateAsync, isPending, isSuccess } = useSignInWithEmail();
const router = useRouter();

const handleSubmit = async (values: TLoginSchema) => {
  await mutateAsync(values, {
    onSuccess(data) {
      toast(data.message, {
        closeButton: true,
        position: 'bottom-right'
      })

      router.replace('/')
    },
    onError(error) {
      console.error(error);
      toast('Failed to login', {
        description: "Check your credentials and try again",
        closeButton: true
      })
    }
  })

}


</script>


<template>
  <AutoForm :schema="loginSchema" :is-form-submitting="isPending" @submit="handleSubmit" :form="form" :field-config="loginFieldConfig" size="large" submit-variant="default" submit-text="Sign in" />
</template>

<style>

</style>