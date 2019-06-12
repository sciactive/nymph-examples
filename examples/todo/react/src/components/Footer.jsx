import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ userCount }) => (
  <div
    className="label label-default"
    style={{ position: 'fixed', right: '5px', bottom: '5px' }}
  >
    Active Users: {userCount}
  </div>
);

Footer.propTypes = {
  userCount: PropTypes.number,
};

export default Footer;
