import { useEffect } from "react";

// Old /login and /register links on the marketing domain now live in the cloud app.
export default function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}
