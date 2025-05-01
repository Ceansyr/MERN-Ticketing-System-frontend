import React from "react";
import "../styles/HublyLanding.css";
import "../styles/LandingComponents.css";
import "../styles/DummyPage.css";
import PartnersSection from "../components/landing/PartnersSection";
import FeatureSection from "../components/landing/FeatureSection";
import Footer from "../components/landing/Footer";
import ChatBot from "../components/landing/ChatBot";

import DummyHeader from "../components/dummy/DummyHeader";
import DummyHeroSection from "../components/dummy/DummyHeroSection";
import DummyPricingSection from "../components/dummy/DummyPricingSection";

function DummyPage() {
    return (
        <div className="landing-page hubly-landing">
            <DummyHeader />
            <DummyHeroSection />
            <PartnersSection />
            <FeatureSection />
            <DummyPricingSection />
            <Footer />
            <ChatBot />
        </div>
    );
}

export default DummyPage;