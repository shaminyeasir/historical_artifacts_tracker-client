import React, { useEffect, useState } from 'react';
import { auth } from '../firebase.init';
import { useNavigate } from 'react-router';
import { onAuthStateChanged } from 'firebase/auth';
import Swal from 'sweetalert2';

const MyArtifacts = () => {
    const [user, setUser] = useState(null);
    const [myArtifacts, setMyArtifacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                setUser(null);
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!user) return;
        fetch("http://localhost:3000/myartifacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'include',
            body: JSON.stringify({ email: user.email })
        })
            .then(res => res.json())
            .then(artifacts => setMyArtifacts(artifacts))
            .catch(error => console.error("Error fetching artifacts:", error));
    }, [user]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#dc2626",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:3000/artifacts/${id}`, { method: 'DELETE', credentials: 'include' })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Artifact has been deleted.",
                                icon: "success",
                                confirmButtonColor: "#2563eb"
                            });
                            setMyArtifacts(myArtifacts.filter(artifact => artifact._id !== id));
                            navigate('/allartifacts');
                        }
                    });
            }
        });
    };

    const handleUpdate = (id) => {
        navigate(`/updateartifact/${id}`);
    };

    return (
        <div className="container p-4 mx-auto mb-[100px] mt-[50px] text-gray-900 bg-white rounded-md shadow-md">
            <h2 className="my-8 text-3xl font-semibold text-center text-blue-700">My Artifacts</h2>
            {
                myArtifacts.length === 0 ? (
                    <p className="col-span-full text-[30px] font-[500] text-center text-gray-500">
                        No Artifact is added by you yet.
                    </p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full border border-gray-300 rounded-md">
                            <thead className="bg-blue-100 text-blue-900">
                                <tr>
                                    <th className="p-3 border-b border-gray-300 text-left">#</th>
                                    <th className="p-3 border-b border-gray-300 text-left">Artifact Name</th>
                                    <th className="p-3 border-b border-gray-300 text-left">Artifact Type</th>
                                    <th className="p-3 border-b border-gray-300 text-left">Created At</th>
                                    <th className="p-3 border-b border-gray-300 text-right">Present Location</th>
                                    <th className="p-3 border-b border-gray-300"></th>
                                    <th className="p-3 border-b border-gray-300"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {myArtifacts.map((artifact, index) => (
                                    <tr
                                        key={artifact._id}
                                        className={index % 2 === 0 ? "bg-blue-50" : "bg-white"}
                                    >
                                        <td className="p-3 border-b border-gray-300">{index + 1}</td>
                                        <td className="p-3 border-b border-gray-300">{artifact.artifactName}</td>
                                        <td className="p-3 border-b border-gray-300">{artifact.artifactType}</td>
                                        <td className="p-3 border-b border-gray-300">{artifact.createdAt}</td>
                                        <td className="p-3 border-b border-gray-300 text-right">{artifact.presentLocation}</td>
                                        <td className="p-3 border-b border-gray-300 text-right">
                                            <button
                                                onClick={() => handleUpdate(artifact._id)}
                                                className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
                                            >
                                                Update
                                            </button>
                                        </td>
                                        <td className="p-3 border-b border-gray-300 text-right">
                                            <button
                                                onClick={() => handleDelete(artifact._id)}
                                                className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>)
            }
        </div>
    );
};

export default MyArtifacts;
