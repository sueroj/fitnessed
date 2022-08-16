import Profile from "core/objects/profile"
import StravaId from "core/objects/strava_id"
import Http from "core/libs/http"

import TestProfiles from "test/test_profiles"


export default class Profiles {
    public user: any = null
    private friends: Profile[] = [] // TODO: Awt implement
    // private all_profiles: Profile[] = new TestProfiles().profiles // TODO: Do not store all profiles. Import just leaderboard. Calc leaderboard in Backend
    private http: Http = new Http()
    // public constructor() {
    //     this.user = new Profile()

    //     // TODO: test Only
    //     this.all_profiles = new TestProfiles().profiles
    //     // TODO: DANGER this function reorders the reference all_profiles, so if anything 
    //     // TODO: expecting reference to NOT be inorder will cause error after this call
    //     // this.sort_by_rank()
    // }

    // TODO: Eval if init function should be used
    // public initialize(strava_id: StravaId) {
    //     this.user = this.http.get_profile(strava_id)
    //     return this
    // }

    public load_current_user(strava_id: StravaId) {
        this.user = new Profile(this.http.get_profile(strava_id))
    }
    

    // public get_all() {
    //     return this.all_profiles
    // }

}