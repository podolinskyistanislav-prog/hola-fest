import { VenueEventsList } from './VenueEventsList';
import { useAdminVenueEvents } from './useAdminVenueEvents';

type VenueEventsAreaProps = { onCreate?: () => void; onOpenEvent?: (id: string) => void };

/** Admin screen content: the events of the venue the caller administers. */
export function VenueEventsArea({ onCreate, onOpenEvent }: VenueEventsAreaProps) {
  const { venue, events, isLoading, isError, retry } = useAdminVenueEvents();
  return (
    <VenueEventsList
      venueName={venue?.name}
      events={events}
      isLoading={isLoading}
      isError={isError}
      onRetry={retry}
      onCreate={onCreate}
      onOpenEvent={onOpenEvent}
    />
  );
}
