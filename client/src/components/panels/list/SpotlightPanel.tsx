import './spotlight_panel.css';

import Challenges from 'core/libs/challenges'
import Thumbnail from 'components/common/thumbnail/Thumbnail'

type Props = {
    challenges: Challenges
}

export default function SpotlightPanel(props: Props) {
    const key_id = 'spotlight-panel'

    function draw_challenges() {
        let thumbnails: any[] = []
        props.challenges.all.forEach(challenge => {
            if (thumbnails.length < 2) {
                thumbnails.push(<Thumbnail key={`${key_id}-${challenge.challenge_id}`} key_id={key_id} challenge={challenge} />)
            }
        })
        return thumbnails
    }

    // TODO: Eval possible addition of new thin panel section below info panels to include buttons
    return (
        <div className='spotlight-panel'>
            <div className='spotlight-panel-thumbnail-header'>Spotlight</div>
            
            <div className='spotlight-panel-thumbnail'>
                {draw_challenges()}
            </div>
        </div>
    );
}