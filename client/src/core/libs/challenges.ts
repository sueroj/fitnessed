
import TestChallenges, { TestFeaturedEvents as TestFeaturedChallenges } from "test/test_challenges"
import { ChallengeCategoryMajor, MilestoneCategoryMinor, CompleteStatus } from "core/enums/enums"
import Profile from 'core/objects/profile'
import { Zone, Course, Sprint, Milestone, Collectable, Achievement } from 'core/objects/challenge'
import { CategoryProgress } from "core/objects/misc"

export type AllChallengeCategories = Zone[] | Course[] | Sprint[] | Milestone[] | Collectable[] | Achievement[] | []
export type MappableChallengeCategories = Zone[] | Course[] | Sprint[] | Collectable[]

export type AnyChallengeCategory = Zone | Course | Sprint | Milestone | Collectable | Achievement
export type MappableChallengeCategory = Zone | Course | Sprint | Collectable

// export type MilestoneCategories = {
//     all: Milestone[],
//     dailies: Milestone[],
//     weeklies: Milestone[],
//     monthlies: Milestone[]
// }

export type MilestoneProgress = {
    all: CategoryProgress,
    dailies: CategoryProgress,
    weeklies: CategoryProgress,
    monthlies: CategoryProgress
}

// type CategoryProgress = {
//     all_events: AllEventCategories,
//     complete: AllEventCategories,
//     not_complete: AllEventCategories,
//     // total_num_complete: number,
//     // total_num_not_complete: number
// }

class MilestoneCategories {
    all: Milestone[] = []
    dailies: Milestone[] = []
    weeklies: Milestone[] = []
    monthlies: Milestone[] = []
}

export class OrderedChallenges {
    all: AllChallengeCategories = []
    completed: AllChallengeCategories = []
    featured: AllChallengeCategories = []
    mappable: MappableChallengeCategories = []
    zones: Zone[] = []
    courses: Course[] = []
    sprints: Sprint[] = []
    milestones: MilestoneCategories = new MilestoneCategories() // TODO: consider adding complete & all milestones
    collectables: Collectable[] = []
}


// TODO: Refactor & optimize this class. Will be used a lot.
export default class Challenges {
    // private user: Profile | null = null
    private challenges: OrderedChallenges = new OrderedChallenges()

    // TODO: Eval - consider using constructor
    // public constructor(profile: Profile) {
    //     this.user_profile = profile
    //     this.challenges = this.get_challenges()
    //     this.user_profile.completed_challenges = this.challenges.completed
    // }

    public initialize(challenges: any, profile: Profile) {
        // this.user = profile
        this.challenges = this.sort_challenges(challenges)
        // this.user.completed_challenges = this.challenges.completed
        return this
    }

    public set_from_session(session_obj: any) {
        if (session_obj === null) {
            return false
        }
        console.log('[challenges:set_from_session] start:', session_obj)
        session_obj = JSON.parse(session_obj)
        this.challenges = session_obj.challenges
        return true
    }

    public get_status() {
        return this.challenges.all.length > 0 ? true : false
    }

    // TODO: Eval change to remove function and use public properties
    public get_all() {
        return this.challenges.all
    }

    public get_completed() {
        return this.challenges.completed
    }

    public get_mappable() {
        return this.challenges.mappable
    }

    public get_zones() {
        return this.challenges.zones
    }

    public get_courses() {
        return this.challenges.courses
    }

    public get_sprints() {
        return this.challenges.sprints
    }

    public get_milestones() {
        return this.challenges.milestones
    }

    public get_collectables() {
        return this.challenges.collectables
    }

    public get_filtered(filter: any) {
        let challenges: any[] = [] // TODO: set type

        this.challenges.all.forEach(challenge => {
            function filter_by_category(category: ChallengeCategoryMajor, filter: boolean) {
                if (challenge.category_major === category && filter) {
                    challenges.push(challenge)
                }
            }
            filter_by_category(ChallengeCategoryMajor.ZONE, filter.zones)
            filter_by_category(ChallengeCategoryMajor.COURSE, filter.courses)
            filter_by_category(ChallengeCategoryMajor.SPRINT, filter.sprints)
            filter_by_category(ChallengeCategoryMajor.MILESTONE, filter.milestones)
            filter_by_category(ChallengeCategoryMajor.COLLECTABLE, filter.collectables)
        })
        return challenges
    }

