export interface FunnelI {
    id: string
    name: string
    content: string
    tags: TagI[]
}

export interface CreateFunnelI {
    name: string
    comment: string
    tags: TagI[]
}

export interface UpdateFunnelI {
    comment: string
}
