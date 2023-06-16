import React, { useState, useEffect } from "react";
import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";

const Home = () => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    if (!isFirstLoad) {
      window.location.reload();
    } else {
      setIsFirstLoad(false);
    }
  }, [isVisible]);
  return (
    <div>
      {/* {(() => {
            if (window.localStorage) {
                if (!localStorage.getItem('reload')) {
                    localStorage['reload'] = true;
                    window.location.reload();
                } else {
                    localStorage.removeItem('reload');
                }
            }
        })()} */}
      <Navbar />
      <Header />
      <div className="homeContainer">
        <Featured />
        <h1 className="homeTitle">Browse by any content</h1>
        <PropertyList />
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties />
        <MailList />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
