import React from 'react';
import { Bell, X, CheckSquare, Award, AlertCircle, Megaphone } from 'lucide-react';
import { SystemNotification } from '../types';

interface NotificationCenterProps {
  notifications: SystemNotification[];
  onMarkRead: (id: string) => void;
  onClearAll: () => void;
}

export default function NotificationCenter({ 
  notifications, 
  onMarkRead, 
  onClearAll 
}: NotificationCenterProps) {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div id="notification-center-card" className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
        <div className="flex items-center space-x-2">
          <div className="relative p-2 bg-indigo-50 rounded-xl text-indigo-600">
            <Bell className="w-5 h-5 animate-pulse" />
            {unreadCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-rose-500 rounded-full"></span>
            )}
          </div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-md">Notification Bulletin</h4>
            <p className="text-xs text-slate-400">Automated alerts & log monitors</p>
          </div>
        </div>
        
        {notifications.length > 0 && (
          <button 
            onClick={onClearAll} 
            className="text-xs font-bold text-slate-400 hover:text-indigo-600 uppercase tracking-wider"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
        {notifications.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-2xl text-slate-400 text-xs">
            No active notification alerts logged.
          </div>
        ) : (
          notifications.map((notif) => {
            let IconColor = "bg-blue-50 text-blue-600 border border-blue-100";
            let Icon = CheckSquare;
            if (notif.type === 'assignment') {
              Icon = CheckSquare;
              IconColor = "bg-orange-50 text-orange-700 border border-orange-100";
            } else if (notif.type === 'grade') {
              Icon = Award;
              IconColor = "bg-indigo-50 text-indigo-700 border border-indigo-100";
            } else if (notif.type === 'attendance') {
              Icon = AlertCircle;
              IconColor = "bg-rose-50 text-rose-700 border border-rose-100";
            } else {
              Icon = Megaphone;
              IconColor = "bg-emerald-50 text-emerald-700 border border-emerald-100";
            }

            return (
              <div 
                key={notif.id} 
                className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-start space-x-3 text-xs font-semibold ${
                  notif.read 
                    ? 'border-slate-100 bg-slate-50/50 opacity-70' 
                    : 'border-indigo-100 bg-indigo-50/20 shadow-xs'
                }`}
              >
                <div className={`mt-0.5 p-1.5 rounded-lg flex-shrink-0 ${IconColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-0.5">
                    <span className="text-slate-800 font-extrabold truncate">{notif.title}</span>
                    <span className="text-[9px] font-mono font-bold text-slate-400 ml-2">
                      {new Date(notif.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-slate-600 font-normal leading-relaxed line-clamp-3">{notif.message}</p>
                  
                  {!notif.read && (
                    <button
                      onClick={() => onMarkRead(notif.id)}
                      className="text-[10px] text-indigo-600 font-extrabold hover:text-indigo-800 uppercase tracking-widest mt-2 block"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
