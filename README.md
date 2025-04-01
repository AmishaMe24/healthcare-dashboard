# Healthcare Dashboard

A modern, responsive dashboard for healthcare professionals to monitor patient vital signs and medical history.

![image](https://github.com/user-attachments/assets/599cec31-22e7-408f-85b3-2e0b1db2ed95)

## Features

- **Patient Management**: View and select from a list of patients
- **Vital Signs Monitoring**: Track blood pressure, heart rate, respiratory rate, and temperature
- **Blood Pressure Visualization**: Interactive chart showing blood pressure trends over time
- **Diagnostic History**: View patient diagnosis history and status
- **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

- React.js
- Chart.js for data visualization
- Tailwind CSS for styling
- Lucide React for icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd healthcare-dashboard
 ```
```

2. Install dependencies
```bash
npm install
 ```

3. Start the development server
```bash
npm start
 ```

4. Open your browser and navigate to http://localhost:3000
## Project Structure
- /src : Source code
  - /components : React components
    - BloodPressureChart.js : Chart for visualizing blood pressure data
    - Navigation.js : Navigation component
    - PatientList.js : Component for displaying and selecting patients
  - /assets : Static assets like images
  - App.js : Main application component
## Usage
The dashboard displays patient information including:

- Blood pressure history with interactive time range selection
- Current vital signs (respiratory rate, temperature, heart rate)
- Diagnostic list with problem descriptions and status
- Patient personal information
## Data Structure
The application expects patient data in the following format:

```javascript
{
  name: "Patient Name",
  gender: "Gender",
  age: 28,
  profile_picture: "URL to profile picture",
  date_of_birth: "YYYY-MM-DD",
  phone_number: "Phone number",
  emergency_contact: "Emergency contact",
  insurance_type: "Insurance provider",
  diagnosis_history: [
    {
      month: "Month",
      year: YYYY,
      blood_pressure: {
        systolic: { value: 120, levels: "Normal" },
        diastolic: { value: 80, levels: "Normal" }
      },
      heart_rate: { value: 72, levels: "Normal" },
      respiratory_rate: { value: 16, levels: "Normal" },
      temperature: { value: 98.6, levels: "Normal" }
    }
  ],
  diagnostic_list: [
    {
      name: "Diagnosis name",
      description: "Description",
      status: "Status"
    }
  ]
}
 ```
```
