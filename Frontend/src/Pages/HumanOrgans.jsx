import React from "react";
import { Link } from "react-router-dom";
import organs from "../Components/assets/organs";
import heart from '../Components/assets/heart.png'
import lungs from '../Components/assets/lungs.png'
import liver from '../Components/assets/liver.png'
import kidney from '../Components/assets/kidney.png'
import brain from '../Components/assets/brain.png'
import bones from '../Components/assets/bones.png'

const HumanOrgans = () => {
    return (
        <section className="min-h-screen bg-[#0d1117]  py-14 px-5">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Know About Human Body Organs
                    </h1>

                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Learn about important human body organs and understand their
                        functions in maintaining a healthy life.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {organs.map((organ, index) => (
                        <div
                            key={index}
                            className="bg-[#141a23] border border-white/10 rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="h-20 overflow-hidden">
                                <img
                                    src={organ.image}
                                    alt={organ.name}
                                    className="w-18 h-full pl-4 pt-5 object-cover hover:scale-110 transition duration-500"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2 mb-4">
                                    {organ.name}
                                </h2>

                                <ul className="space-y-3">
                                    {organ.info.map((point, i) => (
                                        <li
                                            key={i}
                                            className="text-gray-300 text-sm flex items-start gap-2"
                                        >
                                            <span className="text-cyan-400 mt-1">➜</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>

                                <Link to={organ.link} className=" bg-cyan-500 hover:bg-cyan-400 text-white font-medium px-5 py-2.5 rounded-xl mt-3 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 text-sm flex items-center gap-2">
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HumanOrgans;