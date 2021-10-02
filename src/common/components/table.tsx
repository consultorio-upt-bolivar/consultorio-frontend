import { IconButton, makeStyles, Theme } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'

import {
  DataGrid,
  GridApi,
  GridColDef,
  GridRowId,
  GridRowModel,
  esES,
} from '@mui/x-data-grid'
import React from 'react'
import theme from '../theme/main'

export interface DataTablaParams {
  columns: GridColDef[]
  rows: GridRowModel[]
  deleteAction: (id: number) => void
  editAction: (id: number) => void
}

export const DataTable = ({
  columns,
  rows,
  deleteAction,
  editAction,
}: DataTablaParams): React.ReactElement => {
  columns.push({
    field: 'actions',
    headerName: 'Acciones',
    renderCell: RowMenuCell(deleteAction, editAction),
    sortable: false,
    width: 100,
    headerAlign: 'center',
    filterable: false,
    align: 'right',
    disableColumnMenu: true,
    disableReorder: true,
  })

  return (
    <DataGrid
      localeText={(esES as any).props.MuiDataGrid.localeText}
      columns={columns}
      rows={rows}
    />
  )
}

interface RowMenuProps {
  api: GridApi
  id: GridRowId
}

export function RowMenuCell(
  deleteAction: (id: number) => void,
  editAction: (id: number) => void
): (props: RowMenuProps) => React.ReactNode {
  const node = (props: RowMenuProps) => {
    const { id } = props
    const classes = useRowMenuStyles()

    const handleEditClick = (event: any) => {
      event.stopPropagation()
      editAction(Number(id))
    }

    const handleDeleteClick = (event: any) => {
      event.stopPropagation()
      deleteAction(Number(id))
    }

    return (
      <div className={classes.root}>
        <IconButton
          color="inherit"
          className={classes.textPrimary}
          size="small"
          aria-label="edit"
          onClick={handleEditClick}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton
          color="inherit"
          size="small"
          aria-label="delete"
          onClick={handleDeleteClick}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </div>
    )
  }

  return node
}

const useRowMenuStyles = makeStyles(
  (theme: Theme) => ({
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: theme.spacing(1),
      color: theme.palette.text.secondary,
    },
    textPrimary: {
      color: theme.palette.text.primary,
    },
  }),
  { defaultTheme: theme }
)
