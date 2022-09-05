import mapboxgl from 'mapbox-gl'

import Challenges, { MappableChallengeCategory } from 'core/libs/challenges'
import Filter from 'core/objects/filter'
import { GeoJSON } from 'core/objects/misc'
import { MAPBOX_TOKEN } from 'config/tokens'
import { ChallengeCategoryMajor } from 'core/enums/enums'

mapboxgl.accessToken = MAPBOX_TOKEN

export type LngLat = mapboxgl.LngLat

const DEFAULT_ZOOM: number = 5
const DEFAULT_START_LNG: number = 0.17
const DEFAULT_START_LAT:  number = 52.18

export default class Mapbox {
    public start_lng: number = DEFAULT_START_LNG
    public start_lat: number = DEFAULT_START_LAT
    public zoom: number = DEFAULT_ZOOM
    public center: LngLat = new mapboxgl.LngLat(this.start_lng, this.start_lng)
    public map: mapboxgl.Map

    public toggles: any
    public set_center: Function

    private container: any
    private challenges: Challenges
    private filters: Filter

    // TODO: define toggles type
    public constructor(container: any, challenges: Challenges, toggles: any, filters: Filter, set_center: Function) {
        this.container = container
        this.challenges = challenges
        this.toggles = toggles
        this.filters = filters
        this.set_center = set_center
        this.map = new mapboxgl.Map({
            container: this.container,
            center: [this.start_lng, this.start_lat],
            zoom: this.zoom,
            style: 'mapbox://styles/mapbox/streets-v11',
            attributionControl: false
        })
    }

    public draw() {
        this.center = this.configure_center()
        this.draw_challenges()
        return this
    }

    private configure_center(): LngLat {
        let this_obj = this
        let map = this.map
        let center = this.center

        map.on('load', function() {
            map.on('dragend', function() {
                center = map.getCenter()
                this_obj.set_center(center)
            })
            map.on('zoomend', function() {
                center = map.getCenter()
                this_obj.set_center(center)
            })
        })
        return center
    }

    public draw_challenges() {
        let this_obj = this
        let zones = this.challenges.zones
        let mappable = this.challenges.mappable

        // Configure map icons and triggers for each mappable event
        this.map.on('load', function () {

            // Draw zones
            zones.forEach(challenge => {
                challenge.layer = new challenge.layer().get(challenge)
                this_obj.new_source(challenge)
                this_obj.new_layer(challenge)
                this_obj.configure_pointer(challenge)
                // TODO: Modal on click not yet implemented
                this_obj.configureModalOnClick(challenge)
                // this_obj.configure_card_on_hover(event)
            })

            // Draw courses, sprints, and challenges that render image
            mappable.forEach(challenge => {
                if (challenge.category_major === ChallengeCategoryMajor.COURSE || challenge.category_major === ChallengeCategoryMajor.SPRINT) {
                    challenge.layer = new challenge.layer().get(challenge)
                    this_obj.new_image(challenge)
                    this_obj.new_source(challenge)
                    this_obj.new_layer(challenge)
                    this_obj.configure_pointer(challenge)
                }
            })
        })
    }

    private new_image(challenge: MappableChallengeCategory) {
        let this_obj = this
        this_obj.map.loadImage(this.import_asset('imgs', challenge.challenge_id),
        function (error, img) {
            if (error) throw error
            if (img) { this_obj.map.addImage(`img_${challenge.challenge_id}`, img) }  
        })
    }

    private new_source(challenge: MappableChallengeCategory) {
        this.map.addSource(`source_${challenge.challenge_id}`, challenge.layer.source)
    }

    private new_layer(challenge: MappableChallengeCategory) {
        this.map.addLayer(challenge.layer.layer)
    }


    // TODO: EVAL if better to use title or id - currently using title, prefer id if possible
    private configure_pointer(challenge: MappableChallengeCategory) {
        let this_obj = this
        let map = this.map

        // Change the cursor to a pointer when the mouse is over any layers
        map.on('mouseenter', `layer_${challenge.challenge_id}`, function () {
            map.getCanvas().style.cursor = 'pointer'
        });

        // Change it back to a pointer when it leaves
        map.on('mouseleave', `layer_${challenge.challenge_id}`, function () {
            map.getCanvas().style.cursor = ''
        });
    }

    // TODO: Modal on click not yet implemented
    private configureModalOnClick(challenge: MappableChallengeCategory) {
        let this_obj = this
        let map = this.map
        
        // On click, open modal for the event
        map.on('click', `layer_${challenge.challenge_id}`, function () {
            this_obj.toggles.challenge_modal()
        })
    }

    private configure_card_on_hover(challenge: MappableChallengeCategory) {
        let this_obj = this
        let map = this.map

        const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
        })

        // On hover, show card describing event
        map.on('mouseenter', challenge.name, function(e) {
            // Copy coordinates array.
            // const coordinates = event.coordinates[0].get()  // TODO review and update
            // const description: = e.features[0].properties.description // TODO review and update
            const coordinates = [52.25007458166482, 0.09771024674431904]

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            // coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            // }

            popup.setLngLat([52.25007458166482, 0.09771024674431904]).setHTML('<p>hello</p>').addTo(map)
        })

        map.on('mouseleave', challenge.name, function () {
            popup.remove();
        })
    }

    private import_asset(type: string, challenge_id: number) {
        let asset: any = null
        try {
            asset = require(`assets/${type}/${challenge_id}.png`)
        } catch {
            asset = require(`assets/${type}/default.png`)
        }
        return asset
    }

    // public fly_to(center: any) {
    //     this.map.flyTo({center: center.get_lng_lat()})
    // }
    public fly_to(center: GeoJSON) {
        if (center) {
            this.map.flyTo({center: center.get_lng_lat()})
        }
    }

}