declare module 'react-rotating-text' {
  interface ReactRotatingTextProps {
    items: string[];
    color?: string;
    cursor?: boolean;
    pause?: number;
    emptyPause?: number;
    eraseMode?: 'erase' | 'overwrite';
    typingInterval?: number;
    deletingInterval?: number;
    className?: string;
  }

  const ReactRotatingText: React.FC<ReactRotatingTextProps>;
  export default ReactRotatingText;
}
