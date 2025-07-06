import React, { useEffect, useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useParams } from 'react-router';

const ArtifactDetails = () => {
    const { id } = useParams();
    const [artifact, setArtifact] = useState(null);
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:3000/artifacts/${id}`)
            .then(res => res.json())
            .then(data => {
                setArtifact(data);
                setLikeCount(data.likeCount || 0);
            });
    }, [id]);

    const toggleLike = () => {
        const updatedLikeCount = liked ? likeCount - 1 : likeCount + 1;
        setLiked(!liked);
        setLikeCount(updatedLikeCount);

        // Update in the database
        fetch(`http://localhost:3000/artifacts/${id}/like`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ likeCount: updatedLikeCount })
        });
    };

    if (!artifact) return <div className="text-center mt-10 text-lg">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            <img src={artifact.image} alt={artifact.name} className="w-full h-64 object-cover rounded-md mb-6" />

            <h1 className="text-3xl font-bold mb-4">{artifact.name}</h1>
            <p className="text-gray-700 mb-2"><strong>Type:</strong> {artifact.type}</p>
            <p className="text-gray-700 mb-2"><strong>Context:</strong> {artifact.context}</p>
            <p className="text-gray-700 mb-2"><strong>Description:</strong> {artifact.description}</p>
            <p className="text-gray-700 mb-2"><strong>Created At:</strong> {artifact.createdAt}</p>
            <p className="text-gray-700 mb-2"><strong>Discovered At:</strong> {artifact.discoveredAt}</p>
            <p className="text-gray-700 mb-2"><strong>Discovered By:</strong> {artifact.discoveredBy}</p>
            <p className="text-gray-700 mb-2"><strong>Present Location:</strong> {artifact.location}</p>
            <p className="text-gray-700 mb-2"><strong>Added By:</strong> {artifact.adderName} ({artifact.adderEmail})</p>

            {/* Like Button */}
            <div className="mt-6 flex items-center gap-4">
                <button
                    onClick={toggleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                        liked ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
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
