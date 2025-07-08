import React, { useEffect, useState } from 'react';
import { auth } from '../firebase.init';
import ArtifactCard from '../components/ArtifactCard';

const LikedArtifacts = () => {
    const [likedArtifacts, setLikedArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLikedArtifacts = async () => {
            const user = auth.currentUser;
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const userRes = await fetch(`http://localhost:3000/users/${user.email}`, {
                    credentials: 'include'
                });

                if (!userRes.ok) {
                    if (userRes.status === 401 || userRes.status === 403) {
                        throw new Error('Unauthorized. Please log in.');
                    }
                    throw new Error('Failed to fetch user data.');
                }

                const userData = await userRes.json();
                const artifactIds = userData.likedArtifacts;

                if (!artifactIds || artifactIds.length === 0) {
                    setLikedArtifacts([]);
                    return;
                }

                const artifactsRes = await fetch(`http://localhost:3000/artifacts/by-ids`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ ids: artifactIds })
                });

                if (!artifactsRes.ok) {
                    throw new Error('Failed to fetch artifact details');
                }

                const artifactsData = await artifactsRes.json();
                setLikedArtifacts(artifactsData);

            } catch (error) {
                console.error("Error:", error.message);
                setLikedArtifacts(null); 
            } finally {
                setLoading(false);
            }
        };

        fetchLikedArtifacts();
    }, []);


    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="bg-gray-100 pb-[100px]">
            <h1 className='text-[28px] font-[800] text-center mt-[50px] py-[50px]'>Liked Artifacts</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 md:px-16 lg:px-[160px]'>
                {
                    likedArtifacts.length === 0 ? (
                        <p className="col-span-full text-[30px] font-[500] text-center text-gray-500">
                            No Artifact is liked by you yet.
                        </p>
                    ) : (
                        likedArtifacts.map(artifact => (
                            <ArtifactCard
                                key={artifact._id}
                                artifact={artifact}
                            />
                        ))
                    )
                }
            </div>

        </div>
    );
};

export default LikedArtifacts;
