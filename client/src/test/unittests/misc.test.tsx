import { GeoJSON } from 'core/objects/misc'


test("[Object/Misc] GeoJSON returns correct lng-lat & lat-lng order", () => {
    const test_cases = new Map([
        [40.00, 65.00],
        [-33.32, -12.4156732],
        [0.1245664, -42.1124]
    ])
    for (let [lng, lat] of test_cases) {
        const geojson = new GeoJSON(lat, lng)
        expect(geojson.get_lng_lat()).toStrictEqual([lng, lat])
        expect(geojson.get_lat_lng()).toStrictEqual([lat, lng])
    }
})
