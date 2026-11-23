
import { motion } from "framer-motion";

const stars = Array.from({ length: 90 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 13) % 100}%`,
    top: `${(i * 61 + 7) % 100}%`,
    delay: (i % 8) * 0.4,
    size: i % 5 === 0 ? 3 : 2,
}));

export default function StarBackground() {
    return (
        <div className="star-background" aria-hidden="true">
            {stars.map((star) => (
                <motion.span
                    key={star.id}
                    className="star"
                    style={{
                        left: star.left,
                        top: star.top,
                        width: star.size,
                        height: star.size,
                    }}
                    animate={{
                        opacity: [0.2, 1, 0.2],
                        scale: [0.8, 1.4, 0.8],
                    }}
                    transition={{
                        duration: 3 + (star.id % 4),
                        delay: star.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}
