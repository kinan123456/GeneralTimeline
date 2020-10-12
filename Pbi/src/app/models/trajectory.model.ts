import { CoordinatesModel } from './coordinates.model';

export interface TrajectoryModel {
    time : Date,
    path1 : CoordinatesModel[],
    path2 : CoordinatesModel[],
}