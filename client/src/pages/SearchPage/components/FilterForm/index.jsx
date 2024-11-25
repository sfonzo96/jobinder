import React from "react";
import { TextField, MenuItem, Autocomplete, Chip, Button } from "@mui/material";
import PropTypes from "prop-types";
import { useData } from "../../../../contexts/DataContext";
import Loader from "../../../../components/Loader";

const FilterForm = ({ filters, setFilters, clearFilters }) => {
    const { skills, seniorities, isDataLoading } = useData();
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return isDataLoading ? (
        <Loader />
    ) : (
        <>
            <TextField
                name="location"
                label="Ubicación"
                fullWidth
                margin="normal"
                value={filters.location}
                onChange={handleFilterChange}
            />
            <TextField
                name="position"
                label="Puesto de trabajo"
                fullWidth
                margin="normal"
                value={filters.position}
                onChange={handleFilterChange}
            />

            <TextField
                fullWidth
                select
                margin="normal"
                label="Seniority"
                name="seniority"
                value={filters.seniority}
                onChange={handleFilterChange}
            >
                {seniorities.map((level) => (
                    // <option key={level} value={level}>
                    // 	{level || "Cualquiera"} {/* Default placeholder for empty value */}
                    // </option>
                    <MenuItem key={level} value={level}>
                        {level || "Todas"}
                    </MenuItem>
                ))}
            </TextField>

            <Autocomplete
                multiple
                options={skills}
                getOptionLabel={(option) => option}
                value={filters.skills}
                onChange={(event, newValue) =>
                    setFilters((prev) => ({ ...prev, skills: newValue }))
                }
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => {
                        const { key, ...otherProps } = getTagProps({ index });
                        return (
                            <Chip key={option} label={option} {...otherProps} />
                        );
                    })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Habilidades"
                        margin="normal"
                        placeholder="Escribe o elige una habilidad"
                    />
                )}
            />
            <Button
                variant="outlined"
                color="error"
                fullWidth
                sx={{ mt: 2 }}
                onClick={clearFilters}
            >
                Remove Filters
            </Button>
        </>
    );
};

export default FilterForm;

FilterForm.propTypes = {
    filters: PropTypes.shape({
        location: PropTypes.string,
        position: PropTypes.string,
        seniority: PropTypes.string,
        skills: PropTypes.arrayOf(PropTypes.string),
    }),
    setFilters: PropTypes.func,
    clearFilters: PropTypes.func,
};
