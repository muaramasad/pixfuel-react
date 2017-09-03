import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App url={'http://pixfuel.dev/wp-json/wp/v2/resources?_embed'} perPage={9}/>, document.getElementById('root'));
registerServiceWorker();
