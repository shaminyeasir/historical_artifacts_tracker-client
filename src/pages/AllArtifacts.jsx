import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import ArtifactCard from '../components/ArtifactCard';

const AllArtifacts = () => {
    const artifacts = useLoaderData();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="bg-gray-100 pb-[100px]">
            <h1 className='text-[28px] font-[800] text-center mt-[50px] py-[50px]'>All Artifacts</h1>

            <div className="flex justify-center mb-8">
                <input
                    type="text"
                    placeholder="Search by Artifact Name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 md:px-16 lg:px-[160px]'>
                {
                    artifacts
                        .filter(artifact =>
                            artifact.artifactName.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                        .map(artifact => (
                            <ArtifactCard
                                key={artifact._id}
                                artifact={artifact}
                            />
                        ))
                }
            </div>
        </div>
    );
};

export default AllArtifacts;
