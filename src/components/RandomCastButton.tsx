interface RandomCastButtonProps {
  onGenerate: () => void;
}

export function RandomCastButton({ onGenerate }: RandomCastButtonProps) {
  return (
    <button className="action-button" type="button" onClick={onGenerate}>
      {"\u968f\u673a\u8d77\u5366"}
    </button>
  );
}
