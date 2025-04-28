import React from "react";
import "../styles/HublyLanding.css";
import "../styles/LandingComponents.css";
import Header from "../components/landing/Header";
import HeroSection from "../components/landing/HeroSection";
import PartnersSection from "../components/landing/PartnersSection";
import FeatureSection from "../components/landing/FeatureSection";
import PricingSection from "../components/landing/PricingSection";
import Footer from "../components/landing/Footer";

function LandingPage() {
    return (
        <div className="landing-page hubly-landing">
            <Header />
            <HeroSection />
            <PartnersSection />
            <FeatureSection />
            <PricingSection />
            <Footer />
        </div>
    );
}

export default LandingPage;