    public get_num_completed_by_category(category: ChallengeCategoryMajor) {
        let num: number = 0
        this.challenges.completed.forEach(challenge => {
            if (challenge.category_major === category) {
                num++
            }
        })
        return num
    }

    // TODO should only return MappableChallengeCategories
    // i.e. public get_nearby(): MappableChallengeCategories {}
    public get_nearby() {
        // get map center

        // convert distance to DD equivalent

        // Calc nearby - ref TopChallengerJS

        return this.challenges.featured // TODO - TEST ONLY
    }


    public get_milestones_progress() { // TODO: consider adding complete & all milestones
        let milestones: MilestoneProgress = {
            all: new CategoryProgress(this.challenges.milestones.all),
            dailies: new CategoryProgress(this.challenges.milestones.dailies),
            weeklies: new CategoryProgress(this.challenges.milestones.weeklies),
            monthlies: new CategoryProgress(this.challenges.milestones.monthlies)
        } 
        return milestones
    }

    private sort_challenges(challenges: any) {
        let zones_list: Zone[] = []
        let courses_list: Course[] = []
        let sprints_list: Sprint[] = []
        let milestones_list: Milestone[] = []
        let collectables_list: Collectable[] = []
        let mappable_list: MappableChallengeCategories = []
        let completed_list: any = []

        for (let challenge of challenges) {
            // TODO: Refactor into interate through ChallengeCatergoryMajor Enum
            switch (challenge.category_major) {
                case ChallengeCategoryMajor.ZONE.valueOf():
                    challenge = new Zone().initialize(challenge)
                    zones_list.push(challenge)
                    break
                case ChallengeCategoryMajor.COURSE.valueOf():
                    courses_list.push(challenge)
                    break
                case ChallengeCategoryMajor.SPRINT.valueOf():
                    sprints_list.push(challenge)
                    break
                case ChallengeCategoryMajor.MILESTONE.valueOf():
                    milestones_list.push(challenge)
                    break
                case ChallengeCategoryMajor.COLLECTABLE.valueOf():
                    collectables_list.push(challenge)
                    break
            }
            
            if (challenge.is_mappable) {
                mappable_list.push(challenge)
            }

            if (challenge.is_complete) { // TODO: Move / Refactor
                completed_list.push(challenge)
            }
        }

        return {
            all: challenges,
            completed: completed_list,
            featured: [], // TODO: Awt implementation
            mappable: mappable_list,
            zones: zones_list,
            courses: courses_list,
            sprints: sprints_list,
            milestones: {
                all: milestones_list,
                dailies: this.sort_by_subcategory(milestones_list, MilestoneCategoryMinor.DAILY),
                weeklies: this.sort_by_subcategory(milestones_list, MilestoneCategoryMinor.WEEKLY),
                monthlies: this.sort_by_subcategory(milestones_list, MilestoneCategoryMinor.MONTHLY)
            },
            collectables: collectables_list
        }
    }

    private sort_by_subcategory(milestones: Milestone[], category: MilestoneCategoryMinor) {
        let sorted: Milestone[] = []
        milestones.forEach(event => {
            if (event.category_minor === category){
                sorted.push(event)
            }
        })
        return sorted
    }

    private test_set_completed_challenges(challenges: AllChallengeCategories) {

        challenges.forEach(challenge => {
            if (challenge.challenge_id === 111114) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.STANDARD_T0
            }

            if (challenge.challenge_id === 111116) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.STANDARD_T0
            }

            if (challenge.challenge_id === 111140) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.STANDARD_T0
            }

            if (challenge.challenge_id === 111124) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.BRONZE_T1
            }

            if (challenge.challenge_id === 111114) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.BRONZE_T1
            }

            if (challenge.challenge_id === 111142) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.SILVER_T2
            }

            if (challenge.challenge_id === 111146) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.GOLD_T3
            }
        })

        return challenges
    }
}