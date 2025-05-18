import { prisma } from '../../lib/prisma';

// Mock campaign data (replace with database fetch in a real app)
const mockCampaigns = [
  {
    id: '1',
    title: "Help Sarah's Medical Treatment",
    description: "Sarah needs urgent surgery to treat her rare condition. Your support can make a difference in her life.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    category: "Medical",
    raised: 25000,
    goal: 50000,
    donors: 156,
    daysLeft: 15
  },
  {
    id: '2',
    title: "Community Library Project",
    description: "Building a new library to provide educational resources for underprivileged children in our community.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=80",
    category: "Education",
    raised: 15000,
    goal: 30000,
    donors: 89,
    daysLeft: 30
  },
  {
    id: '3',
    title: "Emergency Relief Fund",
    description: "Supporting families affected by recent natural disasters with immediate relief and long-term recovery.",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
    category: "Emergency",
    raised: 75000,
    goal: 100000,
    donors: 234,
    daysLeft: 7
  },
   {
    id: '4',
    title: "Clean Water Initiative",
    description: "Provide access to clean and safe drinking water for communities in need.",
    image: "https://images.unsplash.com/photo-1549846281-c0f8a7d2c01e?auto=format&fit=crop&w=800&q=80",
    category: "Community",
    raised: 50000,
    goal: 70000,
    donors: 198,
    daysLeft: 25
  },
  {
    id: '5',
    title: "Support for Homeless Youth",
    description: "Helping provide shelter, food, and resources for young people experiencing homelessness.",
    image: "https://images.unsplash.com/photo-1518398046578-8cca57782e17?auto=format&fit=crop&w=800&q=80",
    category: "Community",
    raised: 30000,
    goal: 40000,
    donors: 120,
    daysLeft: 10
  }
];

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { search, category } = req.query;

    let filteredCampaigns = mockCampaigns;

    // Filter by category
    if (category && category !== 'all') {
      filteredCampaigns = filteredCampaigns.filter(campaign =>
        campaign.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query (case-insensitive, checks title and description)
    if (search) {
      const lowerCaseSearch = search.toLowerCase();
      filteredCampaigns = filteredCampaigns.filter(campaign =>
        campaign.title.toLowerCase().includes(lowerCaseSearch) ||
        campaign.description.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // In a real application, you would query your database here using Prisma
    // Example with Prisma (replace mock data above):
    /*
    let where = {};
    if (category && category !== 'all') {
      where.category = category.toUpperCase(); // Assuming your enum is uppercase
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const campaigns = await prisma.campaign.findMany({
      where,
      // Add ordering, pagination etc. here
    });
    */

    return res.status(200).json({ campaigns: filteredCampaigns });

  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return res.status(500).json({ message: 'Something went wrong' });
  }
} 