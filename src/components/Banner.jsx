import React from 'react';

const Banner = () => {
    return (
        <div>
            <div className="carousel w-full mt-[50px]">
                {/* Slide 1 */}
                <div id="slide1" className="carousel-item relative w-full">
                    <div className="bg-yellow-100 w-full flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px] px-4 sm:px-8 text-center">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                Welcome to <span className='text-orange-500'>Historical Artifacts Tracker</span>
                            </h1>
                            <p className="text-lg md:text-xl">
                                Discover, collect, and track rare and ancient artifacts from across the world.
                            </p>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>

                {/* Slide 2 */}
                <div id="slide2" className="carousel-item relative w-full">
                    <div className="bg-red-100 w-full flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px] px-4 sm:px-8 text-center">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                Verified Historical Artifacts
                            </h1>
                            <p className="text-lg md:text-xl">
                                Browse detailed records of artifacts curated and verified by history enthusiasts and experts.
                            </p>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>

                {/* Slide 3 */}
                <div id="slide3" className="carousel-item relative w-full">
                    <div className="bg-blue-100 w-full flex items-center justify-center h-[300px] sm:h-[400px] md:h-[500px] px-4 sm:px-8 text-center">
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                                Track & Share History
                            </h1>
                            <p className="text-lg md:text-xl">
                                Add your own discoveries, like artifacts, and build a personal collection of historical treasures.
                            </p>
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;
