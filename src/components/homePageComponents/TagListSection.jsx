import { Fade } from "react-awesome-reveal";
import { useQuery } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";

export default function TagListSection() {
    const { getAllTags } = useForumAPI();

    const { data: tags = [], isLoading } = useQuery({
        queryKey: ["all-tags"],
        queryFn: getAllTags,
    });

    return (
        <section className="w-full mx-auto py-10 px-4 md:px-10 lg:px-36">
            <div className="w-full mx-auto bg-base-200 rounded-2xl p-6 lg:p-12">
                <Fade direction="down" triggerOnce>
                    <div className="text-center mb-10">
                        <h2 className="text-4xl font-bold text-primary mb-4">
                            Explore All Tags
                        </h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                            Browse topics that interest you. Search any tag in searchbar to see related posts!
                        </p>
                    </div>
                </Fade>

                {isLoading ? (
                    <div className="text-center text-primary mt-6">Loading tags...</div>
                ) : tags.length === 0 ? (
                    <div className="text-center text-gray-400 mt-6">No tags found.</div>
                ) : (
                    <div className="flex flex-wrap justify-center gap-3">
                        {tags.map(tag => (
                            <button
                                key={tag._id || tag}
                                className="badge badge-lg badge-outline badge-primary text-base px-4 py-2 rounded-full shadow hover:bg-primary hover:text-white transition font-semibold mb-2"
                            // onClick={() => navigate(`/search?tag=${tag.name}`)}
                            // You can handle click as you need!
                            >
                                #{tag.name || tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>


        </section>
    );
}
