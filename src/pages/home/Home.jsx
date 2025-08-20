"use client"

import React, { memo } from "react"
import LandingPage from "../LandingPage"

// Home page now uses LandingPage with all sections from landing folder
const Home = memo(() => {
  return <LandingPage />;
});

Home.displayName = 'Home';

export default Home;
