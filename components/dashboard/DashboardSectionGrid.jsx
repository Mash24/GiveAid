import Link from 'next/link';

const sections = [
  {
    href: '/dashboard/donate-money',
    icon: '💰',
    title: 'Donate Money',
    desc: 'Support causes with a monetary donation.'
  },
  {
    href: '/dashboard/donate-items',
    icon: '🎁',
    title: 'Donate Items',
    desc: 'Give physical items to those in need.'
  },
  {
    href: '/dashboard/request-help',
    icon: '🙋',
    title: 'Request Help',
    desc: 'Ask for help for yourself or others.'
  },
  {
    href: '/dashboard/campaigns',
    icon: '📢',
    title: 'Campaigns',
    desc: 'Create or manage fundraising campaigns.'
  },
  {
    href: '/dashboard/volunteer',
    icon: '🤝',
    title: 'Volunteer',
    desc: 'Sign up for volunteer opportunities.'
  },
  {
    href: '/dashboard/activity',
    icon: '📜',
    title: 'My Activity',
    desc: 'View your donation and volunteer history.'
  },
  {
    href: '/dashboard/explore',
    icon: '🔍',
    title: 'Explore',
    desc: 'Discover public campaigns and urgent needs.'
  },
  {
    href: '/dashboard/donations',
    icon: '📝',
    title: 'Donations',
    desc: 'See your donation history and status.'
  },
  {
    href: '/dashboard/admin',
    icon: '🔒',
    title: 'Admin Review',
    desc: 'Admin tools for reviewing and managing.'
  },
];

export default function DashboardSectionGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 w-full max-w-6xl">
      {sections.map((section) => (
        <Link key={section.href} href={section.href} className="block">
          <div className="flex flex-col items-center justify-center border rounded-2xl shadow-md bg-white p-8 h-full transition-transform hover:scale-105 hover:shadow-xl cursor-pointer group">
            <div className="text-4xl mb-2 group-hover:animate-bounce">{section.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-1">{section.title}</h3>
            <p className="text-gray-500 text-center text-sm">{section.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
