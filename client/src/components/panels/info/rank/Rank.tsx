import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import './rank.css';

import Profiles from 'core/libs/profiles'
import Challenges from 'core/libs/challenges';
import Profile from 'core/objects/profile'
import { ChallengeCategoryMajor } from 'core/enums/enums'
import test_banner from 'assets/banners/test_banner.png'
import test_profile_img from 'assets/banners/test_profile_img.png'

// TODO: Refactor props
type RankProps = {
    profiles: Profiles
    challenges: Challenges
}

type RankHeaderProps = {
    profile: Profile
}

type RankEmblemProps = {

}

type RankProgressBarProps = {
    profile: Profile
}

type ChallengeSummaryProps = {
    challenges: Challenges
}

type ProfileSummaryNumCompleteProps = {
    category: ChallengeCategoryMajor
    challenges: Challenges
}

type ProfileTitleProps = {
    profile: Profile
}

// TODO: IMPLEMENT - Challenges required in order to rank up

export default function Rank(props: RankProps) {
    return (
        <div className='rank-panel'>
            <div className='rank-panel-top'>
                <div className='rank-panel-top-left'>

                </div>
                <div className='rank-panel-top-middle'>
                    <RankEmblem />
                </div>
                <div className='rank-panel-top-right'>

                </div>
            </div>

            <div className='rank-panel-bottom'>
                <RankHeader profile={props.profiles.user} />
                <RankProgressBar profile={props.profiles.user} />


                {/* <ChallengeSummary challenges={props.challenges} />

                <ProfileTitle profile={props.profiles.user}/> */}
            </div>
        </div>
    );
}

export function RankEmblem(props: RankEmblemProps) {
    return (
        <div className='rank-emblem'>
            <Image className="rank-emblem-img" src={test_profile_img} alt='change this' rounded />
        </div>

    );
}

export function RankHeader(props: RankHeaderProps) {
    return (
        <div className='rank-header'>
            <div className='header-rank'>
                Rank {props.profile.rank} | {props.profile.rp} RP
            </div>
        </div>
    );
}

export function RankProgressBar(props: RankProgressBarProps) {
    return (
        <div className='rank-progress-bar'>
            <div className="rank-progress-numeric">{props.profile.rp} / {props.profile.rp_to_next}</div>
            <ProgressBar className="rank-progress" variant="warning" animated now={50} />
        </div>
    );
}

export function ChallengeSummary(props: ChallengeSummaryProps) {
    return (
        <div className='profile-summary'>
            <div className='profile-summary-row'>
                <ProfileSummaryNumComplete category={ChallengeCategoryMajor.ZONE} challenges={props.challenges} />
                <ProfileSummaryNumComplete category={ChallengeCategoryMajor.COURSE} challenges={props.challenges} />
                <ProfileSummaryNumComplete category={ChallengeCategoryMajor.SPRINT} challenges={props.challenges} />
            </div>
            <div className='profile-summary-row'>
                <ProfileSummaryNumComplete category={ChallengeCategoryMajor.COLLECTABLE} challenges={props.challenges} />
                <ProfileSummaryNumComplete category={ChallengeCategoryMajor.MILESTONE} challenges={props.challenges} />
                <ProfileSummaryNumComplete category={ChallengeCategoryMajor.ACHIEVEMENT} challenges={props.challenges} />
            </div>

        </div>
    );
}

export function ProfileSummaryNumComplete(props: ProfileSummaryNumCompleteProps) {
    const num_complete = props.challenges.get_num_completed_by_category(props.category)

    return (
        <div className='profile-summary-num-complete'>
            {num_complete} {props.category.toString()}{num_complete === 1 ? '' : 's'}
        </div>
    );
}

export function ProfileTitle(props: ProfileTitleProps) {
    return (
        <div className='profile-title'>
            "{props.profile.title.first} {props.profile.title.middle} {props.profile.title.last}"
        </div>
    );
}