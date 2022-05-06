import Profile from "core/objects/profile"

import TestProfiles from "test/test_profiles"


export default class Profiles {
    public user: Profile
    private friends: Profile[] = [] // TODO: Awt implement
    private all_profiles: Profile[] // TODO: Do not store all profiles. Import just leaderboard. Calc leaderboard in Backend
    
    public constructor() {
        this.user = new Profile()

        // TODO: test Only
        this.all_profiles = new TestProfiles().profiles
        // TODO: DANGER this function reorders the reference all_profiles, so if anything 
        // TODO: expecting reference to NOT be inorder will cause error after this call
        // this.sort_by_rank()
    }

    public get_all() {
        return this.all_profiles
    }

}