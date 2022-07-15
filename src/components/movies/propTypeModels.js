import { PropTypes } from 'prop-types';

export const movieShape = {
  id: PropTypes.number,
  title: PropTypes.string,
  vote_average: PropTypes.number,
  original_language: PropTypes.string,
  overview: PropTypes.string,
  original_title : PropTypes.string,
};
