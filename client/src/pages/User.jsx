import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AccountCard from '../components/AccountCard';

function User() {
    return (
        <>
            <Navbar user="Tony" />
            <main className="main bg-dark">
                <div className="header">
                    <h1>Welcome back<br />Tony Jarvis!</h1>
                    <button className="edit-button">Edit Name</button>
                </div>
                <section className="account-list">
                    <AccountCard title="Argent Bank Checking (x8349)" amount="$2,082.79" desc="Available Balance" />
                    <AccountCard title="Argent Bank Savings (x6712)" amount="$10,928.42" desc="Available Balance" />
                    <AccountCard title="Argent Bank Credit Card (x8349)" amount="$184.30" desc="Current Balance" />
                </section>
            </main>
            <Footer />
        </>
    );
}

export default User;
