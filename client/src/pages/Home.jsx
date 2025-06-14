import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Feature from '../components/Feature';
import iconChat from '../assets/icon-chat.png';
import iconMoney from '../assets/icon-money.png';
import iconSecurity from '../assets/icon-security.png';

function Home() {
    return (
        <>
            <Navbar />
            <main>
                <div className="hero">
                    <section className="hero-content">
                        <h2 className="sr-only">Promoted Content</h2>
                        <p className="subtitle">No fees.</p>
                        <p className="subtitle">No minimum deposit.</p>
                        <p className="subtitle">High interest rates.</p>
                        <p className="text">Open a savings account with Argent Bank today!</p>
                    </section>
                </div>
                <section className="features">
                    <h2 className="sr-only">Features</h2>
                    <Feature icon={iconChat} title="You are our #1 priority">
                        Need to talk to a representative? Our 24/7 chat or call support is here for you.
                    </Feature>
                    <Feature icon={iconMoney} title="More savings means higher rates">
                        The more you save, the better your interest rate.
                    </Feature>
                    <Feature icon={iconSecurity} title="Security you can trust">
                        We use top-notch encryption to keep your data safe.
                    </Feature>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Home;
