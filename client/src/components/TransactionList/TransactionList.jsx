import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, selectTransactions } from "../../redux/selector";
import {
  changeIsModalEditTrasactionOpen,
  setTransactionToEdit,
} from "../../redux/global/slice";
import {
  deleteTransaction,
  fetchTransactions,
} from "../../redux/wallet/wallet.thunk";

import css from "./TransactionList.module.css";
import clsx from "clsx";
import sprite from "../../assets/icon/sprite.svg";
import Loader from "../Loader/Loader";
import Empty from "../Empty/Empty";

const TransactionList = () => {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  const openModalEditTransaction = (data) => {
    dispatch(setTransactionToEdit(data));
    dispatch(changeIsModalEditTrasactionOpen());
  };

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const sortTable = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const getSortArrow = (key) => {
    if (sortConfig.key === key) {
      if (sortConfig.direction === "ascending") {
        return (
          <svg
            className={css.sortArrow}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7 14l5-5 5 5z" fill="currentColor" />
          </svg>
        );
      } else {
        return (
          <svg
            className={css.sortArrow}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10l5 5 5-5z" fill="currentColor" />
          </svg>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <div className={css.container}>
        {!isLoading && transactions.length === 0 ? (
          setTimeout(() => {
            <Empty />;
          }, 1000)
        ) : (
          <table className={css.transactionTable}>
            <thead className={css.tableHead}>
              <tr>
                <th
                  className={css.tableHeader}
                  onClick={() => sortTable("date")}>
                  Date {getSortArrow("date")}
                </th>
                <th
                  className={css.tableHeader}
                  onClick={() => sortTable("type")}>
                  Type {getSortArrow("type")}
                </th>
                <th
                  className={css.tableHeader}
                  onClick={() => sortTable("category")}>
                  Category {getSortArrow("category")}
                </th>
                <th
                  className={css.tableHeader}
                  onClick={() => sortTable("comment")}>
                  Comment {getSortArrow("comment")}
                </th>
                <th
                  className={css.tableHeader}
                  onClick={() => sortTable("amount")}>
                  Sum {getSortArrow("amount")}
                </th>
                <th></th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <tr>
                  <td>
                    <div
                      style={{
                        position: "absolute",
                        width: 200,
                        marginLeft: 200,
                      }}>
                      <Loader variant={"wallet"} scale={0.5} />
                    </div>
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {sortedTransactions.map((transaction, index) => (
                  <tr key={index}>
                    <td className={css.tableData}>
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className={css.tableData}>
                      {transaction.type ? "+" : "-"}
                    </td>
                    <td className={css.tableData}>{transaction.category}</td>
                    <td className={css.tableData}>{transaction.comment}</td>
                    <td
                      className={clsx(css.tableData, {
                        [css.plus]: transaction.type,
                        [css.minus]: !transaction.type,
                      })}>
                      {transaction.amount}
                    </td>
                    <td className={css.tableData}>
                      <div className={css.wrapper}>
                        <button
                          className={css.btnEdit}
                          id={transaction._id}
                          onClick={() => openModalEditTransaction(transaction)}>
                          <svg className={css.icon}>
                            <use xlinkHref={`${sprite}#pen`}></use>
                          </svg>
                        </button>
                        <button
                          className={css.btn}
                          onClick={() => {
                            dispatch(deleteTransaction(transaction._id)).then(
                              () => dispatch(fetchTransactions())
                            );
                          }}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        )}
      </div>
    </>
  );
};

export default TransactionList;
