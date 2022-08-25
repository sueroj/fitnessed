export enum EventTier {
    TIER_0,
    TIER_1,
    TIER_2,
    TIER_3,
    TIER_4
}

export enum ChallengeCategoryMajor {
    CHALLENGE = 'Challenge',
    ZONE = 'Zone',
    COURSE = 'Course',
    SPRINT = 'Sprint',
    MILESTONE = 'Milestone',
    COLLECTABLE = 'Collectable',
    ACHIEVEMENT = 'Achievement'
}

export enum CourseCategoryMinor {
    STANDARD = 'Standard',
    LOOP = 'Loop',
    OPEN_GUIDED = 'Open Guided',
    OPEN_UNGUIDED = 'Open Unguided'
}

export enum SprintCategoryMinor {
    STANDARD = 'Standard'
}

export enum MilestoneCategoryMinor {
    DAILY = 'Daily',
    WEEKLY = 'Weekly',
    MONTHLY = 'Monthly'
}

export enum CompleteStatus {
    NOT_COMPLETE,
    STANDARD_T0,
    BRONZE_T1,
    SILVER_T2,
    GOLD_T3
}

// TODO: STILL needs fine tuning
export enum AssetType {
    // Items imported by enum ItemType
    ITEM = 'items',
    
    // Below types imported by id number
    BANNER = 'banners',
    ACHIEVEMENT = 'achievements',
    MILESTONE = 'milestones'
}