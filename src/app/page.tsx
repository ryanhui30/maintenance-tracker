import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Maintenance Tracker</h1>
      <p className="mb-4">Start by adding your equipment and maintenance records.</p>

      <div className="space-y-4">
        <Link
          href="/equipment"
          className="bg-[#FFD7BA] text-white px-6 py-3 rounded-lg hover:bg-[#FFC4A3] block text-center"
        >
          Go to Equipment Form
        </Link>
        <Link
          href="/equipment-table"
          className="bg-[#FFEBBA] text-white px-6 py-3 rounded-lg hover:bg-[#FFE3A3] block text-center"
        >
          Go to Equipment Table
        </Link>
        <Link
          href="/maintenance"
          className="bg-[#BAE1FF] text-white px-6 py-3 rounded-lg hover:bg-[#A3D4FF] block text-center"
        >
          Go to Maintenance Form
        </Link>
        <Link
          href="/maintenance-records"
          className="bg-[#BAFFD7] text-white px-6 py-3 rounded-lg hover:bg-[#A3FFCA] block text-center"
        >
          Go to Maintenance Records Table
        </Link>
        <Link
          href="/dashboard"
          className="bg-[#E1BAFF] text-white px-6 py-3 rounded-lg hover:bg-[#D4A3FF] block text-center"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
