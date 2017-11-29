import _ from 'lodash';

import '../scss/style.scss';

function init() {
  console.log('Hello webpack!');
  console.log('Lodash work!', _.kebabCase('Hello webpack!'));
}

init();
 
