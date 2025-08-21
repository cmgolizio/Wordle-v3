import GameProvider from "@/context/GameContext";
import GameBoard from "@/components/GameBoard";

export default function Home() {
  return (
    <main className='flex min-h-screen h-screen flex-col items-center justify-between px-2.5'>
      <GameProvider>
        <GameBoard />
      </GameProvider>
    </main>
  );
}
