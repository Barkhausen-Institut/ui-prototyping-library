# UI Prototyping Library and Example
Example how the CoRoLa group of the [Barkhausen Institut](https://www.barkhauseninstitut.org/) creates user interfaces for demonstrators.

This repository contains the library and a minimum working example of how we implement web-based UIs for our demonstrators (see [Link to Blog](https://www.barkhauseninstitut.org/en/research/lab-1/our-blog/posts/ui-prototyping) for more details on the implementation).

![](img/ui_prototyping_animation.gif)

**Disclaimer: We are aware, that this repository does not follow common JavaScript conventions, like using a build system or `npm` integration.**


## How to run
- Create a python virtual environment. The code was tested with Python 3.9, but should run with most versions that support Flask. Install the requirements by `pip install -r requirements.txt`.
- Strip the example SVG file with `make svg`
- Run the server with `make serve`
- Access the website with at http://localhost:5000

## License
This project is released under the General Public License v3. The bundled [jQuery](https://jquery.com/) source code is licensed under the [jQuery license](https://jquery.org/license/) and the bundled [anime.js](https://animejs.com/) source code is licensed under the MIT license.
