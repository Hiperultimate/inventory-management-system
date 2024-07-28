import DisplayInventory from "./components/displayInventory";


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between pt-24 font-mono">
      <div className="text-sm">
        Inventory Management System
      </div>
      <DisplayInventory />
    </main>
  );
}
