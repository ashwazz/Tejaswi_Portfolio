interface VantaEffect {
  destroy: () => void;
}

interface VantaCellsConfig {
  el: string | HTMLElement;
  mouseControls?: boolean;
  touchControls?: boolean;
  gyroControls?: boolean;
  minHeight?: number;
  minWidth?: number;
  scale?: number;
  color1?: number;
  color2?: number;
  size?: number;
}

interface VantaCells {
  CELLS: (config: VantaCellsConfig) => VantaEffect;
}

declare global {
  interface Window {
    VANTA: VantaCells;
  }
} 