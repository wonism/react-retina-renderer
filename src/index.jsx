/** @jsx createElement */
import { createElement, createRef, Component } from 'react';
import { oneOfType, arrayOf, string, number, bool, func } from 'prop-types';
import update from 'immutability-helper';
import isRetina from 'is-retina';
import imageExists from 'image-exists';

export default class Image extends Component {
  static getImage = (src) => {
    if (Array.isArray(src)) {
      return { src: src[0] };
    }

    return { src };
  };

  static propTypes = {
    src: oneOfType([string, arrayOf(string)]).isRequired,
    alt: string,
    width: number,
    height: number,
    forceOriginalDimensions: bool,
    onLoad: func,
    onError: func,
  };

  static defaultProps = {
    alt: '',
    width: null,
    height: null,
    forceOriginalDimensions: false,
    onLoad: () => {},
    onError: () => {},
  };

  static getDerivedStateFromProps = (props, state) => {
    if ((Array.isArray(props.src) && Array.isArray(state.prevSrc)) && (props.src.join('') === state.prevSrc.join(''))) {
      return null;
    }

    if (props.src === state.prevSrc) {
      return null;
    }

    const initialState = {
      hasRetinaImage: true,
      isRetinaLoaded: false,
      isCheckingDone: false,
      prevSrc: props.src,
    };

    return initialState;
  };

  constructor(props) {
    super(props);

    const { src } = this.props;

    this.state = {
      attributes: {
        ...Image.getImage(src),
      },
    };
    this.img = createRef();
  }

  componentDidMount() {
    this.checkRetina();
  }

  shouldComponentUpdate(_, nextState) {
    const { isRetinaLoaded, attributes } = this.state;

    return (
      (!(isRetinaLoaded && nextState.isRetinaLoaded))
      || (attributes.src !== nextState.attributes.src)
      || (attributes.width !== nextState.attributes.width || attributes.height !== nextState.attributes.height)
    );
  }

  componentDidUpdate() {
    this.checkRetina();
  }

  checkRetina = () => {
    const { isCheckingDone } = this.state;
    const { src } = this.props;

    if (!isCheckingDone) {
      const isRetinaDisplay = isRetina();

      if (isRetinaDisplay) {
        if (Array.isArray(src)) {
          const retinaImage = src[1];

          imageExists(retinaImage, (exists) => {
            const { isRetinaLoaded } = this.state;

            if (exists && !isRetinaLoaded) {
              const newState = update(this.state, {
                attributes: {
                  src: {
                    $set: retinaImage,
                  },
                },
                isRetinaLoaded: {
                  $set: true,
                },
              });

              this.setState(newState);
            } else {
              this.setState({ isCheckingDone: true });
            }
          });
        } else {
          const newState = update(this.state, {
            attributes: {
              src: {
                $set: src,
              },
            },
            isCheckingDone: {
              $set: true,
            },
          });

          this.setState(newState);
        }
      }
    }
  };

  handleOnLoad = (e) => {
    const img = this.img.current;
    const { width = 'auto', height = 'auto', forceOriginalDimensions, onLoad } = this.props;

    onLoad(e);

    if (forceOriginalDimensions) {
      const newState = update(this.state, {
        attributes: {
          $merge: {
            width: img.naturalWidth,
            height: img.naturalHeight,
          },
        },
      });

      this.setState(newState);
    } else {
      const newState = update(this.state, {
        attributes: {
          $merge: {
            width,
            height,
          },
        },
      });

      this.setState(newState);
    }
  };

  render() {
    const { src, alt, onError } = this.props;
    const { attributes, isRetinaLoaded } = this.state;

    if (Array.isArray(src) && !isRetinaLoaded) {
      return null;
    }

    return (
      <img
        ref={this.img}
        alt={alt}
        onLoad={this.handleOnLoad}
        onError={onError}
        {...attributes}
      />
    );
  }
}
