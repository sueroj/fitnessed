import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar'
import './rank.css';

import Profiles from 'core/libs/profiles'
import Profile from 'core/objects/profile'
import test_banner from 'assets/banners/test_banner.png'
import test_profile_img from 'assets/banners/test_profile_img.png'

// TODO: Refactor props
type RankProps = {
    profiles: Profiles
}

type RankHeaderProps = {
    profile: Profile
}

type RankEmblemProps = {

}

type RankProgressBarProps = {
    profile: Profile
}

type ProfileProgressProps = {
    profile: Profile
}

type ProfileTitleProps = {
    profile: Profile
}


export default function Rank(props: RankProps) {
    return (
        <div className='rank-panel'>
            <div className='rank-panel-top'>
                <div className='rank-panel-top-left'>
                    <RankEmblem />
                </div>
                <div className='rank-panel-top-right'>
                    <RankHeader profile={props.profiles.user}/>
                    <RankProgressBar profile={props.profiles.user} />
                </div>
            </div>

            <div className='rank-panel-bottom'>
                <ProfileSummary profile={props.profiles.user} />

                <ProfileTitle profile={props.profiles.user}/>
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

export function ProfileSummary(props: ProfileProgressProps) {
    return (
        <div className='profile-summary'>
            <div className='profile-summary-row'>
                <ProfileSummaryNumComplete profile={props.profile}/>
                <ProfileSummaryNumComplete profile={props.profile}/>
                <ProfileSummaryNumComplete profile={props.profile}/>
            </div>
            <div className='profile-summary-row'>
                <ProfileSummaryNumComplete profile={props.profile}/>
                <ProfileSummaryNumComplete profile={props.profile}/>
                <ProfileSummaryNumComplete profile={props.profile}/>
            </div>

        </div>
    );
}

export function ProfileSummaryNumComplete(props: ProfileProgressProps) {
    return (
        <div className='profile-summary-num-complete'>
            0 Zones
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