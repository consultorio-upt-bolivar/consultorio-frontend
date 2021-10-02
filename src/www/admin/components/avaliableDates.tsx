
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { appointmentsActions } from '../../../_actions'
import { format } from 'date-fns'

export const AvaliableDates = (params: {
    dateFrom: Date
    dateEnd: Date
    specialityId: string
}) => {
    const { items: avaliableDates } = useSelector((state: any) => state.appointments)
    const dispatch = useDispatch()

    // Get avaliable dates
    useEffect(() => {
        if (params.specialityId == "") {
            return
        }

        dispatch(appointmentsActions.getAvaliableDates({
            dateFrom: format(params.dateFrom, 'yyyy-MM-dd'),
            dateEnd: format(params.dateEnd, 'yyyy-MM-dd'),
            specialityId: params.specialityId
        }))
    }, [params.dateFrom, params.dateEnd, params.specialityId])

    const avaliable = avaliableDates?.map((el: any) => {
        return (
            <span key={'d-' + el.date}>
                <p>
                    Fecha: {el.date}
                </p>
                <p>Horarios:</p>
                {el.hours?.map((h: any, i: number) => {
                    return <p key={'d-' + el.date + '-' + i}>Hora: {h}</p>
                })}
            </span>
        )
    })

    return (
        <>
            <p>Hola {JSON.stringify(params)}</p>


            {avaliable}
        </>
    )
}