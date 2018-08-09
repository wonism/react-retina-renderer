/** @jsx createElement */
import { createElement, Fragment, Component } from 'react';
import { render } from 'react-dom';
import Image from '../src';
import { whyDidYouUpdate } from 'why-did-you-update';

whyDidYouUpdate(require('react'));

const root = document.getElementById('root');

class App extends Component {
  static img1 = 'https://thumb9.shutterstock.com/display_pic_with_logo/1743959/436277212/stock-vector-vector-superhero-posing-isolated-on-white-background-436277212.jpg';
  static img2 = 'https://thumb7.shutterstock.com/display_pic_with_logo/2672047/709610344/stock-vector-armored-robot-superhero-flying-709610344.jpg';
  static img3 = 'https://thumb7.shutterstock.com/display_pic_with_logo/1195310/284137514/stock-photo-khonkaen-thailand-june-th-irons-mark-xxxiii-man-figure-standing-gracefully-iron-man-284137514.jpg';
  static img4 = 'https://thumb1.shutterstock.com/display_pic_with_logo/2544076/615514709/stock-photo-singapore-march-human-size-ironman-model-display-at-the-store-615514709.jpg';

  constructor(props) {
    super(props);

    this.state = { set: [App.img1, App.img2] };
  }

  handleClick = () => {
    if (this.state.set[0] === App.img1) {
      this.setState({ set: [App.img3, App.img4] });
    } else {
      this.setState({ set: [App.img1, App.img2] });
    }
  };

  render() {
    const { set } = this.state;

    return (
      <Fragment>
        <Image src={set} height={200} />
        <br />
        <button onClick={this.handleClick}>Change Image</button>
      </Fragment>
    );
  }
}

render(
  <App />,
  root
);
