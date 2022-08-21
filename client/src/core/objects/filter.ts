

export default class Filter {
    public nearby: boolean = false
    public zones: boolean = true
    public courses: boolean = true
    public sprints: boolean = true
    public collectables: boolean = true
    public milestones: boolean = true
    public achievements: boolean = true

    public update(filter: string) {
        switch (filter) {
            case 'zones':
                this.zones = !this.zones
                break
            case 'courses':
                this.courses = !this.courses
                break
            case 'sprints':
                this.sprints = !this.sprints
                break
            case 'collectables':
                this.collectables = !this.collectables
                break
            case 'milestones':
                this.milestones = !this.milestones
                break
            case 'achievements':
                this.achievements = !this.achievements
                break
        }
        return this
    }
}