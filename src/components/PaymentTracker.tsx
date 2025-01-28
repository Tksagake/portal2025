import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function PaymentTracker({ userId }: { userId: string }) {
  const [payments, setPayments] = useState<any[]>([]);
  const [newPayment, setNewPayment] = useState({
    amount: '',
    receipt: null as File | null
  });

  useEffect(() => {
    const loadPayments = async () => {
      const { data } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', userId);
      setPayments(data || []);
    };
    loadPayments();
  }, [userId]);

  const handleSubmit = async () => {
    if (!newPayment.receipt) return;

    // Upload receipt
    const { data: fileData } = await supabase.storage
      .from('receipts')
      .upload(`${userId}/${Date.now()}_receipt.pdf`, newPayment.receipt);

    // Create payment record
    const { data } = await supabase
      .from('payments')
      .insert({
        user_id: userId,
        amount: parseFloat(newPayment.amount),
        receipt_url: fileData?.path,
        status: 'pending'
      });

    if (data) {
      setPayments([...payments, data[0]]);
      setNewPayment({ amount: '', receipt: null });
    }
  };

  return (
    <div>
      <input 
        type="number" 
        value={newPayment.amount} 
        onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })} 
      />
      <input
        type="file"
        onChange={(e) => setNewPayment({ ...newPayment, receipt: e.target.files?.[0] || null })}
      />
      <button onClick={handleSubmit}>Submit Payment</button>

      <div className="payments-list">
        {payments.map(payment => (
          <div key={payment.id} className={`payment ${payment.status}`}>
            <span>Amount: ${payment.amount}</span>
            <span>Status: {payment.status}</span>
            {payment.receipt_url && (
              <a href={supabase.storage.from('receipts').getPublicUrl(payment.receipt_url)}>
                View Receipt
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}