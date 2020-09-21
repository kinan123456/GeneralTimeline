/**
 * Data interface displayed on General Timeline.
 */
export interface EventModel {
    // Related MRR identifier.
    mrrId: number;
    // Name of the event.
    name: string;
    // Event time.
    occurrenceTime: Date;
}