import { GeoJSON } from "core/objects/misc"

import { ChallengeCategoryMajor, CourseCategoryMinor, SprintCategoryMinor, MilestoneCategoryMinor, CompleteStatus } from "core/enums/enums"

export class Challenge {
    public id: number = 0
    public name: string = ''
    public category_major: ChallengeCategoryMajor = ChallengeCategoryMajor.CHALLENGE
    public category_minor: any = null
    // TODO: debug only, reset to false

    public coordinates: GeoJSON[] = []
    public start_datetime: number = 0
    public stop_datetime: number = 0
    public difficulty: number = 0
    // TODO: setup images
    public img: string = ''

    public is_mappable: boolean = false
    public is_open: boolean = false
    public is_featured: boolean = false

    public is_complete: boolean = false
    public complete_status: CompleteStatus = CompleteStatus.NOT_COMPLETE

    // TODO: define Metrics
    public metrics: any = null


    public test_challenge(id: number, name: string, coordinates: GeoJSON[], 
        start_datetime: any, stop_datetime: any, difficulty: number) {
            this.id = id
            this.name = name
            this.coordinates = coordinates
            this.start_datetime = start_datetime
            this.stop_datetime = stop_datetime
            this.difficulty = difficulty
        return this
    }
}

export class Zone extends Challenge {
    public constructor() {
        super()
        this.category_major = ChallengeCategoryMajor.ZONE
        this.is_mappable = true
    }
}

export class Course extends Challenge {
    public constructor(category: CourseCategoryMinor) {
        super()
        this.category_major = ChallengeCategoryMajor.COURSE
        this.category_minor = category
        this.is_mappable = true
    }
}

export class Sprint extends Challenge {
    public constructor(category: SprintCategoryMinor) {
        super()
        this.category_major = ChallengeCategoryMajor.SPRINT
        this.category_minor = category
        this.is_mappable = true
    }
}

export class Milestone extends Challenge {
    public constructor(category: MilestoneCategoryMinor) {
        super()
        this.category_major = ChallengeCategoryMajor.MILESTONE
        this.category_minor = category
        this.is_mappable = false
    }
}

export class Collectable extends Challenge {
    public constructor() {
        super()
        this.category_major = ChallengeCategoryMajor.COLLECTABLE
        this.is_mappable = true
    }
}

export class Achievement extends Challenge {
    public constructor() {
        super()
        this.category_major = ChallengeCategoryMajor.ACHIEVEMENT
        this.is_mappable = false
    }
}
