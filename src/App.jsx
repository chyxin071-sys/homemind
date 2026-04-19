import Hero from './components/Hero';
import PainPoints from './components/PainPoints';
import Features from './components/Features';
import DemoSection from './components/Demo/DemoSection';
import Privacy from './components/Privacy';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ 
      background: '#FAF8F5',
      height: '100vh',
      overflowY: 'scroll',
      scrollSnapType: 'y mandatory',
      scrollBehavior: 'smooth'
    }}>
      <Hero />
      <PainPoints />
      <Features />
      <DemoSection />
      <Privacy />
      <Footer />
    </div>
  );
}

export default App;
