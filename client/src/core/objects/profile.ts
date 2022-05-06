
import { CompleteStatus, League } from 'core/enums/enums'
import { TestCompletedEvents as TestCompletedChallenge } from 'test/test_challenges'


// TODO: Eval use of Username
// type Username = {
//     first: string
//     last: string
// }

type CompletedChallenge = {
    id: number
    complete_status: CompleteStatus
}

type Title = {
    first: string,
    middle: string,
    last: string
}

export default class Profile {
    public id: number = 12345
    public firstname: string = 'Joel'
    public lastname: string = 'Suero'
    public rank: number = 75
    public rp: number = 106 // TODO: RP is total of all earned, rank level is calc from there
    public rp_to_next: number = 800

    // TODO: Feature for unlockable title combinations, to be shown on the leader boards
    public title: Title = {
        first: 'Ultra',
        middle: 'Marathon',
        last: 'Dude'
    }
    public home_id: number = 12345
    public profile_img: string = ''
    public completed_challenges: CompletedChallenge[] = new TestCompletedChallenge().challenges

    public test_profile(id: number, firstname: string, lastname: string, 
                        rank: number, rp: number) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.rank = rank
        this.rp = rp 
        return this
    }

}
