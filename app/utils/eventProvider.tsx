//eventProvider.tsx
import React, { createContext, useContext, useEffect, useState, Suspense } from 'react';

type EventContextType = {
  eventsByDate: Record<string, any[]>; // New object to store events grouped by date
  loading: boolean;
  error: Error | null;
};

const EventContext = createContext<EventContextType | undefined>(undefined);

export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventProvider');
  }
  return context;
};

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://teclead-ventures.github.io/data/london-events.json');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Process the events and group them by date
  const eventsByDate: Record<string, any[]> = events.reduce((acc, event) => {
    const date = new Date(event.startTime).toLocaleDateString();
    acc[date] = [...(acc[date] || []), event];
    return acc;
  }, {});

  return (
    <Suspense fallback={<div>Loading Data...</div>}>
      <EventContext.Provider value={{ eventsByDate, loading, error }}>
        {children}
      </EventContext.Provider>
    </Suspense>
  );
};
