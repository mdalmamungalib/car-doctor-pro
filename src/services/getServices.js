export const getServices = async () => {
    try {
      const res = await fetch("http://localhost:3000/services/api/get-all");
      if (!res.ok) {
        throw new Error("Failed to fetch services");
      }
      const services = await res.json();
      return services;
    } catch (error) {
      console.error("Error fetching services:", error);
      return { error: error.message };
    }
  };
  
  export const getServiceDetail = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/services/api/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch service detail");
      }
      const service = await res.json();
      return service;
    } catch (error) {
      console.error("Error fetching service detail:", error);
      return { error: error.message };
    }
  };
  