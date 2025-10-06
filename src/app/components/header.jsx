export default function Header({ user }) {
  return (
    <header className="flex justify-between mb-10 items-center">
      <h1 className="text-3xl font-bold">Welcome, {user.display_name}</h1>
      <img
        src={user.images?.[0]?.url}
        alt="Profile"
        className="w-12 h-12 rounded-full"
      />
    </header>
  );
}
