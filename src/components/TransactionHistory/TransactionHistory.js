import React from 'react';
import PropTypes from 'prop-types';
import style from './TransactionHistory.module.css';

const TransactionHistory = ({ transaction }) => {
  return (
    <>
      <table className={style.history}>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className={style.line}>
          {transaction.map(item => (
            <tr className={style.line} key={item.id}>
              <td>{item.type}</td>
              <td>{item.amount}$</td>
              <td>{item.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TransactionHistory;

TransactionHistory.propTypes = {
  transaction: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      type: PropTypes.string,
      amount: PropTypes.node,
      date: PropTypes.string,
    }).isRequired,
  ).isRequired,
};
