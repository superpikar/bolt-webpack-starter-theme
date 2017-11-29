import _ from 'lodash';

import '../scss/style.scss';

function init() {
  console.log('Hello webpack!');
  console.log('Lodash works!', _.kebabCase('Hello webpack!'));
  console.log('jQuery works! title of this page is : ', $('h1').text());
}

init();
 
