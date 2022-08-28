import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Navigation from 'components/navigation/Navigation'
import Profile from 'core/objects/profile'

test("[Navigation] contains correct profile name", () => {
  let profile = new Profile()
  profile.firstname = 'John'
  profile.lastname = 'Doe'

  render(<Navigation strava_id={{}} profile={profile} toggles={{}}/>)
  const prof = screen.getByText(profile.firstname, {exact: false})
  expect(prof.innerHTML).toContain(`${profile.firstname} ${profile.lastname[0]}`)
  cleanup()
})

export {}