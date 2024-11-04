import { useState } from "react";
import styles from "./DropArea.module.scss";

interface DropAreaProps {
  onDrop: () => void;
}

export default function DropArea({ onDrop }: DropAreaProps) {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <section
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDrop={() => {
        onDrop();
        setShowDrop(false);
      }}
      onDragOver={(e) => e.preventDefault()}
      className={showDrop ? styles.show : styles.hide}
    >
      Drop Here
    </section>
  );
}
