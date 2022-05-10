
import TestChallenges, { TestFeaturedEvents as TestFeaturedChallenges } from "test/test_challenges"
import { ChallengeCategoryMajor, MilestoneCategoryMinor, CompleteStatus } from "core/enums/enums"
import Profile from 'core/objects/profile'
import { Zone, Course, Sprint, Milestone, Collectable, Achievement } from 'core/objects/challenge'
import { CategoryProgress } from "core/objects/misc"

export type AllChallengeCategories = Zone[] | Course[] | Sprint[] | Milestone[] | Collectable[] | Achievement[] | []
export type MappableChallengeCategories = Zone[] | Course[] | Sprint[] | Collectable[]

export type AnyChallengeCategory = Zone | Course | Sprint | Milestone | Collectable | Achievement
export type MappableChallengeCategory = Zone | Course | Sprint | Collectable

export type MilestoneCategories = {
    all: Milestone[],
    dailies: Milestone[],
    weeklies: Milestone[],
    monthlies: Milestone[]
}

export type MilestoneProgress = {
    all: CategoryProgress,
    dailies: CategoryProgress,
    weeklies: CategoryProgress,
    monthlies: CategoryProgress
}

type OrderedChallenges = {
    all: AllChallengeCategories,
    completed: AllChallengeCategories,
    featured: AllChallengeCategories,
    mappable: MappableChallengeCategories,
    zones: Zone[],
    courses: Course[],
    sprints: Sprint[],
    milestones: MilestoneCategories, // TODO: consider adding complete & all milestones
    collectables: Collectable[]
}

// type CategoryProgress = {
//     all_events: AllEventCategories,
//     complete: AllEventCategories,
//     not_complete: AllEventCategories,
//     // total_num_complete: number,
//     // total_num_not_complete: number
// }


// TODO: Refactor & optimize this class. Will be used a lot.
export default class Challenges {
    private user_profile: Profile
    private challenges: OrderedChallenges

    public constructor(profile: Profile) {
        this.user_profile = profile
        this.challenges = this.get_challenges()
        this.user_profile.completed_challenges = this.challenges.completed
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


    public get_milestones_progress() { // TODO: consider adding complete & all milestones
        let milestones: MilestoneProgress = {
            all: new CategoryProgress(this.challenges.milestones.all),
            dailies: new CategoryProgress(this.challenges.milestones.dailies),
            weeklies: new CategoryProgress(this.challenges.milestones.weeklies),
            monthlies: new CategoryProgress(this.challenges.milestones.monthlies)
        } 
        return milestones
    }

    private get_challenges() {
        // Http get action from server
        // TODO: Replace w/ http action

        let zones_list: Zone[] = []
        let courses_list: Course[] = []
        let sprints_list: Sprint[] = []
        let milestones_list: Milestone[] = []
        let collectables_list: Collectable[] = []
        let mappable_list: MappableChallengeCategories = []
        let completed_list: any = []

        // TODO: Test Only. Fill challenges with dummy data
        let test_all_challenges = new TestChallenges().challenges
        let test_featured_challenges = new TestFeaturedChallenges().challenges
        test_all_challenges = this.test_set_completed_challenges(test_all_challenges)
        test_featured_challenges = this.test_set_completed_challenges(test_featured_challenges)

        // Sort challenges by category and other useful filters
        test_all_challenges.forEach(challenge => {
            switch (challenge.category_major) {
                case ChallengeCategoryMajor.ZONE:
                    zones_list.push(challenge)
                    break
                case ChallengeCategoryMajor.COURSE:
                    courses_list.push(challenge)
                    break
                case ChallengeCategoryMajor.SPRINT:
                    sprints_list.push(challenge)
                    break
                case ChallengeCategoryMajor.MILESTONE:
                    milestones_list.push(challenge)
                    break
                case ChallengeCategoryMajor.COLLECTABLE:
                    collectables_list.push(challenge)
                    break
            }
            
            if (challenge.is_mappable) {
                mappable_list.push(challenge)
            }

            if (challenge.is_complete) {
                completed_list.push(challenge)
            }
        })

        return {
            all: test_all_challenges,
            completed: completed_list,
            featured: test_featured_challenges,
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
            if (challenge.id === 111114) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.STANDARD_T0
            }

            if (challenge.id === 111116) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.STANDARD_T0
            }

            if (challenge.id === 111140) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.STANDARD_T0
            }

            if (challenge.id === 111124) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.BRONZE_T1
            }

            if (challenge.id === 111114) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.BRONZE_T1
            }

            if (challenge.id === 111142) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.SILVER_T2
            }

            if (challenge.id === 111146) {
                challenge.is_complete = true
                challenge.complete_status = CompleteStatus.GOLD_T3
            }
        })

        return challenges
    }
}