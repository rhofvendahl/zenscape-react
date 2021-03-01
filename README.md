# ZenScape React

#### By Russell Hofvendahl

## About
A rippling interactive landscape, built with React.

ZenScape is live at: https://zenscape.us

## Setup
1. Clone this repo and navigate to the root directory.
```
git clone https://github.com/rhofvendahl/zenscape-react
cd movie_finder_api
```

2. Install dependencies.
```
yarn install
```

3. Run the local server.
```
yarn start
```

## Additional Notes
Inside index.js you will find references to "x", "y" and "z", which refer to the object coordinate system. As this project uses CSS transformations to construct the 3D landscape I have used the CSS coordinate convention, which is as follows:
* X: Pointing downward along the screen.
* Y: Pointing to the right.
* Z: Pointing out at the user.

## License

Copyright (c) 2021 Russell Hofvendahl

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
