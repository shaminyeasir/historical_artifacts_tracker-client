import React from 'react';
import Swal from 'sweetalert2';
import { auth } from '../firebase.init';

const AddArtifacts = () => {
    const adderEmail = auth.currentUser?.email;
    const adderName = auth.currentUser?.displayName;

    const handleAddArtifact = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newArtifact = Object.fromEntries(formData.entries());
        const likeCount = 0;

        const fullArtifactData = {
            ...newArtifact,
            likeCount
        };

        fetch('http://localhost:3000/addartifacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(fullArtifactData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: "Artifact added successfully!",
                        icon: "success"
                    });
                    form.reset();
                }
            });
    };

    return (
        <div className="w-full my-[100px] mx-auto max-w-5xl p-4 rounded-md shadow sm:p-8 bg-white text-gray-800">
            <h2 className="mb-10 text-3xl font-semibold text-center">Add New Artifact</h2>

            <form onSubmit={handleAddArtifact} noValidate className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm">Artifact Name</label>
                            <input type="text" name="artifactName" className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Artifact Image URL</label>
                            <input type="text" name="artifactImage" className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Artifact Type</label>
                            <select name="artifactType" className="w-full px-3 py-2 border rounded-md" required>
                                <option value="">Select Type</option>
                                <option value="Tools">Tools</option>
                                <option value="Weapons">Weapons</option>
                                <option value="Documents">Documents</option>
                                <option value="Writings">Writings</option>
                                <option value="Place">Place</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm">Historical Context</label>
                            <input type="text" name="historicalContext" className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Short Description</label>
                            <input type="text" name="shortDescription" className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Created At</label>
                            <input type="text" name="createdAt" className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                    </div>

                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm">Discovered At</label>
                            <input type="text" name="discoveredAt" className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Discovered By</label>
                            <input type="text" name="discoveredBy" className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Present Location</label>
                            <input type="text" name="presentLocation" className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Adder Name</label>
                            <input type="text" name="artifactAdderName" value={adderName || ''} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Adder Email</label>
                            <input type="email" name="artifactAdderEmail" value={adderEmail || ''} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer px-8 py-3 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    Add Artifact
                </button>
            </form>
        </div>
    );
};

export default AddArtifacts;
