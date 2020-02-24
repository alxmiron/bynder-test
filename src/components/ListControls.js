import React from 'react';
import PropTypes from 'prop-types';
import './ListControls.scss';

const ListControls = () => {
	return <div className="controls--container"></div>;
};

const { shape } = PropTypes;
ListControls.propTypes = {
	peopleHash: shape({}).isRequired,
};

export default ListControls;
