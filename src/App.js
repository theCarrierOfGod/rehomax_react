/**
    * @description      : 
    * @author           : Olaolumide
    * @group            : 
    * @created          : 18/02/2023 - 15:25:51
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 18/02/2023
    * - Author          : Olaolumide
    * - Modification    : 
**/
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/Auth';
import Login from './auth/Login';
import { RequireAuth } from './auth/RequireAuth';
import Top from './top/Top';
import Register from './auth/Register';
import Create from './pages/Assets/Create';
import Account from './auth/Account';
import { CreateProvider } from './auth/parts/Created';
import Nav from './components/nav/Nav';
import Footer from './components/nav/footer/Footer';
import Wallet from './pages/Wallet/Wallet';
import Fund from './pages/Wallet/Fund';
import Personal from './auth/Personal';
import Preloader from './Preloader';
import Withdraw from './pages/Wallet/Withdraw';
import Edit from './pages/Assets/Edit';

const LazyIndex = React.lazy(() => import('./pages/index/Index'));
const LazyCollection = React.lazy(() => import('./pages/Collection/Collection'));
const LazyExplore = React.lazy(() => import('./pages/Collection/Explore'));
const LazyAssets = React.lazy(() => import('./pages/Assets/Assets'));
const LazyArt = React.lazy(() => import('./pages/categories/Art'));
const LazyMusic = React.lazy(() => import('./pages/categories/Music'));
const LazyCollectibles = React.lazy(() => import('./pages/categories/Collectibles'));
const LazyPhotography = React.lazy(() => import('./pages/categories/Photography'));
const LazySports = React.lazy(() => import('./pages/categories/Sports'));
const LazyTradingCards = React.lazy(() => import('./pages/categories/TradingCards'));
const LazyUtility = React.lazy(() => import('./pages/categories/Utility'));
const LazyVirtualWorlds = React.lazy(() => import('./pages/categories/VirtualWorlds'));
const LazyRankings = React.lazy(() => import('./pages/stats/Rankings'));
const LazyActivity = React.lazy(() => import('./pages/stats/Rankings'));


function App() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <>
      <AuthProvider>
        <CreateProvider>
          <Top />
          <Nav />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <React.Suspense fallback={<Preloader />}>
                    <LazyIndex />
                  </React.Suspense>
                  <Footer />
                </>
              }
            />
            <Route
              path="/explore-collections"
              element={
                <>
                  <React.Suspense fallback={<Preloader />}>
                    <LazyExplore />
                  </React.Suspense>
                  <Footer />
                </>
              }
            />
            <Route
              exact
              path="/assets"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <LazyAssets />
                  <Footer />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/collection/:id"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <LazyCollection />
                  <Footer />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/category/art"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <LazyArt />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/category/collectibles"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <LazyCollectibles />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/category/music"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <LazyMusic />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/category/photography"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <LazyPhotography />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/category/sports"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <LazySports />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/category/tradingCards"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <LazyTradingCards />
                </React.Suspense>
              }
            />
            <Route 
              exact
              path="/category/utility"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <LazyUtility />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/category/virtualWorlds"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <LazyVirtualWorlds />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/rankings"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <LazyRankings />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/activity"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <LazyActivity />
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/account/:username"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <Personal />
                </React.Suspense>
              }
            />
            <Route exact path="login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            {/* Authenticated URLs */}
            <Route
              exact
              path="/asset/create"
              element={
                <React.Suspense fallback={<Preloader />}>
                  <RequireAuth>
                    <Create />
                  </RequireAuth>
                </React.Suspense>
              }
            />
            <Route
              exact
              path="/asset/edit/:id"
              element={
                <RequireAuth>
                  <Edit />
                </RequireAuth>
              }
            />
            <Route
              exact
              path="/account"
              element={
                <>
                  <React.Suspense fallback={<Preloader />}>
                    <RequireAuth>
                      <Account />
                    </RequireAuth>
                  </React.Suspense>
                </>
              }
            />
            <Route
              exact
              path="/wallet"
              element={
                <>
                  <React.Suspense fallback={<Preloader />}>
                    <RequireAuth>
                      <Wallet />
                    </RequireAuth>
                  </React.Suspense>
                  <Footer />
                </>
              }
            />
            <Route
              exact
              path="/fund_wallet"
              element={
                <>
                  <React.Suspense fallback={<Preloader />}>
                    <RequireAuth>
                      <Fund />
                    </RequireAuth>
                  </React.Suspense>
                  <Footer />
                </>
              }
            />
            <Route
              exact
              path="/withdraw"
              element={
                <>
                  <React.Suspense fallback={<Preloader />}>
                    <RequireAuth>
                      <Withdraw />
                    </RequireAuth>
                  </React.Suspense>
                  <Footer />
                </>
              }
            />
          </Routes>
        </CreateProvider>
      </AuthProvider>
    </>
  );
}

export default App;


// `${auth.api}notable_asset?api_token=aedimvoenbevcunoijinanoernoimijoinenvuinncozIjecvniuzndk`