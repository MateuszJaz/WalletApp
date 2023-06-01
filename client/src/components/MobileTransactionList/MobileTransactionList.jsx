import { useSelector } from 'react-redux';
import { selectTransactions } from '../../redux/selector';
import css from './MobileTransactionList.module.css';
import clsx from 'clsx';
import sprite from '../../assets/icon/sprite.svg';

const MobileTransactionList = () => {
  const transactions = useSelector(selectTransactions);

  return (
    <div className={clsx(css.container, css.transactionContainer)}>
      {transactions.map((transaction, index) => (
        <ul
          key={index}
          className={clsx(css.transactionGrid, {
            [css.income]: transaction.Type === '+',
            [css.expense]: transaction.Type === '-',
          })}
        >
          {Object.keys(transaction).map((keyObj, index) => (
            <li className={css.transactionItem} key={index}>
              <p className={css.title}>{keyObj}</p>
              <p
                className={clsx(css.text, {
                  [css.plus]: transaction.Type === '+' && keyObj === 'Sum',
                  [css.minus]: transaction.Type === '-' && keyObj === 'Sum',
                })}
              >
                {keyObj !== 'Date' && transaction[keyObj]}
                {keyObj === 'Date' &&
                  new Date(transaction[keyObj]).toLocaleDateString()}
              </p>
            </li>
          ))}
          <li className={css.transactionItem}>
            <button className={css.btn}>Delete</button>
            <div className={css.wrapper}>
              <svg className={css.icon}>
                <use xlinkHref={`${sprite}#pen`}></use>
              </svg>
              <p className={css.text}>Edit</p>
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
};

export default MobileTransactionList;
