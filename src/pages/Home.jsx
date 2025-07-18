
import RecentTasksSection from '../components/homePageComponents/RecentTasksSection';
import AboutUsSection from '../components/homePageComponents/AboutUsSection';
import BannerSection from '../components/hero/BannerSection';
import NewsletterSection from '../components/homePageComponents/NewsletterSection';
import GallerySection from '../components/homePageComponents/GallerySection';
import { useRef, useState } from 'react';
import PostsSection from '../components/homePageComponents/PostsSection';

export const Home = () => {
    const postsSectionRef = useRef();
    const [searchTag, setSearchTag] = useState("");


    // Called by Banner/SearchBar when a search happens
    const handleSearch = (tag) => {
        setSearchTag(tag);
        if (postsSectionRef.current) {
            postsSectionRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>

            <BannerSection onSearch={handleSearch} />
            <AboutUsSection />
            <RecentTasksSection />
            <div ref={postsSectionRef}>
                <PostsSection />
            </div>

            <NewsletterSection />


        </>
    )


}
