import GameProvider from "@/context/GameContext";
import GameBoard from "@/components/GameBoard";
import Keyboard from "@/components/Keyboard";
import Modal from "@/components/Modal";

export default function Home() {
  return (
    <main className='flex min-h-screen h-screen flex-col items-center justify-between p-6'>
      <div className='min-h-full h-full min-w-full w-full flex flex-col content-center justify-center items-center justify-items-center'>
        <GameProvider>
          <Modal />
          <GameBoard />
          <Keyboard />
        </GameProvider>
      </div>
    </main>
  );
}
