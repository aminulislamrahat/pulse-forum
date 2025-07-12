import Hero from '../components/hero/Hero'
import HowItWorks from '../components/homePageComponents/HowItWorks';
import RecentTasksSection from '../components/homePageComponents/RecentTasksSection';
import HeroOverlayCards from '../components/homePageComponents/HeroOverlayCards';
import AboutUsSection from '../components/homePageComponents/AboutUsSection';
import BannerSection from '../components/hero/BannerSection';
import NewsletterSection from '../components/homePageComponents/NewsletterSection';
import GallerySection from '../components/homePageComponents/GallerySection';

export const Home = () => {

    return (
        <>
            {/* <div className="relative">
                <Hero />
                <HeroOverlayCards />
            </div> */}
            <BannerSection />
            <AboutUsSection />
            <RecentTasksSection />
            <GallerySection />
            <NewsletterSection />


        </>
    )


}
