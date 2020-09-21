export interface MrrModel {
    mrrId: number;
    mrrType: string;
    startTime: Date;
    endTime: Date;
    worldData: Map<Date, [M: [x: number, y: number], E: [x: number, y: number]]>;
}