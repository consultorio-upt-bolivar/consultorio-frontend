export interface GetALL {
  total?: number
  where?: string
  limit: number
  offset: number
  filter?: (el: any) => boolean
}
