import Hero from '../components/Hero';
import Timeline from '../components/Timeline';
import Results from '../components/Results';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import useScrollReveal from '../hooks/useScrollReveal';

export default function Home() {
  useScrollReveal();

  return (
    <>
      <div className="glass-wrapper container mt-glass">
        <main>
          <Hero />
          <Timeline />
          <Results />
          <CTA />
        </main>
      </div>
      <Footer />
    </>
  );
}
