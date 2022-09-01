import { ChallengeCategoryMajor, MilestoneCategoryMinor, CourseCategoryMinor, CompleteStatus } from "core/enums/enums"

import { Zone, Course, Sprint, Milestone, Collectable, Achievement } from 'core/objects/challenge'
import { CategoryProgress } from "core/objects/misc"
import Filter from "core/objects/filter"

export type AllChallengeCategories = Zone[] | Course[] | Sprint[] | Milestone[] | Collectable[] | Achievement[]
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

export type OrderedChallenges = {
    all: AllChallengeCategories
    completed: AllChallengeCategories
    featured: AllChallengeCategories
    mappable: MappableChallengeCategories
    zones: Zone[]
    courses: Course[]
    sprints: Sprint[]
    milestones: MilestoneCategories // TODO: consider adding complete & all milestones
    collectables: Collectable[]
}


// TODO: Refactor & optimize this class. Will be used a lot.
export default class Challenges {
    all: AllChallengeCategories = []
    completed: AllChallengeCategories = []
    featured: AllChallengeCategories = []
    mappable: MappableChallengeCategories = []
    zones: Zone[] = []
    courses: Course[] = []
    sprints: Sprint[] = []
    milestones: MilestoneCategories = new MilestoneCategories()
    collectables: Collectable[] = []

    public initialize(challenges: any) {
        for (let challenge of challenges) {
            this.all.push(challenge)

            // TODO: Refactor into interate through ChallengeCatergoryMajor Enum
            switch (challenge.category_major) {
                case ChallengeCategoryMajor.ZONE.valueOf():
                    challenge = new Zone().initialize(challenge)
                    this.zones.push(challenge)
                    break
                case ChallengeCategoryMajor.COURSE.valueOf():
                    challenge = new Course(challenge.category_minor).initialize(challenge)
                    this.courses.push(challenge)
                    break
                case ChallengeCategoryMajor.SPRINT.valueOf():
                    challenge = new Sprint(challenge.category_minor).initialize(challenge)
                    this.sprints.push(challenge)
                    break
                case ChallengeCategoryMajor.MILESTONE.valueOf():
                    challenge = new Milestone(challenge.category_minor).initialize(challenge)
                    this.milestones.all.push(challenge)
                    break
                case ChallengeCategoryMajor.COLLECTABLE.valueOf():
                    challenge = new Collectable().initialize(challenge)
                    this.collectables.push(challenge)
                    break
            }
            
            if (challenge.is_mappable) {
                this.mappable.push(challenge)
            }

            if (challenge.is_complete) { // TODO: Move / Refactor
                this.completed.push(challenge)
            }
        }
        this.milestones.dailies = this.sort_milestone_subcategory(MilestoneCategoryMinor.DAILY)
        this.milestones.weeklies = this.sort_milestone_subcategory(MilestoneCategoryMinor.WEEKLY)
        this.milestones.monthlies = this.sort_milestone_subcategory(MilestoneCategoryMinor.MONTHLY)
        return this
    }

    public set_from_session(session_obj: any) {
        if (session_obj === null) {
            return false
        }
        // TODO: EVAL likely need error handle here for case where session parse fails
        session_obj = JSON.parse(session_obj)
        this.initialize(session_obj.all)
        return true
    }

    public get_status() {
        return this.all.length > 0 ? true : false
    }

    public get_filtered(filter: any) {
        let challenges: any[] = [] // TODO: set type

        this.all.forEach(challenge => {
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
        this.completed.forEach(challenge => {
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

        return this.featured // TODO - TEST ONLY
    }

    public get_milestones_progress() { // TODO: consider adding complete & all milestones
        let milestones: MilestoneProgress = {
            all: new CategoryProgress(this.milestones.all),
            dailies: new CategoryProgress(this.milestones.dailies),
            weeklies: new CategoryProgress(this.milestones.weeklies),
            monthlies: new CategoryProgress(this.milestones.monthlies)
        } 
        return milestones
    }

    private sort_milestone_subcategory(category: MilestoneCategoryMinor) {
        let sorted: Milestone[] = []
        this.milestones.all.forEach(event => {
            if (event.category_minor === category){
                sorted.push(event)
            }
        })
        return sorted
    }

    public filter(filter: Filter) {
        let list: any = []
        for (let challenge of this.all) {
            function filter_by_category(category: ChallengeCategoryMajor, filter: boolean) {
                if (challenge.category_major === category && filter) {
                    list.push(challenge)
                }
            }
            filter_by_category(ChallengeCategoryMajor.ZONE, filter.zones)
            filter_by_category(ChallengeCategoryMajor.COURSE, filter.courses)
            filter_by_category(ChallengeCategoryMajor.SPRINT, filter.sprints)
            filter_by_category(ChallengeCategoryMajor.MILESTONE, filter.milestones)
            filter_by_category(ChallengeCategoryMajor.COLLECTABLE, filter.collectables)
        }
        return list
    }
}