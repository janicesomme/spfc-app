const fetchStats = async () => {
    try {
      // Get total users count
      const usersData = await supabaseCall('users', { count: true });
      const usersCount = usersData.count || 0;

      // Get Pick XI submissions count
      const pickXIData = await supabaseCall('pick_xi', { count: true });
      const pickXICount = pickXIData.count || 0;

      // Get playerimport React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, FileText, Star, Mail } from 'lucide-react';

// We'll use fetch API to call Lovable's built-in Supabase endpoints
const supabaseCall = async (table: string, options: any = {}) => {
  const { count = false, select = '*', order, where } = options;
  
  let url = `/api/supabase/${table}`;
  const params = new URLSearchParams();
  
  if (count) params.append('count', 'exact');
  if (select !== '*') params.append('select', select);
  if (order) params.append('order', order);
  if (where) params.append('where', JSON.stringify(where));
  
  if (params.toString()) url += `?${params.toString()}`;
  
  const response = await fetch(url);
  return response.json();
};

const AdminHomepage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    pickXISubmissions: 0,
    ratingsSubmitted: 0,
    emailSignups: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Get total users count
      const { count: usersCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      // Get Pick XI submissions count
      const { count: pickXICount } = await supabase
        .from('pick_xi')
        .select('*', { count: 'exact', head: true });

      // Get player ratings count
      const { count: ratingsCount } = await supabase
        .from('player_ratings')
        .select('*', { count: 'exact', head: true });

      // Get email signups count
      const { count: emailsCount } = await supabase
        .from('emails')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalUsers: usersCount || 0,
        pickXISubmissions: pickXICount || 0,
        ratingsSubmitted: ratingsCount || 0,
        emailSignups: emailsCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Pick XI Submissions',
      value: stats.pickXISubmissions,
      icon: FileText,
      color: 'text-green-600'
    },
    {
      title: 'Ratings Submitted',
      value: stats.ratingsSubmitted,
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      title: 'Email Signups',
      value: stats.emailSignups,
      icon: Mail,
      color: 'text-purple-600'
    }
  ];

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">FUTV Admin Dashboard</h1>
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">FUTV Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <a href="/admin/users" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            View Users
          </a>
          <a href="/admin/pick-xi" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            View Pick XI
          </a>
          <a href="/admin/ratings" className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700">
            View Ratings
          </a>
          <button 
            onClick={fetchStats}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Refresh Stats
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;