import axios from "axios";

// Get all locations
export const getLocations = async () => {
    let response = await axios
        .get("/api/locations/get-all");

    return response.data;
};