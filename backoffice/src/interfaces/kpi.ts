export interface KpiI {
    id: string
    dimensions: {
        filter: {}
    }
    range: {
        start: string
        end: string
        step: string
    }
    data_type: string
    visual_type: string
}

export interface CreateKpiI {
    dimensions: {
        filter: {}
    }
    range: {
        start: string
        end: string
        step: string
    }
    data_type: string
    visual_type: string
}

export interface UpdateKpiI {
    dimensions: {
        filter: {}
    }
    range: {
        start: string
        end: string
        step: string
    }
    data_type: string
    visual_type: string
}
