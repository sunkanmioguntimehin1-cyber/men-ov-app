import { getSearchOption } from "@/src/api_services/googlePlacesApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Custom hook for managing location search and selection
export function useLocationSearch() {
  const [term, setTerm] = useState<any>("");
  const [option, setOption] = useState([]);
  const [city, setCity] = useState<any>(null);

  const getSearchOptionQuery = useQuery({
    queryKey: ["get-search-option", term],
    queryFn: async () => {
      const data = await getSearchOption(term);
      setOption(data?.predictions || []);
      return data;
    },
    enabled: Boolean(term),
    select: (data) => data?.predictions || [],
  });

  const handleLocationChange = async (text: any) => {
    setTerm(text);
    if (text.length > 0) {
      getSearchOptionQuery.refetch();
    } else {
      setOption([]);
    }
  };

  const onOptionSelect = (item: any) => {
    setCity(item);
  };

  useEffect(() => {
    if (city) {
      setTerm(city);
      setOption([]);
    }
  }, [city]);

  // Return the states and functions that the component will interact with
  return {
    term,
    option,
    city,
    handleLocationChange,
    onOptionSelect,
    getSearchOptionQuery,
  };
}
