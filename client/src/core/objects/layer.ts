// Note: All Mapbox decimal degrees (DD) expressed as lng, lat
import Challenges, { MappableChallengeCategory } from 'core/libs/challenges'
import { Challenge } from 'core/objects/challenge'


export type AllLayers = ZoneLayer | CourseLayer | SprintLayer | any

export default class MapboxLayer {
    public source: {} = {}
    public layer: {} = {}
    protected challenge: MappableChallengeCategory = new Challenge()

    protected extract_start_coords() {
        let coords: number[] = []
        try {
            coords = this.challenge.start_coords.get_lng_lat()
        } catch (err) {
            console.log(`[Map] Error getting challenge coordinates. Is it mappable? Challenge: ${this.challenge.challenge_id}\n${err}`)
        }
        return coords
    }
}

export class ZoneLayer extends MapboxLayer {
    public constructor() {
        super()
    }

    public get(challenge: MappableChallengeCategory) {
        this.challenge = challenge
        this.set_source()
        this.set_layer()
        return this
    }

    private set_source() {
        let coords: number[] = this.extract_start_coords()

        this.source =  {
            'type': 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': [{
                    'type': 'Feature',
                    'properties': {},
                    'geometry': {
                        'type': 'Point',
                        'coordinates': coords
                    }
                }]
            }
        }
    }

    private set_layer() {
        this.layer = {
            'id': `layer_${this.challenge.challenge_id}`,
            'type': 'circle',
            'source': `source_${this.challenge.challenge_id}`,
            'paint': {
                'circle-radius': {
                'base': 30,
                'stops': [
                    [4,8],
                    [12,16],
                    [13,32],
                    [14,32],
                    [15,14],
                    [16,14],
                    [17,14],
                    [18,14]
                ]
            },
            'circle-color': '#FF0000',
            'circle-opacity': 0.4
            }
        }
    }
}

export class CourseLayer extends MapboxLayer {
    public constructor() {
        super()
    }

    public get(challenge: MappableChallengeCategory) {
        this.challenge = challenge
        this.set_source()
        this.set_layer()
        return this
    }

    private set_source() {
        let coords: number[] = this.extract_start_coords()

        this.source =  {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': coords
                }
            }
        }
    }

    private set_layer() {
        this.layer = {
            'id': `layer_${this.challenge.challenge_id}`,
            'type': 'symbol',
            'source': `source_${this.challenge.challenge_id}`,
            'layout': {
                'icon-image': `img_${this.challenge.challenge_id}`,
                'icon-size': 0.4
            }
        }
    }
}

export class SprintLayer extends MapboxLayer {
    public constructor() {
        super()
    }

    public get(challenge: MappableChallengeCategory) {
        this.challenge = challenge
        this.set_source()
        this.set_layer()
        return this
    }

    private set_source() {
        let coords: number[] = this.extract_start_coords()

        this.source =  {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': coords
                }
            }
        }
    }

    private set_layer() {
        this.layer = {
            'id': `layer_${this.challenge.challenge_id}`,
            'type': 'symbol',
            'source': `source_${this.challenge.challenge_id}`,
            'layout': {
                'icon-image': `img_${this.challenge.challenge_id}`,
                'icon-size': 0.4
            }
        }
    }
}