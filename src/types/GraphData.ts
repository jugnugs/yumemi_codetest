export interface GraphResponseData {
    label: string,
    data: [
        {
            year: number,
            value: number
        }
    ]
}

export interface GraphData {
    areaName: string,
    data: number[]
}
