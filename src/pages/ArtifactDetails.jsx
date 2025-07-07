import React, { useEffect, useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useParams } from 'react-router';
import { auth } from '../firebase.init';

const ArtifactDetails = () => {
    const { id } = useParams();
    const [artifact, setArtifact] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        const fetchArtifactAndCheckLiked = async () => {
            const res = await fetch(`http://localhost:3000/artifacts/${id}`);
            const data = await res.json();
            setArtifact(data);
            setLikeCount(data.likeCount || 0);

            const user = auth.currentUser;
            if (!user) return;

            const userRes = await fetch(`http://localhost:3000/users/${user.email}`);
            const userData = await userRes.json();

            const likedArtifacts = userData.likedArtifacts || [];
            const hasLiked = likedArtifacts.includes(id);
            setLiked(hasLiked);
        };

        fetchArtifactAndCheckLiked();
    }, [id]);


    const handleLikeToggle = async () => {
        const updatedCount = liked ? likeCount - 1 : likeCount + 1;
        setLiked(!liked);
        setLikeCount(updatedCount);

        await fetch(`http://localhost:3000/artifacts/${id}/like`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ likeCount: updatedCount })
        });

        const user = auth.currentUser;
        if (!user) return;

        const payload = {
            email: user.email,
            artifactId: id
        };

        const userLikeUrl = liked
            ? 'http://localhost:3000/users/unlike'
            : 'http://localhost:3000/users/like';

        await fetch(userLikeUrl, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
    };


    if (!artifact) return <div className="text-center mt-10 text-lg">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
            <img
                src={artifact.artifactImage}
                alt={artifact.artifactName}
                className="w-full h-64 object-cover rounded-md mb-6"
            />

            <h1 className="text-3xl font-bold mb-4">{artifact.artifactName}</h1>
            <p className="text-gray-700 mb-2"><strong>Type:</strong> {artifact.artifactType}</p>
            <p className="text-gray-700 mb-2"><strong>Historical Context:</strong> {artifact.historicalContext}</p>
            <p className="text-gray-700 mb-2"><strong>Short Description:</strong> {artifact.shortDescription}</p>
            <p className="text-gray-700 mb-2"><strong>Created At:</strong> {artifact.createdAt}</p>
            <p className="text-gray-700 mb-2"><strong>Discovered At:</strong> {artifact.discoveredAt}</p>
            <p className="text-gray-700 mb-2"><strong>Discovered By:</strong> {artifact.discoveredBy}</p>
            <p className="text-gray-700 mb-2"><strong>Present Location:</strong> {artifact.presentLocation}</p>
            <p className="text-gray-700 mb-2"><strong>Added By:</strong> {artifact.artifactAdderName} ({artifact.artifactAdderEmail})</p>

            <div className="mt-6 flex items-center gap-4">
                <button
                    onClick={handleLikeToggle}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${liked ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                >
                    {liked ? <ThumbsDown size={20} /> : <ThumbsUp size={20} />}
                    {liked ? 'Dislike' : 'Like'}
                </button>
                <span className="text-lg font-semibold">{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
            </div>
        </div>
    );
};

export default ArtifactDetails;
