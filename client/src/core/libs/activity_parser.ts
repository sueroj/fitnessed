import Profile from 'core/objects/profile'
import StravaId from 'core/objects/strava_id'
import Http from 'core/libs/http'


export default class ActivityParser {
    private http: Http = new Http()
    private profile: Profile = new Profile()
    private strava_id: StravaId = new StravaId()
    private is_synced: boolean = false
    public num_activities: number = 0
    public activities: any = []


    public constructor(profile: Profile, strava_id: StravaId) {
        this.profile = profile
        this.strava_id = strava_id
    }

    public get_activities() {
        console.log(`[ActivityParser:get_activities] start`)
        // if (this.is_synced === false) {
        //     let d = Math.floor(Date.now() / 1000)
        //     const before_date = d.valueOf()             // Before = current date/time
        //     const after_date = d.valueOf() - 604800     // After = 2 weeks of history 

        //     this.http.get_activities(this.strava_id.access_token, before_date, after_date)
        //     .then((response) => {
        //             this.activities = this.validate(response.data)
        //             this.num_activities = response.data.length
        //             this.is_synced = true
        //     })
        //     .catch((e) => {
        //         console.log("Could not connect to server:", e)
        //     })
        //     return this.activities
        // } else return []
        let d = Math.floor(Date.now() / 1000)
        const before_date = d.valueOf()             // Before = current date/time
        const after_date = d.valueOf() - 604800     // After = 2 weeks of history 

        this.activities = this.http.get_activities(this.strava_id.access_token, before_date, after_date)
        .then((response) => {
                this.num_activities = response.data.length
                this.is_synced = true
                return response.data
        })
        .catch((e) => {
            console.log("Could not connect to server:", e)
        })
        console.log(`[ActivityParser:get_activities] returns ${this.activities}`)
        return this.activities
    }

    private validate(data: any) {
        console.log(`[ActivityParser:validate] data: `, data)
        return data
    }
}