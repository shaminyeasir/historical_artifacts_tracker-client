import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Banner from '../components/Banner';
import FeaturedArtifacts from '../components/FeaturedArtifacts';
import ExtraSection1 from '../components/ExtraSection1';

const HomePage = () => {
    const initialArtifacts = useLoaderData();
    const [artifacts, setArtifacts] = useState(initialArtifacts);
    return (
        <div>
            <Banner></Banner>
            <FeaturedArtifacts artifacts={artifacts} setArtifacts={setArtifacts}></FeaturedArtifacts>
            <ExtraSection1></ExtraSection1>
        </div>
    );
};

export default HomePage;