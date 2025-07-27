import { BrowserRouter as Router } from 'react-router-dom';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';


const RoutesComponent = () => {
  return useRoutes(routes); 
};

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <RoutesComponent />
      </Suspense>
    </Router>
  );
};

export default App;