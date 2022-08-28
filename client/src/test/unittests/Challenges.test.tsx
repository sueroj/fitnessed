import { ChallengeCategoryMajor} from 'core/enums/enums'
import Challenges, { OrderedChallenges } from 'core/libs/challenges'
import { GeoJSON } from 'core/objects/misc'

class MOCK_CHALLENGE {
    accept_required =  false
    category_major = "Zone"
    category_minor = ""
    challenge_id = 111115
    complete_status = 0
    coordinates = [
        { lng: 22.222222, lat: 11.1111111 },
        { lng: 33.333333, lat: 44.4444444 },
        { lng: 55.555555, lat: 66.6666666 },
        { lng: 66.6666666, lat: 77.777777 },
    ]
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante"
    difficulty = 2
    img = ""
    is_complete = false
    is_featured = false
    is_mappable = true
    is_open = false
    metrics = null
    name = "Cambridge_Zone_100001"
}

function generate_mock_challenges() {
    let mock_challenges: any[] = []
    for (let i = 0; i < 40; i++) {
        let mock_c = new MOCK_CHALLENGE()
        mock_c.challenge_id = 100 + i
        if (i < 5){ mock_c.category_major = ChallengeCategoryMajor.ZONE}
        else if (i < 8){ mock_c.category_major = ChallengeCategoryMajor.COURSE}
        else if (i < 12){ mock_c.category_major = ChallengeCategoryMajor.SPRINT}
        else if (i < 20){ mock_c.category_major = ChallengeCategoryMajor.MILESTONE}
        else if (i < 25){ mock_c.category_major = ChallengeCategoryMajor.COLLECTABLE}
        else if (i <= 30){ mock_c.category_major = ChallengeCategoryMajor.ACHIEVEMENT}
        else if (i > 30){mock_c.category_major = ChallengeCategoryMajor.ZONE}
        mock_challenges.push(mock_c)
    }
    return mock_challenges
}


test("[Lib/Challenges] initializes challenge table objects", () => {
    const mock_challenges = generate_mock_challenges()
    let challenges: Challenges = new Challenges().initialize(mock_challenges)

    expect(challenges.all.length).toBe(40)
    expect(challenges.zones.length).toBe(14)
    expect(challenges.courses.length).toBe(3)
    expect(challenges.sprints.length).toBe(4)
    expect(challenges.collectables.length).toBe(5)
    expect(challenges.milestones.all.length).toBe(8)
    expect(challenges.get_status()).toBe(true)
})

test("[Lib/Challenges] sets challenge table objects from session", () => {
    const mock_challenges = generate_mock_challenges()
    const mock_session_obj = {
        all: mock_challenges
    }
    let challenges = new Challenges()
    let result = challenges.set_from_session(JSON.stringify(mock_session_obj))

    expect(result).toBe(true)
    expect(challenges.all.length).toBe(40)
    expect(challenges.zones.length).toBe(14)
    expect(challenges.courses.length).toBe(3)
    expect(challenges.sprints.length).toBe(4)
    expect(challenges.collectables.length).toBe(5)
    expect(challenges.milestones.all.length).toBe(8)
    expect(challenges.get_status()).toBe(true)
})

test("[Lib/Challenges] contains correct geojson coordinates", () => {
    const mock_challenges = generate_mock_challenges()
    let challenges: Challenges = new Challenges().initialize(mock_challenges)

    // expect(challenges.zones[0].coordinates).toBe(mock_challenges[0].coordinates)
    expect(challenges.zones[0].start_coords.get_lng_lat()).toStrictEqual([mock_challenges[0].coordinates[0].lng, mock_challenges[0].coordinates[0].lat])
    expect(challenges.zones[0].start_coords.get_lat_lng()).toStrictEqual([mock_challenges[0].coordinates[0].lat, mock_challenges[0].coordinates[0].lng])
    expect(challenges.zones[0].finish_coords.get_lng_lat()).toStrictEqual([mock_challenges[0].coordinates[3].lng, mock_challenges[0].coordinates[3].lat])
    expect(challenges.zones[0].finish_coords.get_lat_lng()).toStrictEqual([mock_challenges[0].coordinates[3].lat, mock_challenges[0].coordinates[3].lng])
})
