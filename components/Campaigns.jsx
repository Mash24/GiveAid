import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Campaigns = ({ initialCampaigns = [], isLoggedIn = false }) => {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState(initialCampaigns);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(router.query.search || '');
  const [activeFilter, setActiveFilter] = useState(router.query.category || 'all');

  const filters = [
    { id: 'all', label: 'All Campaigns' },
    { id: 'medical', label: 'Medical' },
    { id: 'education', label: 'Education' },
    { id: 'emergency', label: 'Emergency' },
    { id: 'community', label: 'Community' }
  ];

  // Fetch campaigns based on search and filter
  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams();
        if (searchQuery) {
          query.append('search', searchQuery);
        }
        if (activeFilter !== 'all') {
          query.append('category', activeFilter);
        }

        // Update URL with search and filter parameters
        router.push({
          pathname: router.pathname,
          query: query.toString() ? Object.fromEntries(query) : {},
        }, undefined, { shallow: true });

        const response = await fetch(`/api/campaigns?${query.toString()}`);
        const data = await response.json();
        setCampaigns(data.campaigns || []);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setCampaigns([]); // Set to empty array on error
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if it's not the initial render with pre-fetched data
    // Or if query parameters change after initial load
    if (initialCampaigns.length === 0 || router.query.search !== searchQuery || router.query.category !== activeFilter) {
         fetchCampaigns();
    }
   
  }, [searchQuery, activeFilter, router, initialCampaigns]); // Add router to dependency array

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {isLoggedIn ? 'Your Active Campaigns' : 'Active Campaigns'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {isLoggedIn
              ? 'Track and manage your ongoing campaigns'
              : 'Discover and support meaningful causes that need your help today'}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="w-full md:w-1/3">
            <label htmlFor="campaign-search" className="sr-only">Search campaigns</label>
            <input
              id="campaign-search"
              name="campaign-search"
              type="text"
              placeholder="Search campaigns by name, location, keyword..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => handleFilterClick(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                  ${activeFilter === filter.id 
                    ? 'bg-emerald-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && <div className="text-center text-gray-600">Loading campaigns...</div>}

        {/* Campaigns Grid */}
        {!loading && campaigns.length === 0 && (
          <div className="text-center text-gray-600">No campaigns found.</div>
        )}

        {!loading && campaigns.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <Link
                href={`/campaigns/${campaign.id}`}
                key={campaign.id}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1">
                  {/* Campaign Image */}
                  <div className="relative h-48 w-full">
                    <Image
                      src={campaign.image || 'https://via.placeholder.com/800x400?text=Campaign+Image'}
                      alt={campaign.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority={false} // Set priority to false for images below the fold
                      unoptimized={true}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-emerald-500 text-white text-sm rounded-full">
                        {campaign.category}
                      </span>
                    </div>
                  </div>

                  {/* Campaign Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {campaign.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Raised</span>
                        <span className="font-semibold text-emerald-600">
                          ${campaign.raised.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all"
                          style={{ width: `${(campaign.raised / campaign.goal) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Goal: ${campaign.goal.toLocaleString()}</span>
                        <span className="text-gray-500">{campaign.daysLeft} days left</span>
                      </div>
                    </div>

                    {/* Campaign Stats */}
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {campaign.donors} donors
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {campaign.daysLeft} days left
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Call to Action */}
        {!isLoggedIn && (
          <div className="text-center mt-12">
            <Link
              href="/auth/register"
              className="inline-block px-8 py-3 bg-emerald-500 text-white rounded-full font-semibold hover:bg-emerald-600 transition-colors"
            >
              Start Your Campaign
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

// This function runs on each request to fetch initial data
export async function getServerSideProps(context) {
  const { query } = context;
  const searchQuery = query.search || '';
  const activeFilter = query.category || 'all';

  const apiQuery = new URLSearchParams();
  if (searchQuery) {
    apiQuery.append('search', searchQuery);
  }
  if (activeFilter !== 'all') {
    apiQuery.append('category', activeFilter);
  }

  try {
    // Fetch initial campaigns from your API route
    // Replace with your actual API endpoint
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/campaigns?${apiQuery.toString()}`);
    const data = await res.json();
    const initialCampaigns = data.campaigns || [];

    return {
      props: {
        initialCampaigns,
        // You might also want to pass isLoggedIn and user based on auth state here
        // For now, we'll keep them as props to the component
      },
    };
  } catch (error) {
    console.error('Error fetching initial campaigns:', error);
    return {
      props: {
        initialCampaigns: [],
      },
    };
  }
}

export default Campaigns; 