export default function Navbar() {
  return <>
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Dhruv Shah</h1>
      <ul className="flex gap-4">
        <li><a href="#" className="hover:underline">Home</a></li>
        <li><a href="#" className="hover:underline">About</a></li>
      </ul>
    </nav>
    </>
}