import heart from './heart.png'
import lungs from './lungs.png'
import liver from './liver.png'
import kidney from './kidney.png'
import brain from './brain.png'
import bones from './bones.png'

const organHealth = [
    {
        status: "Healthy",
        name: "Heart",
        image: heart,
        note: "Normal sinus rhythm, no anomalies",
        lastCheck: " 2024-11-10",
    },
    {
        status: "Healthy",
        name: "Lungs",
        image: lungs,
        note: "Clear, no congestion detected",
        lastCheck: "2024-10-22",
    },
    {
        status: "Healthy",
        name: "Liver",
        image: liver,
        note: "Enzyme levels within normal range",
        lastCheck: "2024-09-15",
    },
    {
        status: "Healthy",
        name: "Kidney",
        image: kidney,
        note: "Creatinine normal, GFR 95",
        lastCheck: "2025-02-15",
    },
    {
        status: "Healthy",
        name: "Brain",
        image: brain,
        note: "No abnormalities on MRI",
        lastCheck: "2024-02-25",
    },
    {
        status: "Need Attention",
        name: "Bones",
        image: bones,
        note: "Mild vitamin D deficiency noted",
        lastCheck: "2025-08-02",
    },
]

export default organHealth