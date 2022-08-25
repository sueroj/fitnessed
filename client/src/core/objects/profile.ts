import { AllChallengeCategories } from 'core/libs/challenges'



// TODO: Eval use of Username
// type Username = {
//     first: string
//     last: string
// }

type Title = {
    first: string,
    middle: string,
    last: string
}

export default class Profile {
    public profile_id: number = 0
    public strava_id: number = 0
    public firstname: string = ''
    public lastname: string = ''
    public rank: number = 0 // TODO: Eval refactor into class Rank for FE + BE
    public rp: number = 0 // TODO: RP is total of all earned, rank level is calc from there
    public rp_to_next: number = 0

    // TODO: Feature for unlockable title combinations, to be shown on the leader boards
    public title: Title = {
        first: '',
        middle: '',
        last: ''
    }
    public home_id: number = 0
    public img: string = ''
    public completed_challenges: AllChallengeCategories = []

    // public constructor(json: Profile | any) {
    //     json = json[0]
    //     console.log(json.value)
    //     this.profile_id = json.profile_id
    //     this.strava_id = json.strava_id
    //     this.firstname = json.firstname
    //     this.lastname = json.lastname
    //     this.rank = json.rank
    //     this.rp = json.rp_to_next
    //     this.title = json.title
    //     this.home_id = json.home_id
    //     this.img = json.img
    //     return this
    // }

    public create_from_json(json: any) {
        json = json[0]
        console.log(json.value)
        this.profile_id = json.profile_id
        this.strava_id = json.strava_id
        this.firstname = json.firstname
        this.lastname = json.lastname
        this.rank = json.rank
        this.rp = json.rp_to_next
        this.title = json.title
        this.home_id = json.home_id
        this.img = json.img
        return this
    }

    public test_profile(profile_id: number, firstname: string, lastname: string, 
                        rank: number, rp: number) {
        this.profile_id = profile_id
        this.firstname = firstname
        this.lastname = lastname
        this.rank = rank
        this.rp = rp 
        return this
    }

    // public get_completed_by_category(category: ChallengeCategory) {
    //     const completed: CompletedChallenge[] = []
    //     this.completed_challenges.forEach(challenge => {
    //         if (challenge.)
    //     })
    // }

}
