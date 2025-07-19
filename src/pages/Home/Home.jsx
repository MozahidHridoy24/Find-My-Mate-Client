import React from "react";
import Banner from "../../components/Banner";
import PremiumMemberBiodata from "./PremiumMemberBiodata";
import HowItWorks from "./HowItWorks";
import SuccessCounterSection from "./SuccessCounterSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PremiumMemberBiodata></PremiumMemberBiodata>
      <HowItWorks></HowItWorks>
      <SuccessCounterSection></SuccessCounterSection>
    </div>
  );
};

export default Home;
