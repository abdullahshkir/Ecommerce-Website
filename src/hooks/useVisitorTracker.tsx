import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisitor } from '../integrations/supabase/api';

// We use a simple mechanism to ensure the tracker only runs once per session/page load
const useVisitorTracker = () => {
    const location = useLocation();
    const hasTrackedRef = useRef(false);

    useEffect(() => {
        // Only track if we haven't tracked yet in this session/load cycle
        if (!hasTrackedRef.current) {
            // We don't need to pass any data, as the Edge Function extracts it from headers
            trackVisitor();
            hasTrackedRef.current = true;
        }
        
        // Reset the ref if the user navigates to a new path, allowing tracking on subsequent page views
        // Note: In a single-page app (SPA) like this, tracking on route change is often desired.
        // However, since the Edge Function relies on request headers (which are static in an SPA fetch), 
        // we stick to tracking only once per initial load for simplicity and accuracy of IP/UA capture.
        // If we wanted to track page views, we would need a different approach (e.g., sending path/referrer manually).
        
    }, [location.pathname]); // Dependency on pathname ensures it runs on route change
};

export default useVisitorTracker;