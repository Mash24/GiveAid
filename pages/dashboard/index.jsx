import DashboardWelcome from '../../components/dashboard/DashboardWelcome';
import DashboardSectionGrid from '../../components/dashboard/DashboardSectionGrid';
import SectionTitle from '../../components/shared/SectionTitle';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <DashboardWelcome />
      <SectionTitle />
      <DashboardSectionGrid />
    </div>
  );
}
