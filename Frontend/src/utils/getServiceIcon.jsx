import { Megaphone, Users, Code, Search, Target, BarChart3, Calendar, Monitor, Rocket, Eye, HeartHandshake } from 'lucide-react';

/**
 * Returns the appropriate Lucide icon for a given service.
 * @param {string} iconName - The icon identifier from services data
 * @param {'sm' | 'lg'} size - 'sm' = 24px (w-6 h-6), 'lg' = 48px (w-12 h-12)
 */
const getServiceIcon = (iconName, size = 'sm') => {
  const sizeClass = size === 'lg' ? 'w-12 h-12' : 'w-6 h-6';
  // Use text-gradient-premium equivalent colors dynamically via CSS variable if possible, or fallback to primary
  const className = `${sizeClass} text-[var(--theme-primary,#b449f6)]`;

  switch (iconName) {
    case 'Megaphone':
    case 'FaBullhorn':
      return <Megaphone className={className} />;
    case 'Users':
    case 'FaUserFriends':
      return <Users className={className} />;
    case 'Code':
    case 'FaLaptopCode':
    case 'FaCode':
      return <Code className={className} />;
    case 'Search':
    case 'FaSearch':
      return <Search className={className} />;
    case 'Target':
    case 'FaBullseye':
      return <Target className={className} />;
    case 'FaChartLine':
      return <BarChart3 className={className} />;
    case 'FaCalendarAlt':
      return <Calendar className={className} />;
    case 'Monitor':
      return <Monitor className={className} />;
    case 'Eye':
      return <Eye className={className} />;
    case 'HeartHandshake':
      return <HeartHandshake className={className} />;
    default:
      return <Rocket className={className} />; // Fallback to a generic rocket instead of code
  }
};

export default getServiceIcon;
