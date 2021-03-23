import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './views/Home';
import Profile from './views/Profile';
import Single from './views/Single';

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Single" component={Single} />
      </Switch>
    </Router>
  );
};

export default App;
