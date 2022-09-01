// All decimal degrees (DD) expressed as lat, lng (Google, ISO 6709). 
// Note: Mapbox, Strava API & GeoJSON std express expressed as lng, lat
import { AllChallengeCategories } from "core/libs/challenges"

export class GeoJSON {
    public lat: number = 0.0
    public lng: number = 0.0

    // TODO: EVAL how lat-lng format goes. If swapped, update to
    // TODO: challenge obj, map fly to, and unit tests is required
    public constructor(lat: number, lng: number, ) {
        this.lat = lat
        this.lng = lng
    }

    // Mapbox + Strava format
    public get_lng_lat(): [number, number] {
        return [this.lng, this.lat]
    }

    // DD + Google Maps + TC challenges format
    public get_lat_lng(): [number, number] {
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