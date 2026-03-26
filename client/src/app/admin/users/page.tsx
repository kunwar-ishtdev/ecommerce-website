import { Card, CardContent } from '@/components/ui/Card';
import { Search, Edit, Trash2 } from 'lucide-react';

export default function AdminUsersPage() {
  const users = [
    { id: 'usr_1', name: 'John Admin', email: 'admin@aerogear.com', role: 'admin' },
    { id: 'usr_2', name: 'Liam Johnson', email: 'liam@example.com', role: 'user' },
    { id: 'usr_3', name: 'Emma Williams', email: 'emma@example.com', role: 'user' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2">Users Management</h1>
        <p className="text-slate-400">View and manage customer accounts and administrators.</p>
      </div>

      <Card className="bg-slate-900 border-slate-800">
        <CardContent className="p-0">
          <div className="p-4 border-b border-slate-800 bg-slate-800/20">
            <div className="relative max-w-md">
              <input 
                type="text" 
                placeholder="Search users..." 
                className="w-full bg-slate-800 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-slate-400" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800 text-slate-400 font-medium">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Role</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">{user.id}</td>
                    <td className="px-6 py-4 font-medium text-white">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">
                      {user.role === 'admin' ? 
                        <span className="bg-purple-500/10 text-purple-400 px-3 py-1 rounded-full text-xs font-bold">ADMIN</span> : 
                        <span className="bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs font-bold">USER</span>
                      }
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                      <button className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded transition-colors" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded transition-colors" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}
