import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import { Download } from 'lucide-react';
import BloodPressureChart from './components/BloodPressureChart';
import heartBPM from './assets/HeartBPM.png';
import temperature from './assets/temperature.png';
import respiratory from './assets/respiratory rate.png';
import PatientList from './components/PatientList';
import calendar from './assets/BirthIcon.png';
import female from './assets/FemaleIcon.png';
import phone from './assets/PhoneIcon.png';
import insurance from './assets/InsuranceIcon.png';


function App() {
  const [patients, setPatients] = useState([]);
  const [patientData, setPatientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const credentials = btoa('coalition:skills-test');
        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
          headers: {
            'Authorization': `Basic ${credentials}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log("Patient Data: ", data);
        setPatients(data);

        const jessicaData = data.find(patient => patient.name === 'Jessica Taylor');
        setSelectedPatient(jessicaData);
        const dateOfBirth = new Date(jessicaData.date_of_birth);
        const monthName = dateOfBirth.toLocaleString('default', { month: 'long' });
        const day = dateOfBirth.getDate();
        const year = dateOfBirth.getFullYear();


        setFormattedDate(`${monthName} ${day}, ${year}`);
        setPatientData(jessicaData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className='bg-gray-50'>
      <Navigation />
      <div className="flex">
        {/* Left Sidebar */}
        <div className='pt-4 pl-4 w-1/4'>
          <PatientList
            patients={patients}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 pt-4 px-6 w-2/4">
          <div className='bg-white rounded-2xl p-6 shadow mb-6'>
            {/* Blood Pressure Chart */}
            <div className="mb-6">
              <h1 className="text-2xl font-extrabold mb-6">Diagnosis History</h1>
              {patientData && patientData.diagnosis_history && (
                <BloodPressureChart diagnosisHistory={patientData.diagnosis_history} />
              )}
            </div>

            {/* Vital Signs Grid */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-[#E0F3FA] p-6 rounded-xl">
                <div className='flex items-center mb-2'>
                  <img src={respiratory} alt="Respiratory Rate" />
                </div>
                <div className="text-base font-medium pt-4">Respiratory Rate</div>
                <div className="text-3xl font-extrabold">
                  {patientData?.diagnosis_history?.[0]?.respiratory_rate?.value + " bpm"}
                </div>
                <div className="text-sm pt-4">{patientData?.diagnosis_history?.[0]?.respiratory_rate?.levels}</div>
              </div>

              <div className="bg-[#FFE6E9] p-6 rounded-xl">
                <div className="flex items-center mb-2">
                  <img src={temperature} alt="Temperature" />
                </div>
                <div className="text-base font-medium pt-4">Temperature</div>
                <div className="text-3xl font-extrabold">
                  {patientData?.diagnosis_history?.[0]?.temperature?.value + " °F"}
                </div>
                <div className="text-sm pt-4">{patientData?.diagnosis_history?.[0]?.temperature?.levels}</div>
              </div>

              <div className="bg-[#FFE6F1] p-6 rounded-xl">
                <div className="flex items-center mb-2">
                  <img src={heartBPM} alt="Heart Rate" />
                </div>
                <div className="text-base font-medium pt-4">Heart Rate</div>
                <div className="text-3xl font-extrabold">
                  {patientData?.diagnosis_history?.[0]?.heart_rate?.value + " bpm"}
                </div>
                <div className="text-sm pt-4">
                  {patientData?.diagnosis_history?.[0]?.heart_rate?.levels?.includes('Higher') ? (
                    <span className="mr-1">▲</span>
                  ) : (
                    <span className="mr-1">▼</span>
                  )}{patientData?.diagnosis_history?.[0]?.heart_rate?.levels}
                </div>
              </div>
            </div>
          </div>

          {/* Diagnostic List */}
          <div className="bg-white p-6 rounded-2xl shadow mb-6">
            <h3 className="text-2xl font-extrabold mb-8">Diagnostic List</h3>
            <table className="w-full">
              <thead className='bg-[#F6F7F8]'>
                <tr className='text-left'>
                  <th className="pl-4 py-4 first:rounded-l-3xl w-1/4">Problem/Diagnosis</th>
                  <th className="w-2/4 py-4 pl-4">Description</th>
                  <th className="pr-4 py-4 last:rounded-r-3xl w-1/6">Status</th>
                </tr>
              </thead>
            </table>
            <div className="max-h-44 overflow-y-auto">
              <table className="w-full">
                <tbody>
                  {patientData?.diagnostic_list?.map((diagnosis) => (
                    <tr key={diagnosis.name} className="border-b border-gray-100">
                      <td className="py-4 pl-4 w-1/4">{diagnosis.name}</td>
                      <td className="py-4 pl-4 w-2/4">{diagnosis.description}</td>
                      <td className="py-4 pl-2 w-1/6">{diagnosis.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Patient Info */}
        <div className="pt-4 pr-4 w-1/4">
          <div className="w-full bg-white p-6 rounded-2xl shadow">
            <div className="text-center mb-6">
              <img
                src={patientData?.profile_picture || "/api/placeholder/120/120"}
                alt="Patient"
                className="w-[200px] h-[200px] rounded-full mx-auto mb-4"
              />
              <h2 className="text-2xl font-extrabold">{patientData.name}</h2>
            </div>

            <div className="space-y-8">
              <div className='flex'>
                <img src={calendar} alt='calendar' className='rounded-full w-12 h-12 bg-[#F6F7F8]'/>
                <div className='pl-4'>
                  <h3 className="text-sm">Date Of Birth</h3>
                  <p className="font-bold">{formattedDate}</p>
                </div>
              </div>
              <div className='flex'>
                <img src={female} alt='femaleIcon' className='rounded-full w-12 h-12 bg-[#F6F7F8]'/>
                <div className='pl-4'>
                  <h3 className="text-sm">Gender</h3>
                  <p className="font-bold">{patientData.gender}</p>
                </div>
              </div>
              <div className='flex'>
                <img src={phone} alt='phoneIcon' className='rounded-full w-12 h-12 bg-[#F6F7F8]'/>
                <div className='pl-4'>
                  <h3 className="text-sm">Contact Info</h3>
                  <p className="font-bold">{patientData.phone_number}</p>
                </div>
              </div>
              <div className='flex'>
                <img src={phone} alt='phoneIcon' className='rounded-full w-12 h-12 bg-[#F6F7F8]'/>
                <div className='pl-4'>
                  <h3 className="text-sm">Emergency Contacts</h3>
                  <p className="font-bold">{patientData.emergency_contact}</p>
                </div>
              </div>
              <div className='flex'>
                <img src={insurance} alt='insuranceIcon' className='rounded-full w-12 h-12 bg-[#F6F7F8]'/>
                <div className='pl-4'>
                  <h3 className="text-sm">Insurance Provider</h3>
                  <p className="font-bold">{patientData.insurance_type}</p>
                </div>
              </div>
            </div>

            <div className='justify-self-center mt-10 mb-2'>
              <button className="bg-[#01F0D0] text-black font-bold py-3 px-12 rounded-[42px]">
                Show All Information
              </button>
            </div>
          </div>

          {/* Lab Results */}
          <div className="bg-white p-6 rounded-2xl mt-8 shadow">
            <h3 className="text-2xl font-extrabold mb-4">Lab Results</h3>
            <div className="max-h-36 overflow-y-auto space-y-2">
              {patientData.lab_results.map((test) => (
                <div key={test} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                  <span>{test}</span>
                  <Download size={20} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
