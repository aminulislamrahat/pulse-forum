import BannerSection from "../components/hero/BannerSection";
import { useRef, useState } from "react";
import PostsSection from "../components/homePageComponents/PostsSection";
import TagListSection from "../components/homePageComponents/TagListSection";
import AnnouncementSlider from "../components/homePageComponents/AnnouncementSlider";
import HowItWorks from "../components/homePageComponents/HowItWorks";
import CommunityHighlights from "../components/homePageComponents/CommunityHighlights";

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
      <TagListSection />
      <AnnouncementSlider />
      <div ref={postsSectionRef}>
        <PostsSection searchTag={searchTag} onSearch={handleSearch} />
      </div>

      <HowItWorks />
      <CommunityHighlights />
    </>
  );
};
