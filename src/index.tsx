import React from 'react';
import { render } from 'react-dom';


import AppHot, { App } from './App'

const isProduction = process.env.NODE_ENV === 'production'

render(isProduction ? <App /> : <AppHot />, document.getElementById('root'));



