import { AllChallengeCategories, AnyChallengeCategory, MappableChallengeCategories, OrderedChallenges } from "core/libs/challenges"
import { Zone, Course, Sprint, Milestone, Collectable } from 'core/objects/challenge'
import { ChallengeCategoryMajor, MilestoneCategoryMinor } from "core/enums/enums"
import Filter from "core/objects/filter"

export default class Sort {
    private challenges: OrderedChallenges = new OrderedChallenges()


    public constructor(challenges: AllChallengeCategories) {
        this.challenges = this.sort(challenges)
    }

    public get_sorted() {
        return this.challenges
    }

    public get_filtered_list(filter: Filter) {
        return this.filter(filter)
    }

    private sort(challenges: AllChallengeCategories) {
        let zones_list: Zone[] = []
        let courses_list: Course[] = []
        let sprints_list: Sprint[] = []
        let milestones_list: Milestone[] = []
        let collectables_list: Collectable[] = []
        let mappable_list: MappableChallengeCategories = []
        let featured_list: any = []
        let completed_list: any = []
        
        // Sort challenges by category and other useful filters
        challenges.forEach(challenge => {
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

            if (challenge.is_featured) {
                featured_list.push(challenge)
            }
        })

        return {
            all: challenges,
            completed: completed_list,
            featured: featured_list,
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

    private filter(filter: Filter) {
        let list: any = []
        this.challenges.all.forEach(challenge => {
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
        })
        return list
    }
}