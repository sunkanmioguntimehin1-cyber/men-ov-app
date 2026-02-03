import axiosInstance from "@/src/lib/axiosInstance";

export const getSearchOption = async (value: any) => {
  try {
    const res = await axiosInstance.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
        value,
      )}&components=country:us|country:ca&types=geocode&key=${process.env.EXPO_PUBLIC_GOOGLE_AUTOCOMPLETE_KEY}`,
    );
    const result = res.data;
    return result;
  } catch (error) {
    throw error;
  }
};

export const fetchLocationDetails = async (placeId: string | undefined) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${process.env.EXPO_PUBLIC_GOOGLE_AUTOCOMPLETE_KEY}`,
    );
    const data = await response.json();
    const location = data.result.geometry.location;

    // Extract the address components
    const addressComponents = data.result.address_components;
    const state =
      addressComponents.find((component: any) =>
        component.types.includes("administrative_area_level_1"),
      )?.long_name || "";
    const country =
      addressComponents.find((component: any) =>
        component.types.includes("country"),
      )?.short_name || "";
    const zipCode =
      addressComponents.find((component: any) =>
        component.types.includes("postal_code"),
      )?.long_name || "";
    const city =
      addressComponents.find(
        (component: any) =>
          component.types.includes("locality") ||
          component.types.includes("sublocality"),
      )?.long_name || "";
    const address = data.result.formatted_address || "";

    return {
      latitude: location.lat,
      longitude: location.lng,
      state,
      country,
      zipCode,
      city,
      address,
    };
  } catch (error) {
    console.error("Error fetching location details:", error);
    return null;
  }
};

export const reserveGeo = async (lat: any, lng: any) => {
  try {
    const res = await axiosInstance.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.EXPO_PUBLIC_GOOGLE_AUTOCOMPLETE_KEY}`,
    );
    const response = res.data;
    if (response.results && response.results.length > 0) {
      // Assuming you want the first result's formatted address
      const formattedAddress = response.results[0].formatted_address;
      return formattedAddress;
    } else {
      console.error("No results found.");
    }
  } catch (error) {
    throw error;
  }
};
