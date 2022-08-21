import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import './main.css'
import './login.css'

import { LoginNavigation } from 'components/navigation/Navigation'

import Http from 'core/libs/http'
import TestChallenges from 'test/test_challenges'

type Props = {
}

export default function Login(props: Props) {
    const http = new Http()

    // // TODO: Eval if possible to store profile & events in global objects
    // // TODO: instead of being passed down component order

    function login() {
        get_auth()
    }

    // TODO: Review use of async w/ using .then() in login func
    async function get_auth() {
        await http.get_auth()
    }

    // Update profile from latest activities
    // If activity update found, launch interactive window
    // showing what has changed, like a 'quest' completion screen



    // TODO: DEV ONLY TOOL FUNCTIONS
    function load_test_challenges() {
        let challenges = new TestChallenges().challenges
        // for (let challenge of challenges) {
        //     http.post_test_challenge(challenge)
        // }
        http.post_test_challenge(challenges[4])
    }


    return (
        <div className='login-container'>
            <LoginNavigation />
            
                <Form className='login-form'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className='login-label'>Login</Form.Label>
                        {/* <Form.Control type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text> */}
                    </Form.Group>

                    {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group> */}
                    <div id='login-button-wrapper' className='login-button-wrapper'>
                        <Button className='login-button-strava' variant='primary' onClick={() => login()}>
                            DEV ONLY LOGIN
                        </Button>

                        <Button className='login-button-strava' variant='primary' onClick={() => load_test_challenges()}>
                            LOAD TEST CHALLENGES
                        </Button>
                    </div>

                </Form>
        </div>
    );
}