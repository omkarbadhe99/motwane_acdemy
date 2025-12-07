export default function Footer() {
  return (
    <footer
      className="border-t py-4 px-6"
      style={{
        background:
          "linear-gradient(90deg, #00AF6F 0%, #029F92 50%, #0287C7 100%)",
      }}
    >
      <div className="flex items-center justify-between text-xs text-white">
        <div>© 2025 www.nodedesignstudio.com - All rights reserved.</div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-gray-200 transition">
            Terms and conditions
          </a>
          <span>|</span>
          <a href="#" className="hover:text-gray-200 transition">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
