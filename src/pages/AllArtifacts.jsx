import React from 'react';
import { Link, useLoaderData } from 'react-router';
import ArtifactCard from '../components/ArtifactCard';

const AllArtifacts = () => {
    const artifacts = useLoaderData();
    return (
        <div className="bg-gray-100 pb-[100px]">
            <h1 className='text-[28px] font-[800] text-center mt-[50px] py-[50px]'>All Artifacts</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-8 md:px-16 lg:px-[160px]'>
                {
                    artifacts.map(artifact => (
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
