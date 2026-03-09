import { useState, useEffect } from "react";
import { SignageRequest, mockRequests } from "@/lib/mockData";

const STORAGE_KEY = "signage_requests";

export function useRequests() {
  const [requests, setRequests] = useState<SignageRequest[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage or initialize with mock data
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRequests(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored requests", e);
        setRequests(mockRequests);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRequests));
      }
    } else {
      setRequests(mockRequests);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockRequests));
    }
    setIsLoaded(true);
  }, []);

  const saveRequests = (newRequests: SignageRequest[]) => {
    setRequests(newRequests);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newRequests));
  };

  const addRequest = (request: SignageRequest) => {
    saveRequests([request, ...requests]);
  };

  const updateRequest = (id: string, updates: Partial<SignageRequest>) => {
    saveRequests(requests.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  return {
    requests,
    addRequest,
    updateRequest,
    isLoaded,
  };
}
