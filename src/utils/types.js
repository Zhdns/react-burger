import PropTypes from 'prop-types';

export const bunType = PropTypes.arrayOf(PropTypes.shape({
  _id: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
}));

export const mainType = PropTypes.arrayOf(PropTypes.shape({
  _id: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
}));

export const sauceType = PropTypes.arrayOf(PropTypes.shape({
  _id: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.string,
}));