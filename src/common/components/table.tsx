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
import { RemoveRedEyeOutlined } from '@material-ui/icons'

export interface DataTablaParams {
  columns: GridColDef[]
  rows: GridRowModel[]
  deleteAction?: (id: number) => void
  toggleAction?: (id: number) => void
  editAction?: (id: number) => void
}

export const DataTable = ({
  columns,
  rows,
  deleteAction,
  toggleAction,
  editAction,
}: DataTablaParams): React.ReactElement => {
  columns.push({
    field: 'actions',
    headerName: 'Acciones',
    renderCell: RowMenuCell({ editAction, toggleAction, deleteAction }),
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

export function RowMenuCell({
  deleteAction,
  toggleAction,
  editAction,
}: {
  editAction?: (id: number) => void,
  toggleAction?: (id: number) => void,
  deleteAction?: (id: number) => void
}): (props: RowMenuProps) => React.ReactNode {
  const node = (props: RowMenuProps) => {
    const { id } = props
    const classes = useRowMenuStyles()

    const handleClick = (event: any, id: number, fn: (id: number) => void) => {
      event.stopPropagation()
      fn(id)
    }

    return (
      <div className={classes.root}>
        {editAction ? <IconButton
          color="inherit"
          className={classes.textPrimary}
          size="small"
          aria-label="edit"
          onClick={(e) => handleClick(e, Number(id), editAction)}
        >
          <EditIcon fontSize="small" />
        </IconButton> : null}

        {deleteAction ? <IconButton
          color="inherit"
          size="small"
          aria-label="delete"
          onClick={(e) => handleClick(e, Number(id), deleteAction)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton> : null}

        {toggleAction ? <IconButton
          color="inherit"
          size="small"
          aria-label="toggle"
          onClick={(e) => handleClick(e, Number(id), toggleAction)}
        >
          <RemoveRedEyeOutlined fontSize="small" />
        </IconButton> : null}
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
