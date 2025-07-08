import React from 'react';

const facts = [
    "📜 The Rosetta Stone helped scholars finally decipher Egyptian hieroglyphs.",
    "🏺 Ancient Greek pottery was not just art—it was used for cooking, storage, and ceremonies.",
    "🗡️ Some Bronze Age swords were made purely for ceremonial purposes, not battle.",
    "🧭 Archaeologists often use ground-penetrating radar to find hidden ruins underground.",
    "🗿 The Moai statues of Easter Island were carved from volcanic rock and can weigh up to 82 tons.",
    "📚 The Library of Alexandria was one of the largest and most significant libraries of the ancient world."
];

const ExtraSection2 = () => {
    return (
        <section className="bg-[#f0ddc0] my-[100px] py-16 px-6 sm:px-12 md:px-24">
            <h1 className="text-4xl font-bold text-center text-[#5a3e1b] mb-12">
                Did You Know?
            </h1>
            <ul className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 text-lg text-[#4a3a24] italic list-disc list-inside">
                {facts.map((fact, index) => (
                    <li
                        key={index}
                        className="bg-white p-6 rounded-lg shadow-md border border-[#e0d6c8]"
                    >
                        {fact}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ExtraSection2;
