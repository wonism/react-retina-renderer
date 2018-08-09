# React Retina Renderer
> React component for rendering retina images.
> This component was created with reference to
> [react-retina-image](https://github.com/KyleAMathews/react-retina-image)

## Installation
```
$ npm i -S react-retina-renderer
```

## Demo
```
$ npm run dev
# and visit localhost:7777
```

## Usage
```js
import Image from 'react-retina-renderer';

/* ... */
<Image src={[IMG_SRC_1, IMG_SRC_2]} height={200} />
/* ... */
```

## Properties
| property                | type                       | required | remark |
|:------------------------|:---------------------------|:--------:|:-------|
| src                     | array of strings or string | o        | If you want to render retina image on retina display, pass the array |
| alt                     | string                     | x        | Alternate text for an image |
| width                   | number                     | x        | Image's width. If it is omitted, img will use `auto` or `naturalWidth` |
| height                  | number                     | x        | Image's height. If it is omitted, img will use `auto` or `naturalHeight` |
| forceOriginalDimensions | bool                       | x        | If it is true, It will pass width and height as a real value to `<img>` |
| onLoad                  | function                   | x        | Callback function which is triggered when image is loaded |
| onError                 | function                   | x        | Callback function which is triggered when image is failed to load |
