import Link from "next/link";
import { FaTools, FaTable, FaWrench, FaClipboardList, FaChartPie, FaDatabase } from "react-icons/fa"; // Ensure FaDatabase is imported

export default function HomePage() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-800">Maintenance Tracker</h1>
      <p className="text-center text-gray-600">Easily manage your equipment and maintenance records.</p>

      <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Equipment Form */}
        <Link
          href="/equipment"
          className="flex flex-col items-center justify-center bg-[#FFD7BA] text-white p-6 rounded-lg shadow-lg hover:bg-[#FFC4A3] transform hover:scale-105 transition-transform duration-200"
        >
          <FaTools size={40} className="mb-4" />
          <span className="text-lg font-semibold">Equipment Form</span>
        </Link>

        {/* Equipment Table */}
        <Link
          href="/equipment-table"
          className="flex flex-col items-center justify-center bg-[#FFEBBA] text-white p-6 rounded-lg shadow-lg hover:bg-[#FFE3A3] transform hover:scale-105 transition-transform duration-200"
        >
          <FaTable size={40} className="mb-4" />
          <span className="text-lg font-semibold">Equipment Table</span>
        </Link>

        {/* Maintenance Form */}
        <Link
          href="/maintenance"
          className="flex flex-col items-center justify-center bg-[#BAE1FF] text-white p-6 rounded-lg shadow-lg hover:bg-[#A3D4FF] transform hover:scale-105 transition-transform duration-200"
        >
          <FaWrench size={40} className="mb-4" />
          <span className="text-lg font-semibold">Maintenance Form</span>
        </Link>

        {/* Maintenance Records */}
        <Link
          href="/maintenance-records"
          className="flex flex-col items-center justify-center bg-[#BAFFD7] text-white p-6 rounded-lg shadow-lg hover:bg-[#A3FFCA] transform hover:scale-105 transition-transform duration-200"
        >
          <FaClipboardList size={40} className="mb-4" />
          <span className="text-lg font-semibold">Maintenance Records</span>
        </Link>

        {/* Dashboard */}
        <Link
          href="/dashboard"
          className="flex flex-col items-center justify-center bg-[#E1BAFF] text-white p-6 rounded-lg shadow-lg hover:bg-[#D4A3FF] transform hover:scale-105 transition-transform duration-200 col-span-2"
        >
          <FaChartPie size={40} className="mb-4" />
          <span className="text-lg font-semibold">Dashboard</span>
        </Link>

        {/* Database */}
        <Link
          href="/database"
          className="flex flex-col items-center justify-center bg-[#C1E1FF] text-white p-6 rounded-lg shadow-lg hover:bg-[#A3D4FF] transform hover:scale-105 transition-transform duration-200 col-span-2"
        >
          <FaDatabase size={40} className="mb-4" />
          <span className="text-lg font-semibold">User Database</span>
        </Link>
      </div>
    </div>
  );
}
