import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Maintenance Tracker</h1>
      <p className="mb-4">Start by adding your equipment and maintenance records.</p>

      <div className="space-y-4">
        <Link
          href="/equipment"
          className="bg-[#A3D8F4] text-white px-6 py-3 rounded-lg hover:bg-[#8FC8D5] block text-center"
        >
          Go to Equipment Form
        </Link>
        <Link
          href="/equipment-table"
          className="bg-[#F4B6C2] text-white px-6 py-3 rounded-lg hover:bg-[#E08B96] block text-center"
        >
          Go to Equipment Table
        </Link>
        <Link
          href="/maintenance"
          className="bg-[#A8E6CF] text-white px-6 py-3 rounded-lg hover:bg-[#7FCDB7] block text-center"
        >
          Go to Maintenance Form
        </Link>
        <Link
          href="/maintenance-records"
          className="bg-[#F4B6C2] text-white px-6 py-3 rounded-lg hover:bg-[#E08B96] block text-center"
        >
          Go to Maintenance Records Table
        </Link>
        <Link
          href="/dashboard"
          className="bg-[#A3D8F4] text-white px-6 py-3 rounded-lg hover:bg-[#8FC8D5] block text-center"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
