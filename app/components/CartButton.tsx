import { FC, useState, useCallback, useRef } from 'react';
import styles from './CartButton.module.css';

interface CartButtonProps {
  quantity: number;
  onAdd: () => void;
  onIncrease: () => void;
  onDecrease: () => void;
}

interface ConfettiProps {
  x: number;
  y: number;
}

const Confetti: FC<ConfettiProps> = ({ x, y }) => {
  return (
    <div 
      className={styles.confetti}
      style={{
        left: x,
        top: y,
      }}
    >
      {[...Array(24)].map((_, i) => {
        const angle = (i * 15) * (Math.PI / 180); // 24 particles spread evenly in 360 degrees
        const velocity = 40 + Math.random() * 40;
        const rotationSpeed = 180 + Math.random() * 360;
        return (
          <span
            key={i}
            style={{
              '--x': `${Math.cos(angle) * velocity}px`,
              '--y': `${Math.sin(angle) * velocity}px`,
              '--r': `${rotationSpeed}deg`,
              animationDelay: `${Math.random() * 0.1}s`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
};

const CartButton: FC<CartButtonProps> = ({
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}) => {
  const [confetti, setConfetti] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleAdd = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = rect.left + (rect.width / 2);
      const y = rect.top + (rect.height / 2);
      setConfetti({ x, y });
      onAdd();
      setTimeout(() => setConfetti(null), 1000);
    }
  }, [onAdd]);

  if (quantity === 0) {
    return (
      <>
        <button
          ref={buttonRef}
          onClick={handleAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors"
        >
          Add to Cart
        </button>
        {confetti && <Confetti x={confetti.x} y={confetti.y} />}
      </>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrease}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold w-8 h-8 rounded flex items-center justify-center transition-colors"
      >
        -
      </button>
      <span className="w-8 text-center font-semibold">{quantity}</span>
      <button
        onClick={onIncrease}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold w-8 h-8 rounded flex items-center justify-center transition-colors"
      >
        +
      </button>
    </div>
  );
};

export default CartButton; 