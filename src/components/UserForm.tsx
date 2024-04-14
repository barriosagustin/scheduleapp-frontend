import React, { useState } from "react";
import { TextField, Button, TextareaAutosize } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarToday } from "@mui/icons-material";
import CountrySelect from "./CountrySelect"; // Import the CountrySelect component
import "../styles/UserFormStyles.css"; // Import CSS file directly

const UserForm = () => {
  const initialFormData = {
    name: "",
    lastname: "",
    cellphone: "",
    email: "",
    country: "",
    current_country: "",
    start_date: null,
    // notes: ""
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Date | null, type: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [type]: date,
    }));
  };

  const handleCountryChange = (selectedCountry: any) => {
    setFormData((prevData) => ({
      ...prevData,
      country: selectedCountry,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("https://scheduleapp-api.vercel.app/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Si la respuesta es exitosa, haz lo que necesites hacer
        setFormData(initialFormData);
        console.log("Datos enviados correctamente");
      } else {
        // Si hay algún problema con la solicitud
        console.error("Error al enviar los datos");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        name="name"
        label="First Name"
        variant="outlined"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        name="lastname"
        label="Last Name"
        variant="outlined"
        value={formData.lastname}
        onChange={handleChange}
        required
      />
      <TextField
        name="cellphone"
        label="Phone Number"
        variant="outlined"
        value={formData.cellphone}
        onChange={handleChange}
        type="tel"
        required
      />
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={formData.email}
        onChange={handleChange}
        type="email"
        required
      />
      <CountrySelect handleCountryChange={handleCountryChange} />      
      <TextField
        name="current_country"
        label="Current country"
        variant="outlined"
        value={formData.current_country}
        onChange={handleChange}
        required
      />
      <div className="date-picker-container">
        <DatePicker
          selected={formData.start_date}
          onChange={(date) => handleDateChange(date, "start_date")}
          dateFormat="MM/dd/yyyy"
          placeholderText="Start Date"
          customInput={
            <TextField
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: <CalendarToday />,
              }}
            />
          }
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default UserForm;
