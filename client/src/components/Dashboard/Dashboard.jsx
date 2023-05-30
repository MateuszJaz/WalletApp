import Navigation from '../Navigation/Navigation.jsx';
import Currency from '../Currency/Currency.jsx';
import Balance from '../Balance/Balance.jsx';
import MobileTransactionList from '../MobileTransactionList/MobileTransactionList.jsx';

import css from './Dashboard.module.css';

export const Dashboard = () => {
  return (
    <main className={css.dashboardWrapper}>
      <section className={css.navSection}>
        <Navigation />
      </section>
      <section className={css.currencySection}>
        <Currency />
      </section>
      <section className={css.balanceSection}>
        <Balance />
      </section>
      <section className={css.transactionListSection}>
        <MobileTransactionList />
      </section>
    </main>
  );
};

export default Dashboard;
