import { CompleteStatus } from "core/enums/enums"
import color_scheme, { C_CANVAS } from "core/config/color_scheme"

const CANVAS_STRING: string = 'complete_'

export default class CompleteCanvas {
    private event_id: number = 0
    public canvas_id: string = ''



    // public constructor(event_id: number, completion_status: CompletionStatus) {
    //     if (completion_status === CompletionStatus.NOT_COMPLETE) {
    //         return this   
    //     }

    //     this.event_id = event_id
    //     this.canvas_id = this.generate_canvas_id()
    //     this.render_element(this.get_color_scheme(completion_status))
    // }

    public render(event_id: number, complete_status: CompleteStatus) {
        this.event_id = event_id
        this.canvas_id = this.generate_canvas_id()
        this.render_element(this.get_color_scheme(complete_status))
        return this
    }

    private generate_canvas_id() {
        return CANVAS_STRING + this.event_id
    }

    private get_color_scheme(complete_status: CompleteStatus) {
        return color_scheme.get_completion_canvas(complete_status)
    }

    private render_element(color_scheme: C_CANVAS) {
        let canvas = document.getElementById(this.canvas_id) as HTMLCanvasElement
        if (canvas === null) {
            return null
        }

        canvas.id = this.canvas_id
        let context = canvas.getContext('2d')
        if (context) {
            context.beginPath();
            // Border
            context.arc(25,25,18,0,2*Math.PI);
            context.strokeStyle = color_scheme.border
            context.lineWidth = 7
            context.stroke()
            // Fill
            context.fillStyle = color_scheme.fill
            context.fill();
            context.closePath()

            // Checkmark
            context.beginPath();
            context.strokeStyle = color_scheme.checkmark
            context.lineWidth = 6
            context.moveTo(16, 20)
            context.lineTo(25,30)
            context.lineTo(41,16)
            context.stroke()
        }
    }
}