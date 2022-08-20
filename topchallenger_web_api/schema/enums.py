from enum import Enum

class ChallengeCategoryMajor(Enum):
    CHALLENGE = 'Challenge'
    ZONE = 'Zone'
    COURSE = 'Course'
    SPRINT = 'Sprint'
    MILESTONE = 'Milestone'
    COLLECTABLE = 'Collectable'
    ACHIEVEMENT = 'Achievement'

class CourseCategoryMinor(Enum):
    STANDARD = 0
    LOOP = 1
    OPEN_GUIDED = 2
    OPEN_UNGUIDED = 3


class SprintCategoryMinor(Enum):
    STANDARD = 0


class MilestoneCategoryMinor(Enum):
    DAILY = 'Daily'
    WEEKLY = 'Weekly'
    MONTHLY = 'Monthly'


class CompleteStatus(Enum):
    NOT_COMPLETE = 0
    STANDARD_T0 = 1
    BRONZE_T1 = 2
    SILVER_T2 = 3
    GOLD_T3 = 4
