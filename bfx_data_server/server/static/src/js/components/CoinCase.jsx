/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable no-restricted-syntax */
import React from "react";
// import PropTypes from "prop-types";
import CoinBox from "./CoinBox";

class CoinCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coins: []
    };
    this.username = props.username;
    this.age = props.age;
  }

  componentDidMount() {
    fetch("/api/data")
      .then(response => {
        return response.json();
      })
      .then(data => {
        const coins = Object.entries(data).map(([key, value]) => {
          return { coin: [key, value] };
        });
        this.setState({ coins });
      });
    console.log(`Hi ${this.username} age: ${this.age}`);
  }

  render() {
    const { coins } = this.state;
    const coinlist = coins.map(obj => {
      return (
        <li key={obj.coin[0]}>
          <CoinBox name={obj.coin[0]} price={obj.coin[1]} />
        </li>
      );
    });

    return (
      <>
        <h3>Welcome {this.username}</h3>
        <hr />
        <div className='coinlist'>
          <ol>{coinlist}</ol>
        </div>
      </>
    );
  }
}

// CoinCase.propTypes = {};

export default CoinCase;
