import heart from './heart.png'
import lungs from './lungs.png'
import liver from './liver.png'
import kidney from './kidney.png'
import brain from './brain.png'
import bones from './bones.png'


let organs = [
    {
        name: "Heart",
        emoji: "❤️",
        image: heart,
        link: 'https://en.wikipedia.org/wiki/Heart',
        info: [
            "Pumps blood throughout the body",
            "Supplies oxygen and nutrients",
            "Beats around 100,000 times daily",
            "Works with arteries and veins",
        ],
    },
    {
        name: "Lungs",
        emoji: "🫁",
        image: lungs, link: "https://en.wikipedia.org/wiki/Lung",
        info: [
            "Help in breathing process",
            "Exchange oxygen and carbon dioxide",
            "Located inside chest cavity",
            "Essential for respiration",
        ],
    },
    {
        name: "Liver",
        emoji: "🧬",
        image: liver, link: "https://en.wikipedia.org/wiki/Liver",
        info: [
            "Detoxifies harmful substances",
            "Produces bile for digestion",
            "Stores vitamins and minerals",
            "Supports metabolism",
        ],
    },
    {
        name: "Kidney",
        emoji: "🫘",
        image: kidney,
        link: "https://en.wikipedia.org/wiki/Kidney",
        info: [
            "Filters waste from blood",
            "Maintains water balance",
            "Controls blood pressure",
            "Produces urine",
        ],
    },
    {
        name: "Brain",
        emoji: "🧠",
        image: brain,
        link: "https://en.wikipedia.org/wiki/Brain",
        info: [
            "Controls body functions",
            "Processes thoughts and memory",
            "Manages emotions and movement",
            "Central organ of nervous system",
        ],
    },
    {
        name: "Bones",
        emoji: "🦴",
        image: bones,
        link: "https://en.wikipedia.org/wiki/Bones",
        info: [
            "Provide body structure",
            "Protect internal organs",
            "Store minerals like calcium",
            "Help in movement",
        ],
    },
];

export default organs