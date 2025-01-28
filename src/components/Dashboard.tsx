import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import FileUpload from './FileUpload';
import PaymentTracker from './PaymentTracker';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [view, setView] = useState<'assignments' | 'payments'>('assignments');

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard">
      <nav>
        <button onClick={() => setView('assignments')}>Assignments</button>
        <button onClick={() => setView('payments')}>Payments</button>
      </nav>

      {view === 'assignments' && (
        user.user_metadata.role === 'student' ? (
          <FileUpload userId={user.id} />
        ) : (
          <TeacherView userId={user.id} />
        )
      )}

      {view === 'payments' && <PaymentTracker userId={user.id} />}
    </div>
  );
}