import { Route, Switch, Redirect } from 'wouter';
import { Movie, MovieDetails } from '../views';
import routes from './routes';

const ApplicationRouter = () => (
  <Switch>
    <Route path={routes.movie.all} component={Movie} />
    <Route path={routes.movie.details} component={MovieDetails} />
    <Route path={routes.index}>
      <Redirect to={routes.movie.all} />
    </Route>
    <Route>
      <Redirect to={routes.movie.all} />
    </Route>
  </Switch>
);

export { ApplicationRouter, routes };
