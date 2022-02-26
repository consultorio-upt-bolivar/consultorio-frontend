import React from 'react'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'
import { IconButton, makeStyles } from '@material-ui/core'
import { RemoveRedEyeOutlined } from '@material-ui/icons'

import {
  DataGrid,
  GridApi,
  GridColDef,
  GridRowId,
  GridRowModel,
  esES,
} from '@mui/x-data-grid'

import theme from '../../theme/main';
import { alertActions } from '../../_actions'
import { useDispatch } from 'react-redux'

export interface DataTablaParams {
  columns: GridColDef[]
  rows: GridRowModel[]
  deleteAction?: (id: number) => void
  toggleAction?: (id: number) => void
  editAction?: (id: number) => void
  onRowClick?: (params: any) => void
}

export function DataTable({
  columns,
  rows,
  deleteAction,
  toggleAction,
  editAction,
  onRowClick
}: DataTablaParams): React.ReactElement {
  if(editAction || toggleAction || deleteAction) {
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
  }

  return <DataGrid
    sx={{
      mt: 3
    }}
    localeText={esES.components.MuiDataGrid.defaultProps.localeText}
    columns={columns}
    rows={rows}
    onRowClick={(params) => {
      if (!onRowClick) return;
      onRowClick(params.row);
    }}
  />
}

export interface RowMenuProps {
  api: GridApi
  id: GridRowId
  row: any
}

interface HandleClickProps {
  event: any,
  id: number,
  title: string,
  description: string,
  fn?: (id: number) => void
}

function RowMenuCell({
  deleteAction,
  toggleAction,
  editAction,
}: {
  editAction?: (id: number) => void,
  toggleAction?: (id: number) => void,
  deleteAction?: (id: number) => void
}): (props: RowMenuProps) => React.ReactNode {
  const node = (props: RowMenuProps) => {
    const { id, row: { isActive, name } } = props

    const classes = useRowMenuStyles()
    const dispatch = useDispatch()

    const handleClick = ({
      event,
      id,
      fn,
      title,
      description
    }: HandleClickProps) => {
      if (!fn) return;

      event.stopPropagation();

      dispatch(alertActions.show({
        title,
        description,
        callback: () => {
          fn(id);
        }
      }));
    }

    return (
      <div className={classes.root}>
        {editAction ? <IconButton
          color="inherit"
          className={classes.textPrimary}
          size="small"
          aria-label="edit"
          onClick={(e) => {
            e.stopPropagation()
            editAction(Number(id))
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton> : null}

        {deleteAction ? <IconButton
          color="inherit"
          size="small"
          aria-label="delete"
          onClick={(e) => handleClick({
            event: e, id: Number(id), fn: deleteAction, title: `Eliminar elemento`, description: `¿Está seguro de eliminar el elemento ${name ?? id}?`
          })}
        >
          <DeleteIcon fontSize="small" />
        </IconButton> : null}

        {toggleAction ? <IconButton
          color="inherit"
          size="small"
          aria-label="toggle"
          onClick={(e) => handleClick({
            event: e, id: Number(id), fn: toggleAction, title: `Cambiar visibilidad`, description: `¿Está seguro de  ${isActive ? 'desactivar' : 'activar'} la visibilidad elemento ${name ?? id}?`
          })}
        >
          <RemoveRedEyeOutlined fontSize="small" />
        </IconButton> : null}
      </div>
    )
  }

  return node
}

export const useRowMenuStyles = makeStyles({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  textPrimary: {
    color: theme.palette.text.primary,
  },
})
