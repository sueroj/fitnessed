import { CompleteStatus } from "core/enums/enums"
import color_scheme, { C_CANVAS } from "core/config/color_scheme"

export class GenericCanvas {
    protected challenge_id: number = 0
    public canvas_id: string = ''

    protected generate_canvas_id(id_header: string) {
        return `${id_header}_${this.challenge_id}`
    }
}

export class GenericZoneCanvas extends GenericCanvas {
    readonly id_header = 'zone_canvas'

    public render(challenge_id: number) {
        this.challenge_id = challenge_id
        this.canvas_id = this.generate_canvas_id(this.id_header)
        this.draw_element()
        return this
    }



    // private get_color_scheme(complete_status: CompleteStatus) {
    //     return color_scheme.get_completion_canvas(complete_status)
    // }

    private draw_element() {
        let canvas = document.getElementById(this.canvas_id) as HTMLCanvasElement
        if (canvas === null) {
            return null
        }

        canvas.id = this.canvas_id
        let context = canvas.getContext('2d')
        if (context) {
            context.beginPath();
            // Border
            context.rect(1, 1, 60, 60)
            context.strokeStyle = '#000'
            // context.lineWidth = 7
            // context.stroke()



            // context.arc(25,25,18,0,2*Math.PI);
            context.strokeStyle = '#fff'
            context.lineWidth = 3
            context.stroke()
            // Fill
            context.fillStyle = '#fff'
            context.fill();
            context.closePath()

            // Checkmark
            context.beginPath();
            context.strokeStyle = '#c2c2c2'
            context.lineWidth = 6
            context.stroke()
        }
    }
}
