import React, { useState } from 'react';

// Import images from src/assets/images
import treePlantation from '../../assets/images/tree-plantation.jpg';
import cleanupDrive from '../../assets/images/cleanup-drive.jpg';
import donationCamp from '../../assets/images/donation-camp.jpg';
import volunteerGroup from '../../assets/images/volunteer-group.jpg';
import educationWorkshop from '../../assets/images/community-education.jpg';
import medicalCamp from '../../assets/images/medical-camp.jpg';

const GallerySection = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const galleryImages = [
        { id: 1, src: treePlantation, alt: 'Tree Plantation Event' },
        { id: 2, src: cleanupDrive, alt: 'Road Cleanup Event' },
        { id: 3, src: donationCamp, alt: 'Donation Drive Event' },
        { id: 4, src: volunteerGroup, alt: 'Volunteer Group Photo' },
        { id: 5, src: educationWorkshop, alt: 'Community Education Workshop' },
        { id: 6, src: medicalCamp, alt: 'Free Medical Camp' }
    ];

    return (
        <section className="px-4 md:px-12 lg:px-24 py-16 bg-base-200">
            <h2 className="text-4xl font-bold text-center text-primary mb-10">Event Gallery</h2>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {galleryImages.map(img => (
                    <div
                        key={img.id}
                        className="overflow-hidden rounded-lg shadow-md cursor-pointer"
                        onClick={() => setSelectedImage(img)}
                    >
                        <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>

            {/* Modal */}
            {selectedImage && (
                <dialog open className="modal modal-open z-50">
                    <form method="dialog" className="modal-box max-w-3xl p-0 bg-base-100">
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.alt}
                            className="w-full h-auto object-cover rounded-t"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-bold">{selectedImage.alt}</h3>
                        </div>
                    </form>
                    <div className="modal-backdrop bg-black bg-opacity-60" onClick={() => setSelectedImage(null)} />
                </dialog>
            )}
        </section>
    );
};

export default GallerySection;
