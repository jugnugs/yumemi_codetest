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
    name: string,
    data: number[]
}
