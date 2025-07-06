import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router';

const ArtifactCard = ({ artifact }) => {
    const {_id, artifactName, artifactImage, shortDescription, likeCount } = artifact;

    return (
        <div className="max-w-sm rounded-2xl shadow-lg bg-white overflow-hidden transition hover:shadow-xl duration-300">
            <img
                src={artifactImage}
                alt={artifactName}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{artifactName}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{shortDescription}</p>
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-red-500">
                        <Heart className="w-5 h-5 mr-1" />
                        <span>{likeCount}</span>
                    </div>
                    <Link to={`/artifactdetails/${_id}`}>
                    <button className="bg-blue-600 text-white text-sm cursor-pointer px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                        View Details
                    </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArtifactCard;
