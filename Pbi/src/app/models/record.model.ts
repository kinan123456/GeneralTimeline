/**
 * Data interface displayed on General Timeline.
 */
export interface RecordModel {
    // Related MRR identifier.
    mrrId: number;
    // Name of the event.
    name: string;
    // Event time.
    occurrenceTime: Date;
}