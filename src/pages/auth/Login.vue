
<script lang="ts" setup>
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/feature/authentication/components';


</script>


<template>
  <Card class="h-auto w-1/4 mx-auto mt-40">
    <CardHeader>
      <CardTitle>Sign with your account</CardTitle>
      <CardDescription>If you forgot your credentials, contact your admin.</CardDescription>
    </CardHeader>
    <CardContent>
      <LoginForm />
    </CardContent>
  </Card>
</template>

<style>

</style>