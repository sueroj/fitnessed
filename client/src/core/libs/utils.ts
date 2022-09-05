export function import_asset(type: string, challenge_id: number) {
    let asset: any = null
    try {
        asset = require(`assets/${type}/${challenge_id}.png`)
    } catch {
        asset = require(`assets/${type}/default.png`)
    }
    return asset
}