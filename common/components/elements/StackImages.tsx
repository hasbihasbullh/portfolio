"use client";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { useState } from "react";
import Image from "next/image";

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  width: number;
  height: number;
}

function CardRotate({ children, onSendToBack, sensitivity, width, height }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_: never, info: { offset: { x: number; y: number } }) {
    if (Math.abs(info.offset.x) > sensitivity || Math.abs(info.offset.y) > sensitivity) {
      onSendToBack();
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
      animate(y, 0, { type: "spring", stiffness: 300, damping: 25 });
    } else {
      animate(x, 0, { type: "spring", stiffness: 300, damping: 25 });
      animate(y, 0, { type: "spring", stiffness: 300, damping: 25 });
    }
  }

  return (
    <motion.div
      className="absolute top-0 left-0 cursor-grab"
      style={{ x, y, rotateX, rotateY, width, height }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: "grabbing" }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackCard {
  id: number;
  img: string;
  keyOffset?: number;
}

interface StackProps {
  randomRotation?: boolean;
  sensitivity?: number;
  cardDimensions?: { width: number; height: number };
  sendToBackOnClick?: boolean;
  cardsData?: { id: number; img: string }[];
  animationConfig?: { stiffness: number; damping: number };
}

export default function StackImages({ randomRotation = false, sensitivity = 200, cardDimensions = { width: 208, height: 208 }, cardsData = [], animationConfig = { stiffness: 260, damping: 20 }, sendToBackOnClick = false }: StackProps) {
  const [cards, setCards] = useState<StackCard[]>(
    (cardsData.length
      ? cardsData
      : [
          {
            id: 1,
            img: "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
          },
          {
            id: 2,
            img: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
          },
          {
            id: 3,
            img: "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
          },
          {
            id: 4,
            img: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
          },
        ]
    ).map((card) => ({ ...card, keyOffset: 0 }))
  );
  const [isReordering, setIsReordering] = useState(false);

  const sendToBack = (id: number) => {
    setIsReordering(true);
    setCards((prev) => {
      const newCards = [...prev];
      const index = newCards.findIndex((card) => card.id === id);
      const [card] = newCards.splice(index, 1);
      const updatedCard = {
        ...card,
        keyOffset: (card.keyOffset || 0) + 1,
      };
      newCards.unshift(updatedCard);
      return newCards;
    });
    setTimeout(() => setIsReordering(false), 150);
  };

  return (
    <div
      className="relative"
      style={{
        width: cardDimensions.width,
        height: cardDimensions.height,
        perspective: 600,
      }}
    >
      {cards.map((card, index) => {
        const randomRotate = randomRotation ? (card.id * 13) % 10 - 5 : 0;

        return (
          <CardRotate
            key={`${card.id}-${card.keyOffset || 0}`}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            width={cardDimensions.width}
            height={cardDimensions.height}
          >
            <motion.div
              className="rounded-2xl overflow-hidden border-4 border-white h-full w-full"
              onClick={() => sendToBackOnClick && sendToBack(card.id)}
              animate={{
                rotateZ: (cards.length - index - 1) * 4 + randomRotate,
                scale: 1 + (index - (cards.length - 1)) * 0.06,
                transformOrigin: "90% 90%",
              }}
              initial={false}
              transition={
                isReordering
                  ? { duration: 0.15, ease: "easeOut" }
                  : {
                      type: "spring",
                      stiffness: animationConfig.stiffness,
                      damping: animationConfig.damping,
                    }
              }
            >
              <Image src={card.img} alt={`card-${card.id}`} fill className="pointer-events-none h-full w-full object-cover" />
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
