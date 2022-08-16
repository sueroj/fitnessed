import Profile from 'core/objects/profile'
import Profiles from 'core/libs/profiles'
import { ChallengeCategoryMajor } from 'core/enums/enums'

export default class Leaderboards {
    private user: Profile
    private profiles: Profiles

    public constructor(profiles: Profiles) {
        this.user = profiles.user
        this.profiles = profiles
    }

    // public generate() {
    //     return null // TODO
    // }

    public generate_by_category(category: ChallengeCategoryMajor) {
        return null // TODO
    }


    // TODO: Create common options to change num of profiles displayed in leaderboard
    // TODO: Write unit tests for this function. Look easy to break
    public generate() {
        // let all_profiles: Profile[] = this.profiles.get_all()
        // all_profiles = this.sort_by_rank(all_profiles)
        // let leaderboard: Profile[] = []
        // let position: number = 0

        // let positions_before: number = 0
        // let positions_after: number = 0

        // // find position of user profile
        // all_profiles.forEach((profile, index) => {
        //     if (this.user.id === profile.id) {
        //         position = index
        //     }
        // })

        // TODO: Fix this
        // if (position <= 3) {
        //     positions_before = position
        //     positions_after = positions_after - position
        // } else if (position >= (all_profiles.length - 3)) {
        //     positions_after = all_profiles.length - position
        //     positions_before = 8 - positions_after
        // } else {
        //     positions_before = 4
        //     positions_after = 4
        // }

        // for (let i = positions_before; i >= 1; i--) {
        //     leaderboard.push(all_profiles[position - i])
        // }
        // leaderboard.push(all_profiles[position])
        // for (let i = 1; i <= positions_after; i++) {
        //     leaderboard.push(all_profiles[position + i])
        // }

        // switch (position) {
        //     case 0: // 1st
        //         positions_after = 8
        //         break;
        //     case 1: // 2nd
        //         positions_before = 1
        //         positions_after = 7
        //         break;
        //     case 2: // 3rd
        //         positions_before = 2
        //         positions_after = 6
        //         break;
        //     case 3: // 4th
        //         positions_before = 3
        //         positions_after = 5
        //         break;
        //     case all_profiles.length - 4: // 4th to last
        //         positions_before = 5
        //         positions_after = 3
        //         break;
        //     case all_profiles.length - 3: // 3rd to last
        //         positions_before = 6
        //         positions_after = 2
        //         break;
        //     case all_profiles.length - 2: // 2nd to last
        //         positions_before = 7
        //         positions_after = 1
        //         break;
        //     case all_profiles.length - 1: // Last
        //         positions_before = 8
        //         break;
        //     default:
        //         positions_before = 4
        //         positions_after = 4
        //         break;
        // }

        // if (positions_before > 0)
        //     for (let i = positions_before; i >= 1; i--) {
        //         leaderboard.push(all_profiles[position - i])
        //     }
        // leaderboard.push(all_profiles[position])
        // for (let i = 1; i <= positions_after; i++) {
        //     leaderboard.push(all_profiles[position + i])
        // }

        // return leaderboard
    }

    private sort_by_rank(profiles: Profile[]) {
        let p = profiles.sort(function (a: Profile, b: Profile) {
            return a.rank - b.rank
        })
        return p
    }

}