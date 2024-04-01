import React, { useState } from "react";
import { TextField, Button, IconButton } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarToday } from "@mui/icons-material";
import "../styles/UserFormStyles.css"; // Import CSS file directly

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    startDate: null,
    endDate: null,
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <TextField
        name="firstName"
        label="First Name"
        variant="outlined"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <TextField
        name="lastName"
        label="Last Name"
        variant="outlined"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <TextField
        name="phoneNumber"
        label="Phone Number"
        variant="outlined"
        value={formData.phoneNumber}
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
      <div className="date-picker-container">
        <DatePicker
          selected={formData.startDate}
          onChange={(date) => handleDateChange(date, "startDate")}
          dateFormat="MM/dd/yyyy"
          placeholderText="Start Date"
          customInput={
            <TextField
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <CalendarToday />
                  </IconButton>
                ),
              }}
            />
          }
        />
      </div>
      <div className="date-picker-container">
        <DatePicker
          selected={formData.endDate}
          onChange={(date) => handleDateChange(date, "endDate")}
          dateFormat="MM/dd/yyyy"
          placeholderText="End Date"
          customInput={
            <TextField
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <CalendarToday />
                  </IconButton>
                ),
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
