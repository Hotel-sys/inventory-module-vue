import type { ColumnDef } from "@tanstack/vue-table";
import type { ExampleUser } from "../types";
import { h } from "vue";
import DataTableColumnHeader from "../../../components/datatable/DataTableColumnHeader.vue";
import type { RowActionItemProps } from "../../../components/datatable/table.types";
import ActionsList from "../../../components/datatable/ActionsList.vue";
import Edit from "../components/Edit.vue";
import Delete from "../components/Delete.vue";
// import { ExampleDelete, ExampleEdit } from "../components";

const actionMenu: RowActionItemProps<ExampleUser>[]= [
    {
        trigger: {
            variant: 'outline',
            size: 'sm',
            icon: 'lucide:ellipsis-vertical',
        },
        items: [
            {
                custom: {
                    component: Edit,
                    props: (row, context) => ({ row, context })
                }
            },
            {
                custom: {
                    component: Delete,
                    props: (row, context) => ({ row, context })
                }
            }
        ]
    }
]

export const columns: ColumnDef<ExampleUser>[] = [
    {
        accessorKey: 'id',
        id: 'ID',
        header: ({column}) => h(DataTableColumnHeader<ExampleUser>, {
            title: 'ID',
            column
        }),
        cell: ({row}) => row.getValue('ID'),
    },
    {
        accessorKey: 'name',
        id: 'name',
        header: ({column}) => h(DataTableColumnHeader<ExampleUser>, {
            title: 'Name',
            column
        }),
        cell: ({row}) => row.getValue('name'),
    },
    {
        accessorKey:'email',
        id: 'email',
        header: ({column}) => h(DataTableColumnHeader<ExampleUser>, {
            title: 'Email',
            column
        }),
        cell: ({row}) => row.getValue('email'),
    },
    {
        accessorFn: (row) => row.address.city,
        id: 'city',
        header: ({column}) => h(DataTableColumnHeader<ExampleUser>, {
            title: 'City',
            column
        }),
        cell: ({row}) => row.getValue('city'),
    },
    {
        id: 'actions',
        header: ({column}) => h(DataTableColumnHeader<ExampleUser>, {
            title: 'Actions',
            column
        }),
        cell: ({row}) => h(ActionsList<ExampleUser>, {
            row,
            actionMenu
        })
    }
]
