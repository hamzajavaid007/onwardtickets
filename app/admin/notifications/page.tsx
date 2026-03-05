'use client';

import { useState } from 'react';

type NotifType = 'all' | 'orders' | 'payments' | 'updates';

const allNotifications = [
  { id: 1, title: 'New Flight Itinerary Order', desc: 'John Doe submitted a flight itinerary request for London to Dubai round trip.', time: '2 min ago', date: 'Today', read: false, color: '#3B82F6', type: 'orders' as const },
  { id: 2, title: 'Payment Received', desc: '$49.99 received for Hotel Reservation #1042 via Stripe.', time: '15 min ago', date: 'Today', read: false, color: '#10B981', type: 'payments' as const },
  { id: 3, title: 'Visa Assistant Completed', desc: 'Order #1038 for Maria Garcia has been marked as completed successfully.', time: '1 hour ago', date: 'Today', read: false, color: '#EF4444', type: 'updates' as const },
  { id: 4, title: 'New Cover Letter Order', desc: 'Sarah Wilson submitted a cover letter request for UK tourist visa application.', time: '3 hours ago', date: 'Today', read: true, color: '#F59E0B', type: 'orders' as const },
  { id: 5, title: 'Travel Plan Update', desc: 'Order #1035 for James Brown moved from pending to processing status.', time: '5 hours ago', date: 'Today', read: true, color: '#8B5CF6', type: 'updates' as const },
  { id: 6, title: 'Payment Received', desc: '$79.99 received for Visa Essentials Package #1033 via PayPal.', time: '8 hours ago', date: 'Today', read: true, color: '#10B981', type: 'payments' as const },
  { id: 7, title: 'New Hotel Reservation Order', desc: 'Michael Chen submitted a hotel reservation request for Paris, 5 nights.', time: '12 hours ago', date: 'Today', read: true, color: '#3B82F6', type: 'orders' as const },
  { id: 8, title: 'Visa Documents Submitted', desc: 'Order #1029 — Emily Davis uploaded all required supporting documents.', time: '1 day ago', date: 'Yesterday', read: true, color: '#06B6D4', type: 'updates' as const },
  { id: 9, title: 'Payment Failed', desc: 'Payment of $34.99 failed for Flight Itinerary #1027. Card declined.', time: '1 day ago', date: 'Yesterday', read: true, color: '#EF4444', type: 'payments' as const },
  { id: 10, title: 'New Travel Plan Order', desc: 'Robert Taylor submitted a full travel plan request for Schengen visa.', time: '1 day ago', date: 'Yesterday', read: true, color: '#8B5CF6', type: 'orders' as const },
  { id: 11, title: 'Order Cancelled', desc: 'Order #1024 for Cover Letter was cancelled by the customer.', time: '2 days ago', date: 'This Week', read: true, color: '#F59E0B', type: 'updates' as const },
  { id: 12, title: 'Payment Received', desc: '$149.99 received for Visa Essentials Package #1022 via Stripe.', time: '2 days ago', date: 'This Week', read: true, color: '#10B981', type: 'payments' as const },
  { id: 13, title: 'New Visa Assistant Order', desc: 'Amanda White submitted a visa assistant request for US B1/B2 visa.', time: '3 days ago', date: 'This Week', read: true, color: '#EF4444', type: 'orders' as const },
  { id: 14, title: 'Bulk Export Completed', desc: 'Your CSV export of 342 submissions from January has been generated.', time: '4 days ago', date: 'This Week', read: true, color: '#6B7280', type: 'updates' as const },
];

const tabs: { label: string; key: NotifType }[] = [
  { label: 'All', key: 'all' },
  { label: 'Orders', key: 'orders' },
  { label: 'Payments', key: 'payments' },
  { label: 'Updates', key: 'updates' },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(allNotifications);
  const [activeTab, setActiveTab] = useState<NotifType>('all');

  const filtered = activeTab === 'all' ? notifications : notifications.filter(n => n.type === activeTab);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // Group by date
  const grouped: Record<string, typeof filtered> = {};
  filtered.forEach(n => {
    if (!grouped[n.date]) grouped[n.date] = [];
    grouped[n.date].push(n);
  });

  return (
    <div className="btn-hover-lift max-w-[900px] mx-auto">
      {/* Header */}
      <div className="btn-hover-lift flex items-center justify-between mb-6">
        <div>
          <h2 className="btn-hover-lift text-[22px] font-bold text-[#0B1437]">Notifications</h2>
          <p className="btn-hover-lift text-[13px] text-gray-500 mt-1">
            You have <span className="btn-hover-lift font-semibold text-[#2979FF]">{unreadCount}</span> unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="btn-hover-lift px-4 py-2 text-[13px] font-medium text-[#2979FF] bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="btn-hover-lift flex gap-2 mb-6">
        {tabs.map(tab => {
          const count = tab.key === 'all' ? notifications.length : notifications.filter(n => n.type === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-xl text-[13px] font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-[#2979FF] text-white shadow-lg shadow-blue-500/20'
                  : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {tab.label}
              <span className={`ml-1.5 text-[11px] ${activeTab === tab.key ? 'text-blue-200' : 'text-gray-400'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Notification List */}
      <div className="btn-hover-lift bg-white rounded-2xl border border-gray-200 overflow-hidden">
        {Object.keys(grouped).length === 0 ? (
          <div className="btn-hover-lift py-16 text-center">
            <svg className="btn-hover-lift mx-auto mb-4 text-gray-300" width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="btn-hover-lift text-[14px] text-gray-500">No notifications</p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, items]) => (
            <div key={date}>
              <div className="btn-hover-lift px-5 py-2.5 bg-[#F8FAFC] border-b border-gray-100">
                <span className="btn-hover-lift text-[12px] font-semibold text-gray-500 uppercase tracking-wide">{date}</span>
              </div>
              {items.map((notif) => (
                <div
                  key={notif.id}
                  className={`flex items-start gap-4 px-5 py-4 border-b border-gray-50 hover:bg-[#F8FAFC] transition-colors group ${!notif.read ? 'bg-blue-50/30' : ''}`}
                >
                  {/* Color indicator */}
                  <span
                    className="btn-hover-lift w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${notif.color}12` }}
                  >
                    <span className="btn-hover-lift w-3 h-3 rounded-full" style={{ background: notif.color }} />
                  </span>

                  {/* Content */}
                  <div className="btn-hover-lift flex-1 min-w-0">
                    <div className="btn-hover-lift flex items-center gap-2">
                      <p className={`text-[14px] ${!notif.read ? 'font-semibold text-[#0B1437]' : 'font-medium text-gray-700'}`}>
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <span className="btn-hover-lift w-2 h-2 rounded-full bg-[#2979FF] flex-shrink-0" />
                      )}
                    </div>
                    <p className="btn-hover-lift text-[13px] text-gray-500 mt-0.5 leading-relaxed">{notif.desc}</p>
                    <p className="btn-hover-lift text-[12px] text-gray-400 mt-1.5">{notif.time}</p>
                  </div>

                  {/* Actions */}
                  <div className="btn-hover-lift flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1">
                    {!notif.read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        title="Mark as read"
                        className="btn-hover-lift p-1.5 rounded-lg hover:bg-blue-100 text-gray-400 hover:text-[#2979FF] transition-colors"
                      >
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      title="Delete"
                      className="btn-hover-lift p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
