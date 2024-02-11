import authentication from './authentication'
import companies from './companies'
import integrations from './integrations'
import main from './main'
import platforms from './platforms'
import users from './users'

export default {
  ...main,
  ...platforms,
  ...companies,
  ...users,
  ...integrations,
  ...authentication,
}
