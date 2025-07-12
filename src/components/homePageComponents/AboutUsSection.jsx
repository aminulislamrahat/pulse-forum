import { Fade } from "react-awesome-reveal";

export default function AboutUsSection() {
    return (
        <section className="bg-base-100 py-16 px-4 lg:px-24 my-20">
            <div className="max-w-5xl mx-auto text-center">
                <Fade direction="up">
                    <h2 className="text-5xl font-bold text-primary mb-6">About CommUnity Act</h2>
                    <p className="text-2xl leading-relaxed">
                        Welcome to <span className="text-primary font-semibold">CommUnity Act</span> — a community-powered platform for organizing, joining, and managing local social development events. Whether it’s cleaning up a park, planting trees, donating supplies, or volunteering your time, our platform helps you make a positive local impact with ease.
                    </p>
                </Fade>

                <Fade direction="up" delay={300}>
                    <p className="mt-6 text-2xl">
                        Our mission is to bring people together for causes that matter. By making it simple to create and join events, we empower individuals and groups to take real action in their communities — building a more united, greener, and socially responsible future.
                    </p>
                </Fade>
            </div>
        </section>
    );
}
