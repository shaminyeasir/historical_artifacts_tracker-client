import React from 'react';
import Writings from '../../public/Writings.jpeg';
import Documents from '../../public/Documents.jpeg';
import Tools from '../../public/Tools.jpeg';
import Weapons from '../../public/Weapons.jpg';
import Places from '../../public/Places.jpg';

const categories = [
    { name: 'Writings', img: Writings },
    { name: 'Tools', img: Tools },
    { name: 'Weapons', img: Weapons },
    { name: 'Documents', img: Documents },
    { name: 'Places', img: Places },
];

const ExtraSection1 = () => {
    return (
        <section className="py-16 bg-[#f5f1e7]">
            <h2 className="text-3xl font-bold text-center text-[#4a3a24] mb-12">Explore by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-6xl mx-auto px-4">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-[#e0d6c8]"
                    >
                        <img
                            src={category.img}
                            alt={category.name}
                            className="w-full h-36 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-[#5a3e1b]">{category.name}</h3>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ExtraSection1;
