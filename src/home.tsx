import React from 'react';
import TimelineSection from './TimelineSection';
import { fetchDinosaurs, Creature } from './services/DinoApi';

function Home() {
  const [showPortal, setShowPortal] = React.useState(true);
  const [creatures, setCreatures] = React.useState<Creature[]>([]);

  React.useEffect(() => {
    const getData = async () => {
      const data = await fetchDinosaurs();
      setCreatures(data);
    };
    getData();
  }, []);

  return (
    <TimelineSection
      creatures={creatures}
      showPortal={showPortal}
      onClosePortal={() => setShowPortal(false)}
    />
  );
}

export default Home;
