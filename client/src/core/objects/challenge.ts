import { GeoJSON } from "core/objects/misc"

import { ChallengeCategory, CourseCategory, SprintCategory, MilestoneCategory, CompleteStatus } from "core/enums/enums"

export class Challenge {
    public id: number = 0
    public name: string = ''
    public category_major: ChallengeCategory = ChallengeCategory.CHALLENGE
    public category_minor: any = null
    // TODO: debug only, reset to false

    public coordinates: GeoJSON[] = []
    public start_datetime: number = 0
    public stop_datetime: number = 0
    public difficulty: number = 0
    // TODO: setup images
    public img: string = ''

    public is_mappable: boolean = true
    public is_open: boolean = true
    public is_complete: boolean = true
    public complete_status: CompleteStatus = CompleteStatus.NOT_COMPLETE

    // TODO: define Metrics
    public metrics: any = null


    public test_event(id: number, name: string, coordinates: GeoJSON[], 
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
        this.category_major = ChallengeCategory.ZONE
    }
}

export class Course extends Challenge {
    public constructor(category: CourseCategory) {
        super()
        this.category_major = ChallengeCategory.COURSE
        this.category_minor = category
    }
}

export class Sprint extends Challenge {
    public constructor(category: SprintCategory) {
        super()
        this.category_major = ChallengeCategory.SPRINT
        this.category_minor = category
    }
}

export class Milestone extends Challenge {
    public constructor(category: MilestoneCategory) {
        super()
        this.category_major = ChallengeCategory.MILESTONE
        this.category_minor = category
        this.is_mappable = false
    }
}

export class Achievement extends Challenge {
    public constructor() {
        super()
        this.category_major = ChallengeCategory.ACHIEVEMENT
        this.is_mappable = false
    }
}

export class CompletedEvent {
    public id: number = 0
    public complete_status = CompleteStatus.NOT_COMPLETE

    public test(id: number, complete_status: CompleteStatus) {
        this.id = id
        this.complete_status = complete_status
        return this
    }
}