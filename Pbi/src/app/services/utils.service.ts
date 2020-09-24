import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {
    /**
     * Gets the first time that came before the given time in the input array (or the time itself if its there)
     */
	public getClosestTime(targetTime: Date, times: Date[]): Date {
		// If the time exists in the list, return it
		if (times.indexOf(targetTime) > -1){
			return targetTime
		}
		
		// Otherwise return the closest time before it
		let diffs = times.map(d => Math.abs(targetTime.getTime() - new Date(d).getTime()));
		var idx = diffs.indexOf(Math.min(...diffs));
		return times[idx];
    }
    
    public sortDatesArray(arr: Date[]) {
        return arr.sort((a,b)=>a.getTime()-b.getTime());
    }
}