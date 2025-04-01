import React from 'react';
import { MoreHorizontal, Search } from 'lucide-react';

const PatientList = ({ patients, selectedPatient, onSelectPatient }) => {
    return (
        <div className="bg-white rounded-2xl shadow">
            <div className="py-6 pl-2">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-extrabold pl-4">Patients</h2>
                    <button className="p-1 rounded-full hover:bg-gray-100 mr-2">
                        <Search size={18} />
                    </button>
                </div>

                <div className="max-h-[60rem] flex-1 overflow-y-auto">
                    <div className="space-y-1">
                        {patients?.map((patient) => (
                            <div
                                key={patient.name}
                                className={`flex items-center justify-between p-3 rounded-lg cursor-pointer ${selectedPatient?.name === patient.name ? 'bg-[#D8FCF7]' : 'hover:bg-gray-50'
                                    }`}
                                onClick={() => onSelectPatient(patient)}
                            >
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={patient.profile_picture || "/api/placeholder/40/40"}
                                        alt={patient.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="font-bold text-sm">{patient.name}</div>
                                        <div className="text-gray-500 text-sm">
                                            {patient.gender}, {patient.age}
                                        </div>
                                    </div>
                                </div>
                                <button className="p-1 rounded-full hover:bg-gray-200">
                                    <MoreHorizontal size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientList;