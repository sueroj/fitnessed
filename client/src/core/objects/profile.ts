
import { CompleteStatus, League } from 'core/enums/enums'
import { TestCompletedEvents } from 'test/test_challenges'


// TODO: Eval use of Username
// type Username = {
//     first: string
//     last: string
// }

type CompletedEvent = {
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
    public league: League = League.DIAMOND

    // TODO: Feature for unlockable title combinations, to be shown on the leader boards
    public title: Title = {
        first: 'Ultra',
        middle: 'Marathon',
        last: 'Dude'
    }
    // public home: City = ''
    public profile_img: string = ''
    public completed_challenges: CompletedEvent[] = new TestCompletedEvents().events

    public test_profile(id: number, firstname: string, lastname: string, 
                        rank: number, rp: number, league: League) {
        this.id = id
        this.firstname = firstname
        this.lastname = lastname
        this.rank = rank
        this.rp = rp 
        this.league = league
        return this
    }

}

// const PROFILE = new Profile()
// export default PROFILE