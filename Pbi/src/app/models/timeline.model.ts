import { EventModel } from './event.model';

export interface TimelineModel {
    startTime: Date;
    endTime: Date;
    records: EventModel[];
}