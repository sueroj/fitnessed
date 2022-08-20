export default class StravaId {
    public account_id: number = 0
    public firstname: string = ''
    public lastname: string = ''
    public city: string = ''
    public country: string = ''
    public state: string = ''
    public img: string = ''
    public auth: string = ''

    public set_from_strava(strava_obj: any) {
        console.log('[strava_id:constr] start:', strava_obj)
        this.account_id = strava_obj.athlete.id
        this.firstname = strava_obj.athlete.firstname
        this.lastname = strava_obj.athlete.lastname
        this.city = strava_obj.athlete.city
        this.country = strava_obj.athlete.country
        this.state = strava_obj.athlete.state
        this.img = strava_obj.athlete.profile_medium
        return this
    }

    public set_from_session(session_obj: any) {
        if (session_obj === null) {
            return false
        }
        console.log('[strava_id:set_from_session] start:', session_obj)
        session_obj = JSON.parse(session_obj)
        this.account_id = session_obj.account_id
        this.firstname = session_obj.firstname
        this.lastname = session_obj.lastname
        this.city = session_obj.city
        this.country = session_obj.country
        this.state = session_obj.state
        this.img = session_obj.img
        return true
    }
}