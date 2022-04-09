import Profile from "core/objects/profile"

import TestProfiles from "test/test_profiles"


export default class Profiles {
    public user: Profile
    private friends: Profile[] = [] // TODO: Awt implement
    private all_profiles: Profile[]
    
    public constructor() {
        this.user = new Profile()
        this.all_profiles = new TestProfiles().profiles
        // TODO: DANGER this function reorders the reference all_profiles, so if anything 
        // TODO: expecting reference to NOT be inorder will cause error after this call
        // this.sort_by_rank()
    }

    // TODO: Create common options to change num of profiles displayed in leaderboard
    // public generate_leaderboard() {
    //     // find position of user profile
    //     let leaderboard: Profile[] = []
    //     let position: number = 0
    //     this.all_profiles.forEach((profile, index) => {
    //         if (this.current.id === profile.id) { 
    //             position = index
    //         }
    //     })

    //     switch (position) {
    //         case 0:
    //             leaderboard.push(this.all_profiles[position])
    //             for (let i = 1; i <= 5; i++) {
    //                 leaderboard.push(this.all_profiles[i])
    //             }
    //             break;
    //         case 1:
    //             leaderboard.push(this.all_profiles[position - 1])
    //             leaderboard.push(this.all_profiles[position])
    //             leaderboard.push(this.all_profiles[position + 1])
    //             leaderboard.push(this.all_profiles[position + 2])
    //             leaderboard.push(this.all_profiles[position + 3])
    //             break;
    //         case this.all_profiles.length - 1:
    //             leaderboard.push(this.all_profiles[position - 2])
    //             leaderboard.push(this.all_profiles[position - 1])
    //             leaderboard.push(this.all_profiles[position])
    //             leaderboard.push(this.all_profiles[position + 1])
    //             break;
    //         case this.all_profiles.length:
    //             leaderboard.push(this.all_profiles[position - 3])
    //             leaderboard.push(this.all_profiles[position - 2])
    //             leaderboard.push(this.all_profiles[position - 1])
    //             leaderboard.push(this.all_profiles[position])
    //             break;
    //         default:
    //             leaderboard.push(this.all_profiles[position - 2])
    //             leaderboard.push(this.all_profiles[position - 1])
    //             leaderboard.push(this.all_profiles[position])
    //             leaderboard.push(this.all_profiles[position + 1])
    //             leaderboard.push(this.all_profiles[position + 2])
    //             break;
    //     }
    //     return leaderboard
    // }

    // private sort_by_rank() {
    //     this.all_profiles.sort(function(a: Profile, b: Profile){
    //         return a.rank - b.rank
    //     })
    // }
}