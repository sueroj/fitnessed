import { ChallengeCategoryMajor, CourseCategoryMinor, SprintCategoryMinor, MilestoneCategoryMinor, CompleteStatus } from "core/enums/enums"

type CategoriesMinor = CourseCategoryMinor | SprintCategoryMinor | MilestoneCategoryMinor

export class Achievement {
    public achievement_id: number = 0
    public name: string = ''
    public img: string = ''
    public category_major: ChallengeCategoryMajor = ChallengeCategoryMajor.CHALLENGE
    public category_minor: any = ''
    // TODO: setup images

    // TODO: setup description
    public description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante'
    public is_complete: boolean = false

    public test_load(_id: number, name: string, category_major: ChallengeCategoryMajor) {
            this.achievement_id = _id
            this.name = name
            this.category_major = category_major
            // TODO: EVAL category minor should be added to further define achievement type & filter
            // this.category_minor = category_minor
            return this
    }

}