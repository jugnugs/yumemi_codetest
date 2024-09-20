export interface GraphResponseData {
    label: string,
    data: [
        {
            year: number,
            value: number
        }
    ]
}

export interface AggregateGraphData {
    [key: string]: GraphData[],
}

export interface GraphData {
    name: string,
    data: number[]
}
