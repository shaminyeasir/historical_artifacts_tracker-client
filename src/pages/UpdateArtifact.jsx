import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router';

const UpdateArtifact = () => {

    const { id } = useParams();
    // const navigate = useNavigate();
    const [artifact, setArtifact] = useState(null);

    useEffect(() => {
        const fetchArtifact = async () => {
            try {
                const res = await fetch(`http://localhost:3000/artifacts/${id}`);
                const data = await res.json();
                setArtifact(data);
            } catch (error) {
                console.error('Error fetching artifact:', error);
            }
        };

        fetchArtifact();
    }, [id]);


    const handleUpdateArtifact = async (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const newArtifact = Object.fromEntries(formData.entries());

        const res = await fetch(`http://localhost:3000/artifacts/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newArtifact)
        });
        const result = await res.json();

        if (result.modifiedCount > 0) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Artifact updated successfully.",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
    if (!artifact) {
        return <p className="text-center mt-20">Loading...</p>;
    }


    return (
        <div className="w-full my-[100px] mx-auto max-w-5xl p-4 rounded-md shadow sm:p-8 bg-white text-gray-800">
            <h2 className="mb-10 text-3xl font-semibold text-center">Update Artifact</h2>

            <form onSubmit={handleUpdateArtifact} noValidate className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm">Artifact Name</label>
                            <input type="text" name="artifactName" defaultValue={artifact.artifactName} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Artifact Image URL</label>
                            <input type="text" name="artifactImage" defaultValue={artifact.artifactImage} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Artifact Type</label>
                            <select name="artifactType" defaultValue={artifact.artifactType} className="w-full px-3 py-2 border rounded-md" required>
                                <option value="">Select Type</option>
                                <option value="Tools">Tools</option>
                                <option value="Weapons">Weapons</option>
                                <option value="Documents">Documents</option>
                                <option value="Writings">Writings</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm">Historical Context</label>
                            <input type="text" name="historicalContext" defaultValue={artifact.historicalContext} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Short Description</label>
                            <input type="text" name="shortDescription" defaultValue={artifact.shortDescription} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Created At</label>
                            <input type="text" name="createdAt" defaultValue={artifact.createdAt} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                    </div>


                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm">Discovered At</label>
                            <input type="text" name="discoveredAt" defaultValue={artifact.discoveredAt} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Discovered By</label>
                            <input type="text" name="discoveredBy" defaultValue={artifact.discoveredBy} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Present Location</label>
                            <input type="text" name="presentLocation" defaultValue={artifact.presentLocation} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Adder Name</label>
                            <input type="text" name="artifactAdderName" value={artifact.artifactAdderName || ''} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                        <div>
                            <label className="block text-sm">Adder Email</label>
                            <input type="email" name="artifactAdderEmail" value={artifact.artifactAdderEmail || ''} className="w-full px-3 py-2 border rounded-md" required />
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full cursor-pointer px-8 py-3 font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
                >
                    Update Artifact
                </button>
            </form>
        </div>
    );
};

export default UpdateArtifact;
