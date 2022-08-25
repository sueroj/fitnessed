import Profile from 'core/objects/profile'

export default class TestProfiles {
    public profiles: Profile[] = this.generate_profiles()
    public firstnames: string[] = ['Joel', 'John', 'James', 'Sam', 'Jim', 'Bob', 'Roger', 'Matt', 'Billy-Jo-Jimmy', 'Kevin']
    public lastnames: string[] = ['Suero', 'Smith', 'Richards', 'Costa', 'Exteberrias', 'Hildalgo-Morias', 'OConner', 'van der Rees']


    private generate_profiles() {
        let profs: Profile[] = []
        for (let i=0; i>7; i++) {
            let mock_json = {
                profile_id: 100 + i,
                strava_id: 500 + i,
                firstname: this.firstnames.pop(),
                lastname: this.lastnames.pop(),
                rank: 1 + i,
                rp: 20 + i,
                title: '',
                home_id: 666 + i,
                img: ''
            }
            profs.push(new Profile().create_from_json(mock_json))
        }

        return profs
    }
}