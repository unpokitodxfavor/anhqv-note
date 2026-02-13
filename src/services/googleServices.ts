/**
 * Service to interact with Google APIs (Calendar and Gmail)
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

export interface GmailThread {
    id: string;
    snippet: string;
    subject: string;
    from: string;
}

export const fetchCalendarEvents = async (token: string): Promise<CalendarEvent[]> => {
    try {
        const now = new Date().toISOString();
        const response = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${now}&maxResults=5&orderBy=startTime&singleEvents=true`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch calendar events');
        }

        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error("Error fetching Google Calendar:", error);
        return [];
    }
};

export const fetchGmailThreads = async (token: string): Promise<GmailThread[]> => {
    try {
        // Fetch last 5 messages from inbox
        const listResponse = await fetch(
            'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5&q=label:inbox',
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (!listResponse.ok) {
            throw new Error('Failed to fetch Gmail messages');
        }

        const listData = await listResponse.json();
        const messages = listData.messages || [];

        const threadDetails = await Promise.all(
            messages.map(async (msg: { id: string }) => {
                const detailResponse = await fetch(
                    `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const detailData = await detailResponse.json();

                const headers = detailData.payload.headers;
                const subject = headers.find((h: any) => h.name === 'Subject')?.value || 'No Subject';
                const from = headers.find((h: any) => h.name === 'From')?.value || 'Unknown';

                return {
                    id: detailData.id,
                    snippet: detailData.snippet,
                    subject,
                    from,
                };
            })
        );

        return threadDetails;
    } catch (error) {
        console.error("Error fetching Gmail:", error);
        return [];
    }
};
