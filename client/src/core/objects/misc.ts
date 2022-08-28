// All decimal degrees (DD) expressed as lat, lng (Google, ISO 6709). 
// Note: Strava API & GeoJSON std express expressed as lng, lat
import { AllChallengeCategories } from "core/libs/challenges"

export class GeoJSON {
    public lng: number = 0.0
    public lat: number = 0.0

    public constructor(lng: number, lat: number, ) {
        this.lng = lng
        this.lat = lat
    }

    public get_lng_lat() {
        return [this.lng, this.lat]
    }

    public get_lat_lng() {
        return [this.lat, this.lng]
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