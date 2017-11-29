# bolt-webpack-starter-theme
Bolt starter theme for bolt, built with webpack

## Features
- compile+minify scss from /src/scss to /dist/css
- compile+uglify js from /src/js to /dist/js
- compile image from /src/images to /dist/images
- reload on save using browsersync

## How to run

1. Clone this project to your theme directory

2. Modify `build/webpack.config.js` to suit your need 
```js
// your local website url, used by browser-sync as proxy
const PROXY_URL = 'http://bolt3-webpack.com/';  

// your template directory path, used by webpack as a root path when transform relative path to absolute path in css loader
const TEMPLATE_PATH = '/theme/bolt-webpack-starter-theme/'; 
```

3. Modify `src/scss/style.scss` to suit your need
```scss
// your template directory path, used as variable when you need to produce absolute path of your assets
$TEMPLATE_URL : '/theme/bolt-webpack-starter-theme/';
```

3. Install project dependency
```
# install webpack global
npm install -g webpack

# install project dependency
npm install 

# running project
npm run dev

# build project
npm run build

```

4. Let's modify the template! :)
Put the following code to include css and js in `master.twig`
```html
<link rel="stylesheet" href="{{ asset('dist/css/style-bundle.css', 'theme') }}">
<script src="{{ asset('dist/js/bundle.js', 'theme') }}"></script>

```

## Todo
- integrate jquery
- handle font
- use bulma as css framework

