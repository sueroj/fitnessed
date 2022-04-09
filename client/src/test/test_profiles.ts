import Profile from 'core/objects/profile'
import { League } from 'core/enums/enums'

export default class TestProfiles {
    public profiles: Profile[] = this.generate_profiles()

    private generate_profiles() {
        return [
            new Profile().test_profile(12345, 'Joel', 'Suero', 75, 106, League.DIAMOND),
            new Profile().test_profile(2000, 'John', 'Smith', 40, 236, League.GOLD),
            new Profile().test_profile(2001, 'John', 'Gammon', 12, 236, League.GOLD),
            new Profile().test_profile(2002, 'James', 'Hill', 11, 236, League.GOLD),
            new Profile().test_profile(2003, 'Mister', 'Cyclist', 56, 236, League.GOLD),
            new Profile().test_profile(2004, 'Johnny', 'Runner', 7890, 236, League.GOLD),
            new Profile().test_profile(2005, 'Jacob', 'Shredder', 45, 236, League.GOLD),
            new Profile().test_profile(2006, 'Mike', 'Webb', 65, 236, League.GOLD),
            new Profile().test_profile(2007, 'Tim', 'Goodden', 48, 236, League.GOLD),
            new Profile().test_profile(2008, 'Nick-Jesus', 'Gomez-Valdez-Martin II', 5000, 236, League.GOLD),
            new Profile().test_profile(2009, 'Drew', 'Smith', 615, 236, League.GOLD),
            new Profile().test_profile(2010, 'John', 'Todd', 413, 236, League.GOLD),
            new Profile().test_profile(2011, 'Jon', 'Van der Berggen', 1278, 236, League.GOLD),
            new Profile().test_profile(2012, 'Juan', 'Smith', 476, 236, League.GOLD),
            new Profile().test_profile(2013, 'Thies', 'Hers', 7540, 236, League.GOLD),
            new Profile().test_profile(2014, 'Don', 'Reese', 18937, 236, League.GOLD),
            new Profile().test_profile(2015, 'Tom', 'O\'Conner', 5, 236, League.GOLD),
        ]
    }
}