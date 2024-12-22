import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Maintenance Tracker</h1>
      <p className="mb-4">Start by adding your equipment and maintenance records.</p>
      <Link href="/equipment" className="text-blue-500 hover:underline">
        Go to Equipment Form
      </Link>
      <Link href="/equipment-table" className="text-blue-500 underline">
          Go to Equipment Table
        </Link>
      <Link href="/maintenance" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 block text-center">
        Go to Maintenance Form
      </Link>
      <Link href="/maintenance-records" className="text-blue-500 underline">
          Go to Maintenance Records Table
      </Link>
      <Link href="/dashboard" className="text-blue-500 underline">
          Go to Dashboard
      </Link>
    </div>
  );
}

