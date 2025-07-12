import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../provider/AuthProvider';
import LoadingSpinner from '../../components/LoadingSpinner'; // adjust path as needed

const MyProfile = () => {
    const { user, updateUser, setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    if (!user) {
        return <LoadingSpinner />;
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const name = form.name.value.trim();
        const photo = form.photo.value.trim();

        // Input validations
        if (!name || !photo) {
            setLoading(false);
            return Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Name and Photo URL cannot be empty.'
            });
        }

        if (name.length < 5) {
            setLoading(false);
            return Swal.fire({
                icon: 'warning',
                title: 'Name Too Short',
                text: 'Name should be at least 5 characters long.'
            });
        }

        try {
            await updateUser({ displayName: name, photoURL: photo });

            setUser({ ...user, displayName: name, photoURL: photo });

            Swal.fire({
                icon: 'success',
                title: 'Profile Updated',
                text: 'Your name and photo have been successfully updated!',
                confirmButtonColor: '#6366f1'
            });
        } catch (error) {
            console.error('Profile update error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: 'There was an issue updating your profile. Try again later.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-20">
            <title>{user.displayName}</title>
            <h2 className="text-3xl font-bold text-center mb-6">My Profile</h2>

            <div className="flex flex-col items-center mb-6">
                <img
                    src={user?.photoURL || 'https://i.ibb.co/FzR8HMC/avatar-placeholder.png'}
                    alt="Profile"
                    className="w-24 h-24 rounded-full shadow mb-2"
                />
                <p className="text-xl font-bold">{user?.displayName}</p>
                <p className="text-lg font-medium">{user?.email}</p>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
                <input
                    type="text"
                    placeholder="Your Name"
                    name="name"
                    defaultValue={user?.displayName}
                    className="input input-bordered w-full"
                    required
                />
                <input
                    type="text"
                    placeholder="Photo URL"
                    name="photo"
                    defaultValue={user?.photoURL}
                    className="input input-bordered w-full"
                    required
                />
                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
};

export default MyProfile;
