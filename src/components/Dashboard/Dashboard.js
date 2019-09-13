import React, { Component } from 'react';
import shortid from 'shortid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Controls from '../Controls/Controls';
import Balance from '../Balance/Balance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';

export default class Dashboard extends Component {
  state = {
    transaction: [],
    balance: 0,
    amount: '',
    balanceDeposit: 0,
    balanceWithdraw: 0,
  };

  componentDidMount() {
    const getIte = localStorage.getItem('bank');
    if (getIte !== null) {
      const item = JSON.parse(getIte);
      this.setState({ ...item });
    }
  }

  componentDidUpdate(prevProp, prevState) {
    const { transaction } = this.state;
    if (prevState.transaction !== transaction) {
      localStorage.setItem('bank', JSON.stringify(this.state));
    }
  }

  // input;
  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  // click on Button
  handleClick = ({ target }) => {
    const { name } = target;
    this.addTransaction({ ...this.state }, name);
  };

  resetInput = () => {
    this.setState({
      amount: '',
    });
  };

  notifyWarn = () => toast.warn('Enter corect amount...');

  notifyError = () =>
    toast.error('Not enough money! Please enter correct number');

  addTransaction = (stateObject, typeName) => {
    if (Number(stateObject.amount) === 0) {
      this.notifyWarn();
      this.resetInput();
      return;
    }

    const transitionAdd = {
      id: shortid.generate(),
      type: typeName,
      amount: stateObject.amount,
      data: new Date().toLocaleString(),
    };
    if (typeName === 'deposit') {
      this.setState(prevState => ({
        transaction: [...prevState.transaction, transitionAdd],
        balance: stateObject.balance + Number(stateObject.amount),
        balanceDeposit: stateObject.balanceDeposit + Number(stateObject.amount),
        amount: '',
      }));
    } else if (typeName === 'withdraw') {
      if (stateObject.amount <= stateObject.balance) {
        this.setState(prevState => ({
          transaction: [...prevState.transaction, transitionAdd],
          balance: stateObject.balance - Number(stateObject.amount),
          balanceWithdraw:
            stateObject.balanceWithdraw + Number(stateObject.amount),
          amount: '',
        }));
      } else {
        this.resetInput();
        this.notifyError();
      }
    }
  };

  render() {
    const {
      transaction,
      balance,
      amount,
      balanceDeposit,
      balanceWithdraw,
    } = this.state;

    return (
      <>
        <Controls
          onChange={this.handleChange}
          onClick={this.handleClick}
          amount={amount}
        />
        <ToastContainer />
        <Balance
          balanceDeposit={balanceDeposit}
          balanceWithdraw={balanceWithdraw}
          balance={balance}
        />
        {transaction.length > 0 && (
          <TransactionHistory transaction={transaction} />
        )}
      </>
    );
  }
}
