interface RandomCastButtonProps {
  onGenerate: () => void;
}

export function RandomCastButton({ onGenerate }: RandomCastButtonProps) {
  return (
    <button className="action-button" type="button" onClick={onGenerate}>
      随机起卦
    </button>
  );
}
