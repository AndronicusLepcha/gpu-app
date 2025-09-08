import LogoutButton from "./logoutButton";
export default function Header() {
  return (
    <nav className="flex justify-between items-center p-4 shadow bg-[#f8f3eb]">
      <h1 className="text-xl font-bold text-black">GPU App</h1>
      <LogoutButton />
    </nav>
  );
}
