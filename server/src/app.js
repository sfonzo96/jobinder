import express from "express";
import setupAplication from "./setups/appSetup.js";
import setupDb from "./setups/dbSetup.js";
import setupWebSocket from "./setups/wsSetup.js";
import getEnvironment from "./config/envConfig.js";
import passportConfig from "./config/passportConfig.js";

async function startServer() {
    const app = express();
    const env = getEnvironment();

    try {
        const isSuccessfulConnection = await setupDb(); // Comment: Confirma e inicia conexión a db
        if (!isSuccessfulConnection) {
            console.log("Finalizando servidor 😔. No se pudo conectar a la DB");
            return;
        }

        let server = await setupAplication(app); // Comment: Configura servidor http para renderizado de vista con hbs y algunos mid para peticiones http (para futuro)

        server = server.listen(env.PORT || 3000);
        if (!server) {
            throw new Error(
                "Finalizando servidor 😔. Ocurrio un error al iniciarlo."
            );
        }

        console.log(`Server running on port ${env.PORT || 3000} 🫡.`);

        const io = await setupWebSocket(server); // Comment: Configura servidor ws para comunicación en tiempo real

        // return server;
    } catch (error) {
        console.log(error);
        console.log("Error al iniciar el servidor:", error.message);
    }
}

startServer();
