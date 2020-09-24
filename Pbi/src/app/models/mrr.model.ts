import { CoordinatesModel } from './coordinates.model';

export interface MrrModel {
    mrrId: number;
    mrrType: string;
    startTime: Date;
    endTime: Date;
    worldData: Map<Date, [CoordinatesModel[], CoordinatesModel[]]>;
}