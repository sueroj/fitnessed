// import { render, screen } from "@testing-library/react"
// import userEvent from "@testing-library/user-event"

import { Challenge, Zone, Course, Sprint, Collectable, Milestone, Achievement } from 'core/objects/challenge'
import { ChallengeCategoryMajor, MilestoneCategoryMinor, CourseCategoryMinor, SprintCategoryMinor } from 'core/enums/enums'
import { GeoJSON } from 'core/objects/misc'

let MOCK_CHALLENGE = {
    accept_required: false,
    category_major: "Zone",
    category_minor: "",
    challenge_id: 111115,
    complete_status: 0,
    coordinates: [
        { lng: 22.222222, lat: 11.1111111 },
        { lng: 33.333333, lat: 44.4444444 },
        { lng: 55.555555, lat: 66.6666666 },
        { lng: 66.6666666, lat: 77.777777 },
    ],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante",
    difficulty: 2,
    img: "",
    is_complete: false,
    is_featured: false,
    is_mappable: true,
    is_open: false,
    metrics: null,
    name: "Cambridge_Zone_100001",
}

test("[Object/Challenge] creates new challenge object", () => {
    const test_cases = [
        {id: 123145, name: 'SomeChallenge', diff: 1},
        {id: 4357889, name: 'SomeReallyLongChallengeNameThatIsEvenLonger', diff: 4}
    ]
    for (let i = 0; i < test_cases.length; i++) {
        MOCK_CHALLENGE.challenge_id = test_cases[i].id
        MOCK_CHALLENGE.name = test_cases[i].name
        MOCK_CHALLENGE.difficulty = test_cases[i].diff
        let challenge = new Challenge().initialize(MOCK_CHALLENGE)

        expect(challenge).toHaveProperty('challenge_id', MOCK_CHALLENGE.challenge_id)
        expect(challenge).toHaveProperty('category_major', ChallengeCategoryMajor.CHALLENGE)
        expect(challenge).toHaveProperty('start_coords', new GeoJSON(MOCK_CHALLENGE.coordinates[0].lat, MOCK_CHALLENGE.coordinates[0].lng))
        expect(challenge).toHaveProperty('finish_coords', new GeoJSON(MOCK_CHALLENGE.coordinates[3].lat, MOCK_CHALLENGE.coordinates[3].lng))
    }
})

test("[Object/Challenge] sets geojson coordinates", () => {
    MOCK_CHALLENGE.coordinates = [
        { lat: -45.1111111, lng: -65.222222 },
        { lat: 52.31038358513391, lng: -0.04651882694422449 },
        { lat: 52.31038358513391, lng: -0.04651882694422449 },
        { lat: 1.6666666, lng: 0.777777 }
    ]
    let challenge = new Challenge().initialize(MOCK_CHALLENGE)

    expect(challenge).toHaveProperty('challenge_id', MOCK_CHALLENGE.challenge_id)
    expect(challenge).toHaveProperty('category_major', ChallengeCategoryMajor.CHALLENGE)
    expect(challenge).toHaveProperty('start_coords', new GeoJSON(MOCK_CHALLENGE.coordinates[0].lat, MOCK_CHALLENGE.coordinates[0].lng))
    expect(challenge).toHaveProperty('finish_coords', new GeoJSON(MOCK_CHALLENGE.coordinates[3].lat, MOCK_CHALLENGE.coordinates[3].lng))
})

test.each([
    {challenge: new Zone(), expected_cat_major: ChallengeCategoryMajor.ZONE, expected_cat_minor: ''},
    {challenge: new Course(CourseCategoryMinor.LOOP), expected_cat_major: ChallengeCategoryMajor.COURSE, expected_cat_minor: CourseCategoryMinor.LOOP},
    {challenge: new Sprint(SprintCategoryMinor.STANDARD), expected_cat_major: ChallengeCategoryMajor.SPRINT, expected_cat_minor: SprintCategoryMinor.STANDARD},
    {challenge: new Milestone(MilestoneCategoryMinor.DAILY), expected_cat_major: ChallengeCategoryMajor.MILESTONE, expected_cat_minor: MilestoneCategoryMinor.DAILY},
    {challenge: new Collectable(), expected_cat_major: ChallengeCategoryMajor.COLLECTABLE, expected_cat_minor: ''},
    {challenge: new Achievement(), expected_cat_major: ChallengeCategoryMajor.ACHIEVEMENT, expected_cat_minor: ''}
])(`[Object/Challenge] Challenge type sets correct category and is_mappable`, (test_case) => {
    let challenge = test_case.challenge.initialize(MOCK_CHALLENGE)

    expect(challenge).toHaveProperty('challenge_id', MOCK_CHALLENGE.challenge_id)
    expect(challenge).toHaveProperty('category_major', test_case.expected_cat_major)
    expect(challenge).toHaveProperty('category_minor', test_case.expected_cat_minor)
    expect(challenge).toHaveProperty('is_mappable', MOCK_CHALLENGE.is_mappable)
})

export {}
