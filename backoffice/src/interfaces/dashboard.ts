export interface DashboardI {
    id: string
    title: string
    dashboard_elements: DashboardElementI[]
}

export interface DashboardElementI {
    id: string
    dashboard_id: string
    dashboard: DashboardI
    dashboard_type: DashboardType
    position: number
    height: number
    width: number
}

export interface CreateDashboardI {
    title: string
}

export interface CreateDashboardElementI {
    dashboard_id: string
    dashboard_type: DashboardType
    position: number
    height: number
    width: number
}

export enum DashboardType {
    HEATMAP = 'HEATMAP',
    KPI = 'KPI',
    GRAPH = 'GRAPH'
}