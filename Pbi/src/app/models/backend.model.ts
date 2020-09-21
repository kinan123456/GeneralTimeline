import { RecordModel } from './record.model';

export interface BackendModel {
    startTime: Date;
    endTime: Date;
    records: RecordModel[];
}