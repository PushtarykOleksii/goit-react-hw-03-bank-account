import React from 'react';
import PropTypes from 'prop-types';
import style from './Balance.module.css';

const Balance = ({ balanceWithdraw, balanceDeposit, balance }) => (
  <>
    <section className={style.balance}>
      <span className={style.balanceI} role="img" aria-label="deposit">
        ⬆️ {balanceDeposit}$
      </span>
      <span className={style.balanceI} role="img" aria-label="withdraw">
        ⬇️ {balanceWithdraw}$
      </span>
      <span className={style.balanceI}>Balance: {balance} $</span>
    </section>
  </>
);

export default Balance;

Balance.propTypes = {
  balanceWithdraw: PropTypes.number.isRequired,
  balanceDeposit: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};
