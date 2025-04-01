import React from 'react';
import { Home, Users, Calendar, MessageSquare, CreditCard, Settings, MoreVertical } from 'lucide-react';
import testLogo from '../assets/TestLogo.png';
import practitioner from '../assets/practitioner.png';

const Navigation = () => {
    return (
        <div className="p-[18px]">
            <nav className="w-[100%] bg-white rounded-[70px] flex items-center justify-between px-6 py-2">
                <div className="flex items-center space-x-8">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center mt-30 ml-50">
                            <img src={testLogo} alt="Tech.Care" />'
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <NavItem icon={<Home size={20} />} label="Overview" />
                    <NavItem icon={<Users size={20} />} label="Patients" active />
                    <NavItem icon={<Calendar size={20} />} label="Schedule" />
                    <NavItem icon={<MessageSquare size={20} />} label="Message" />
                    <NavItem icon={<CreditCard size={20} />} label="Transactions" />
                </div>

                <div className="flex items-center">
                    <div className='flex space-x-2'>
                        <img
                            src={practitioner}
                            alt="Dr. Jose Simmons"
                            className="rounded-full"
                        />
                        <div className="text-right">
                            <div className="font-bold">Dr. Jose Simmons</div>
                            <div className="text-sm text-gray-500">General Practitioner</div>
                        </div>
                    </div>
                    <div className="border-r h-8 border-gray-200 px-2"></div>
                    <button className="pl-2 hover:bg-gray-100 rounded-full">
                        <Settings size={20} />
                    </button>
                    <button className="hover:bg-gray-100 rounded-full">
                        <MoreVertical size={20} />
                    </button>
                </div>
            </nav>
        </div>
    );
};

const NavItem = ({ icon, label, active }) => {
    return (
        <button
            className={`flex items-center space-x-2 px-4 py-2 rounded-full ${active ? 'bg-[#01F0D0]' : 'hover:bg-gray-100'
                }`}
        >
            {icon}
            <span className='font-bold'>{label}</span>
        </button>
    );
};


export default Navigation;