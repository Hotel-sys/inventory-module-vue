<script lang="ts" setup>
import DataTableToolbar from '../../../components/datatable/DataTableToolbar.vue';
import DataTable from '../../../components/datatable/DataTable.vue';
import useDatatable from '../../../composables/use-datatable';
import { useFilterModel } from '../../../composables/use-filter-model';
import { useGetExampleUsers } from '../query';
import { columns } from '../utils/columns';
import { Button } from '@/components/ui/button';

const { filters } = useFilterModel();

const { data, isLoading, isRefetching } = useGetExampleUsers();

const table = useDatatable({
  columns,
  filters,
  data,
  clientSidePagination: true
});

</script>

<template>
  <div class="h-screen w-full p-6 flex flex-col mt-10">
    <h1>Example Users</h1>

    <DataTable :is-loading="isLoading || isRefetching" :table="table" >
      <template #toolbar={table}>
        <DataTableToolbar :table="table" enable-search disable-column-filters search-column="name" v-model:search="filters.uniqueFilters.search" search-text="Search by name...">
          <template #custom-actions>
            <Button variant="default">New Example User</Button>
          </template>
        </DataTableToolbar>
      </template>
    </DataTable>
  </div>
</template>


<style>

</style>