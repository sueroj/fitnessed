import { ChallengeCategoryMajor, CourseCategoryMinor, SprintCategoryMinor, MilestoneCategoryMinor, CompleteStatus } from "core/enums/enums"
import { ZoneLayer, CourseLayer, SprintLayer, AllLayers } from "core/objects/layer"
import { GeoJSON } from "core/objects/misc"


export class Challenge {
    public challenge_id: number = 0
    public name: string = ''
    public img: string = ''
    public category_major: ChallengeCategoryMajor = ChallengeCategoryMajor.CHALLENGE
    public category_minor: any = ''
    // TODO: setup images

    // TODO: setup description
    public description: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante'
    public difficulty: number = 0

    public coordinates: GeoJSON[] = []
    public start_coords: GeoJSON = new GeoJSON(0, 0)
    public finish_coords: GeoJSON = new GeoJSON(0, 0)

    // public start_datetime: number = 0 // TODO: Setup challenge start stop 
    // public stop_datetime: number = 0

    public is_mappable: boolean = false
    public is_open: boolean = false
    public is_featured: boolean = false // TODO: Consider refactor to new featured system
    public accept_required: boolean = false

    public is_complete: boolean = false
    public complete_status: CompleteStatus = CompleteStatus.NOT_COMPLETE

    // TODO: define Metrics
    public metrics: any = null
    public layer: any = {}

    // TODO: Refactor into constructor when ready
    public initialize(challenge: any) {
        this.challenge_id = challenge.challenge_id
        this.name = challenge.name
        this.img = challenge.img
        this.description = challenge.description
        this.difficulty = challenge.difficulty
        this.coordinates = this.load_geojson(challenge.coordinates)
        this.set_coordinates()
        // this.start_datetime = challenge.start_datetime
        // this.stop_datetime = challenge.stop_datetime
        this.is_mappable = challenge.is_mappable
        this.is_open = challenge.is_open
        this.is_featured = challenge.is_featured
        this.accept_required = challenge.accept_required

        // this.is_complete = challenge.is_complete
        // this.complete_status = challenge.complete_status
        // this.metrics = challenge.metrics
        return this
    }

    private load_geojson(_coordinates: any) {
        let coordinates = []
        for (let coord of _coordinates) {
            coordinates.push(new GeoJSON(coord.lng, coord.lat))
        }
        return coordinates
    }

    public test_challenge(challenge_id: number, name: string, coordinates: GeoJSON[], 
        start_datetime: any, stop_datetime: any, difficulty: number) {
            this.challenge_id = challenge_id
            this.name = name
            this.coordinates = coordinates
            // this.start_datetime = start_datetime
            // this.stop_datetime = stop_datetime
            this.difficulty = difficulty
            this.set_coordinates()
            return this
    }

    private set_coordinates() {
        this.start_coords = this.coordinates[0]
        let coords = this.coordinates // TODO: Test if refactor does not bug this.coordinates order
        this.finish_coords = coords.reverse()[0]
    }
}

export class Zone extends Challenge {
    public constructor() {
        super()
        this.category_major = ChallengeCategoryMajor.ZONE
        this.is_mappable = true
        this.layer = ZoneLayer
    }
}

export class Course extends Challenge {
    public constructor(category: CourseCategoryMinor) {
        super()
        this.category_major = ChallengeCategoryMajor.COURSE
        this.category_minor = category
        this.is_mappable = true
        this.layer = CourseLayer
    }
}

export class Sprint extends Challenge {
    public constructor(category: SprintCategoryMinor) {
        super()
        this.category_major = ChallengeCategoryMajor.SPRINT
        this.category_minor = category
        this.is_mappable = true
        this.layer = SprintLayer
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
        this.layer = ZoneLayer
    }
}

export class Achievement extends Challenge {
    public constructor() {
        super()
        this.category_major = ChallengeCategoryMajor.ACHIEVEMENT
        this.is_mappable = false
    }
}
