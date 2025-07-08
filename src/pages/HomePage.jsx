import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import Banner from '../components/Banner';
import FeaturedArtifacts from '../components/FeaturedArtifacts';
import ExtraSection1 from '../components/ExtraSection1';
import ExtraSection2 from '../components/ExtraSection2';

const HomePage = () => {
    const initialArtifacts = useLoaderData();
    const [artifacts, setArtifacts] = useState(initialArtifacts);
    return (
        <div>
            <Banner></Banner>
            <FeaturedArtifacts artifacts={artifacts} setArtifacts={setArtifacts}></FeaturedArtifacts>
            <ExtraSection1></ExtraSection1>
            <ExtraSection2></ExtraSection2>
        </div>
    );
};

export default HomePage;