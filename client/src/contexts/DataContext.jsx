import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchAPI } from "../utils/fetchAPI.js";
import { useSnackbar } from "notistack";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
    const [skills, setSkills] = useState([]);
    const [seniorities, setSeniorities] = useState([]);
    const [IsDataLoading, setIsDataLoading] = useState(true);
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const skillsResponse = await fetchAPI("/skills", "GET");
                const senioritiesResponse = await fetchAPI(
                    "/seniorities",
                    "GET"
                );

                if (!skillsResponse.success) {
                    enqueueSnackbar(
                        "Ocurrió un error al cargar las habilidades.",
                        {
                            variant: "error",
                        }
                    );
                }
                setSkills(
                    skillsResponse.data.skills.map((skill) => skill.name)
                );

                if (!senioritiesResponse.success) {
                    enqueueSnackbar(
                        "Ocurrió un error al cargar las seniorities.",
                        {
                            variant: "error",
                        }
                    );
                }
                setSeniorities(
                    senioritiesResponse.data.seniorities.map(
                        (seniority) => seniority.name
                    )
                );
            } catch (error) {
                enqueueSnackbar(error.message, { variant: "error" });
            } finally {
                setIsDataLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <DataContext.Provider value={{ skills, IsDataLoading, seniorities }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
