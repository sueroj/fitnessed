
import TestChallenges, { TestFeaturedEvents as TestFeaturedChallenges } from "test/test_events"
import { ChallengeCategory, MilestoneCategory } from "core/enums/enums"
import Profile from 'core/objects/profile'
import { Milestone, Zone, Course, Sprint, Achievement } from 'core/objects/challenge'
import { CategoryProgress } from "core/objects/misc"

export type AllChallengeCategories = Milestone[] | Zone[] | Course[] | Sprint[] | Achievement[] | []
export type MappableChallengeCategories = Zone[] | Course[] | Sprint[]

export type AnyChallengeCategory = Milestone | Zone | Course | Sprint | Achievement
export type MappableEventCategory = Zone | Course | Sprint

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

type ChallengesTable = {
    all_challenges: AllChallengeCategories,
    featured: AllChallengeCategories,
    mappable_challenges: MappableChallengeCategories,
    zones: Zone[],
    courses: Course[],
    sprints: Sprint[],
    milestones: MilestoneCategories // TODO: consider adding complete & all milestones
}

// type CategoryProgress = {
//     all_events: AllEventCategories,
//     complete: AllEventCategories,
//     not_complete: AllEventCategories,
//     // total_num_complete: number,
//     // total_num_not_complete: number
// }

// TODO: Refactor Events Filter. Make easier
export class ChallengesFilter {
    public zone: boolean = true
    public course: boolean = true
    public sprint: boolean = true
    public milestone: boolean = true
    public completed: boolean = true
}


// TODO: Refactor & optimize this class. Will be used a lot.
export default class Challenges {
    private profile: Profile
    private challenges: ChallengesTable

    public constructor(profile: Profile) {
        this.profile = profile
        this.challenges = this.get_challenges()
    }

    public get_all() {
        return this.challenges.all_challenges
    }

    public get_mappable() {
        return this.challenges.mappable_challenges
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

        let test_all_challenges = new TestChallenges().events
        let test_featured_challenges = new TestFeaturedChallenges().events
        test_all_challenges = this.update_completed_challenges(test_all_challenges)
        test_featured_challenges = this.update_completed_challenges(test_featured_challenges)
        let zones_list: Zone[] = []
        let courses_list: Course[] = []
        let sprints_list: Sprint[] = []
        let milestones_list: Milestone[] = []
        let mappable_list: MappableChallengeCategories = []

        test_all_challenges.forEach(challenge => {
            switch (challenge.category_major) {
                case ChallengeCategory.ZONE:
                    zones_list.push(challenge)
                    break
                case ChallengeCategory.COURSE:
                    courses_list.push(challenge)
                    break
                case ChallengeCategory.SPRINT:
                    sprints_list.push(challenge)
                    break
                case ChallengeCategory.MILESTONE:
                    milestones_list.push(challenge)
                    break
            }
            
            if (challenge.is_mappable) {
                mappable_list.push(challenge)
            }
        })

        return {
            all_challenges: test_all_challenges,
            featured: test_featured_challenges,
            mappable_challenges: mappable_list,
            zones: zones_list,
            courses: courses_list,
            sprints: sprints_list,
            milestones: {
                all: milestones_list,
                dailies: this.sort_by_subcategory(milestones_list, MilestoneCategory.DAILY),
                weeklies: this.sort_by_subcategory(milestones_list, MilestoneCategory.WEEKLY),
                monthlies: this.sort_by_subcategory(milestones_list, MilestoneCategory.MONTHLY)
            }
        }
    }

    private sort_by_subcategory(milestones: Milestone[], category: MilestoneCategory) {
        let sorted: Milestone[] = []
        milestones.forEach(event => {
            if (event.category_minor === category){
                sorted.push(event)
            }
        })
        return sorted
    }

    private update_completed_challenges(challenges: Milestone[] | Zone[] | Course[]) {
        this.profile.completed_challenges.forEach(completed_challenge => {
            challenges.forEach(challenge => {
                if (completed_challenge.id === challenge.id) {
                    challenge.is_complete = true
                    challenge.complete_status = completed_challenge.complete_status
                }
            })
        })
        return challenges
    }
}