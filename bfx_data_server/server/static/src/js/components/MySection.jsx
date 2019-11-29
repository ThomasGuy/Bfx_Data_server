import React from "react";
import PropTypes from 'prop-types';

const MySection = ({ name, age }) => (
  <div className="container-fluid mysite-section bg-mysite-dark" id="mySection">
    <div className="container">
      <div className="row justify-content-center">
        <h4>
          Hello, {name}! at {age}{" "}
          <span>
            <i className="fa fa-home" />
          </span>{" "}
          miles an hour...
        </h4>
      </div>
    </div>
  </div>
);

MySection.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
}

export default MySection;
