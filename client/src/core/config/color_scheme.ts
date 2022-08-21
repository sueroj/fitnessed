
import { CompleteStatus } from "core/enums/enums";

const COMPLETE_CANVAS_STANDARD = {
    border: '#00FF00',
    fill: '#292929',
    checkmark: '#00FF00'
}

const COMPLETE_CANVAS_GOLD = {
    border: '#fce303',
    fill: '#d1a92e',
    checkmark: '#fce303'
}

const COMPLETE_CANVAS_SILVER = {
    border: '#c2c2c2',
    fill: '#7d7d7d',
    checkmark: '#c2c2c2'
}

const COMPLETE_CANVAS_BRONZE = {
    border: '#d17d00',
    fill: '#6e4200',
    checkmark: '#d17d00'
}

export type C_CANVAS = typeof COMPLETE_CANVAS_STANDARD

class ColorScheme {
    // readonly c_canvas_standard: C_CANVAS = COMPLETION_CANVAS_STANDARD
    // readonly c_canvas_gold: C_CANVAS = COMPLETION_CANVAS_GOLD
    // readonly c_canvas_silver: C_CANVAS = COMPLETION_CANVAS_SILVER
    // readonly c_canvas_bronze: C_CANVAS = COMPLETION_CANVAS_BRONZE

    public get_completion_canvas(status: CompleteStatus) {
        switch (status) {
            case CompleteStatus.STANDARD_T0:
                return COMPLETE_CANVAS_STANDARD
            case CompleteStatus.GOLD_T3:
                return COMPLETE_CANVAS_GOLD
            case CompleteStatus.SILVER_T2:
                return COMPLETE_CANVAS_SILVER
            case CompleteStatus.BRONZE_T1:
                return COMPLETE_CANVAS_BRONZE
            default:
                return COMPLETE_CANVAS_STANDARD
        }
    }

}

const color_scheme = new ColorScheme()
export default color_scheme