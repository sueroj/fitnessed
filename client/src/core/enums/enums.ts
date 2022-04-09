export enum ChallengeView {
    LIST,
    CALENDAR,
    MAP
}

export enum ChallengeCategory {
    CHALLENGE = 'Challenge',
    ZONE = 'Zone',
    COURSE = 'Course',
    SPRINT = 'Sprint',
    MILESTONE = 'Milestone',
    ACHIEVEMENT = 'Achievement'
}

export enum CourseCategory {
    STANDARD,
    LOOP,
    OPEN_GUIDED,
    OPEN_UNGUIDED
}

export enum SprintCategory {
    STANDARD
}

export enum League {
    NEWBIE = 'Newbie League',
    BRONZE = 'Bronze League',
    SILVER = 'Silver League',
    GOLD = 'Gold League',
    PLATINUM = 'Platinum League',
    DIAMOND = 'Diamond League'
}

export enum MilestoneCategory {
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