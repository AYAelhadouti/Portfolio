import React, { useState, useCallback } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import PageDecouverte from './pages/PageDecouverte';
import PageTherapeutes from './pages/PageTherapeutes';
import PageServices from './pages/PageServices';
import PageReservation from './pages/PageReservation';
import PageConfirmation from './pages/PageConfirmation';

export default function App() {
  const [page, setPage] = useState('p1');
  const [reservation, setReservation] = useState({ soin: '', dr: '', date: '', heure: '15:30' });

  const go = useCallback((id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const reserver = useCallback((soin, dr) => {
    setReservation(prev => ({
      ...prev,
      soin: soin || prev.soin,
      dr: dr || prev.dr,
    }));
    go('p3');
  }, [go]);

  const confirmer = useCallback((formData) => {
    setReservation(formData);
    go('p4');
  }, [go]);

  return (
    <>
      <Nav page={page} go={go} reserver={reserver} />

      {page === 'p1' && <PageDecouverte go={go} reserver={reserver} />}
      {page === 'p5' && <PageTherapeutes go={go} reserver={reserver} />}
      {page === 'p2' && <PageServices go={go} reserver={reserver} />}
      {page === 'p3' && <PageReservation go={go} reservation={reservation} setReservation={setReservation} confirmer={confirmer} />}
      {page === 'p4' && <PageConfirmation go={go} reservation={reservation} />}

      <Footer go={go} />
    </>
  );
}