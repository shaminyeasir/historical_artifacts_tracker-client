import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Banner from '../components/Banner';
import FeaturedArtifacts from '../components/FeaturedArtifacts';

const HomePage = () => {
    const initialArtifacts = useLoaderData();
    const [artifacts, setArtifacts] = useState(initialArtifacts);
    return (
        <div>
            <Banner></Banner>
            <FeaturedArtifacts artifacts={artifacts} setArtifacts={setArtifacts}></FeaturedArtifacts>
        </div>
    );
};

export default HomePage;