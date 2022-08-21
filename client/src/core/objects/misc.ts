// All decimal degrees (DD) expressed as lat, lng (Google, ISO 6709). 
// Note: Strava API & GeoJSON std express expressed as lng, lat
import { AllChallengeCategories } from "core/libs/challenges"

export class GeoJSON {
    public lat: number = 0.0
    public lng: number = 0.0

    public constructor(lat: number, lng: number, ) {
        this.lat = lat
        this.lng = lng
    }

    public get() {
        return [this.lng, this.lat]
    }
}

export class CategoryProgress {
    public events: any[] = []
    public complete: any[] = []
    public not_complete: any[] = []

    public constructor(events: AllChallengeCategories) {
        this.events = events
        this.calc_complete()
    }

    private calc_complete() {
        this.events.forEach(event => {
            if (event.is_complete) {
                this.complete.push(event)
            } else {
                this.not_complete.push(event)
            }
        })
    }
}