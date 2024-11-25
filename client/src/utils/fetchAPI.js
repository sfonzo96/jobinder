const baseUrl = "http://localhost:8080/api"; // Comment: Mover a .env

export const fetchAPI = async (path, method = "GET", body = {}) => {
    try {
        const options = {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        };

        if (method !== "GET" && method !== "DELETE") {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${baseUrl}${path}`, options);
        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { success: false, message: error.message };
    }
};

// Comment: Este metodo podría unificarse con el anterior, solo difieren en headers.
export const fetchAPIFormData = async (path, method = "GET", body = {}) => {
    try {
        const options = {
            method,
            credentials: "include",
        };

        if (method !== "GET" && method !== "DELETE") {
            options.body = body;
        }
        console.log("options", options);
        const response = await fetch(`${baseUrl}${path}`, options);

        const data = await response.json();
        return data;
    } catch (error) {
        cconsole.error("Error fetching w formData:", error);
        return { success: false, message: error.message };
    }
};

export const fetchAvatarPic = async (path, method = "GET", body = {}) => {
    try {
        const options = {
            method,
            credentials: "include",
        };

        if (method !== "GET" && method !== "DELETE") {
            options.body = body;
        }

        const response = await fetch(`${baseUrl}${path}`, options);

        const data = await response.blob();
        const imageUrl = URL.createObjectURL(data);
        return imageUrl;
    } catch (error) {
        console.error("Error fetching avatar picture:", error);
        return { success: false, message: error.message };
    }
};
