import unittest

import main as main

class UnittestLeaderboard(unittest.TestCase):
    def setUp(self) -> None:
        return super().setUp()

    def test_leaderboard_is_generated(self):
        assert True