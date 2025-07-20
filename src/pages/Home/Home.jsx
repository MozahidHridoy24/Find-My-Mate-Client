import React from "react";
import Banner from "../../components/Banner";
import PremiumMemberBiodata from "./PremiumMemberBiodata";
import HowItWorks from "./HowItWorks";
import SuccessCounterSection from "./SuccessCounterSection";
import SuccessStorySection from "./SuccessStorySection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <PremiumMemberBiodata></PremiumMemberBiodata>
      <HowItWorks></HowItWorks>
      <SuccessCounterSection></SuccessCounterSection>
      <SuccessStorySection></SuccessStorySection>
    </div>
  );
};

export default Home;
