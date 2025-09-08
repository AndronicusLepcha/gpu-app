
export default function Footer() {
  return (
   <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-400 text-center py-6 mt-12">
      <p>© {new Date().getFullYear()} GPU Certificate App. All rights reserved.</p>
      <p className="mt-2 text-sm text-gray-500">
        Made with ❤️ by <span className="text-white font-semibold">Andronicus</span>
      </p>
    </footer>
  );
}
