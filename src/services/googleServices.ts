/**
 * Service to interact with Google APIs (Calendar and Tasks)
 */

export interface CalendarEvent {
    id: string;
    summary: string;
    start: {
        dateTime?: string;
        date?: string;
    };
    description?: string;
}

export interface GoogleCalendar {
    id: string;
    summary: string;
    primary?: boolean;
}

export interface GoogleTask {
    id: string;
    title: string;
    notes?: string;
    status: 'needsAction' | 'completed';
    completed?: string;
}

export const fetchCalendarEvents = async (token: string): Promise<CalendarEvent[]> => {
    try {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);

        const endOfPeriod = new Date();
        endOfPeriod.setDate(endOfPeriod.getDate() + 7);
        endOfPeriod.setHours(23, 59, 59, 999);

        const timeMin = encodeURIComponent(startOfDay.toISOString());
        const timeMax = encodeURIComponent(endOfPeriod.toISOString());

        const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin}&timeMax=${timeMax}&maxResults=20&orderBy=startTime&singleEvents=true`;

        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        );

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            const message = errorBody.error?.message || 'Failed to fetch calendar events';
            const error: any = new Error(message);
            error.status = response.status;
            throw error;
        }

        const data = await response.json();
        return data.items || [];
    } catch (error: any) {
        console.error("Error fetching Google Calendar:", error);
        throw error;
    }
};

export const fetchUserCalendars = async (token: string): Promise<GoogleCalendar[]> => {
    try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) return [];
        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error("Error fetching calendar list:", error);
        return [];
    }
};

export const fetchGoogleTasks = async (token: string): Promise<GoogleTask[]> => {
    try {
        // Fetch from the @default task list
        const response = await fetch(
            'https://tasks.googleapis.com/tasks/v1/lists/@default/tasks?showCompleted=true&maxResults=50',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Google Tasks API error:", errorData);
            return [];
        }

        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error("Error fetching Google Tasks:", error);
        return [];
    }
};
