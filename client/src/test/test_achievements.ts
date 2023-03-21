import { Achievement } from 'core/objects/achievement'
import { ChallengeCategoryMajor, CourseCategoryMinor, SprintCategoryMinor, MilestoneCategoryMinor } from 'core/enums/enums'


export default class TestAchievements {
    public achievements: Achievement[] = []

    public constructor() {
        this.achievements = this.generate()
    }

    private generate() {
        return [
            new Achievement().test_load(1001, 'Test Achievement 1', ChallengeCategoryMajor.ZONE),
            new Achievement().test_load(1002, 'Test Achievement 2', ChallengeCategoryMajor.ZONE),
            new Achievement().test_load(1003, 'Test Achievement 3', ChallengeCategoryMajor.ZONE),
            new Achievement().test_load(1004, 'Test Achievement 4', ChallengeCategoryMajor.ZONE),
            new Achievement().test_load(1005, 'Test Achievement 5', ChallengeCategoryMajor.ZONE),
            new Achievement().test_load(1006, 'Test Achievement 6', ChallengeCategoryMajor.SPRINT),
            new Achievement().test_load(1007, 'Test Achievement 7', ChallengeCategoryMajor.SPRINT),
            new Achievement().test_load(1008, 'Test Achievement 8', ChallengeCategoryMajor.SPRINT),
            new Achievement().test_load(1009, 'Test Achievement 9', ChallengeCategoryMajor.COURSE),            new Achievement().test_load(1000, 'Test Achievement 1', ChallengeCategoryMajor.ZONE),
            new Achievement().test_load(1010, 'Test Achievement 10', ChallengeCategoryMajor.COURSE),
            new Achievement().test_load(1011, 'Test Achievement 11', ChallengeCategoryMajor.COURSE),
            new Achievement().test_load(1012, 'Test Achievement 12', ChallengeCategoryMajor.MILESTONE),
            new Achievement().test_load(1013, 'Test Achievement 13', ChallengeCategoryMajor.COLLECTABLE)
        ]
    }
}