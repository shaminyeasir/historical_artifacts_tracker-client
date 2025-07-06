import React from 'react';
import ArtifactCard from './ArtifactCard';
import { Link } from 'react-router';

const FeaturedArtifacts = ({ artifacts }) => {
    return (
        <div className="bg-gray-100">
            <h1 className='text-[28px] font-[800] text-center mt-[50px] py-[50px]'>Featured Artifacts</h1>

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

            <div className="text-center mt-8 pb-12">
                <Link to={'/allartifacts'}>
                    <button className="px-6 py-3 cursor-pointer bg-blue-600 text-white text-md font-semibold rounded-lg hover:bg-blue-700 transition">
                        See All
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default FeaturedArtifacts;
