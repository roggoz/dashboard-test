import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/TestLogo.svg';
import OverviewIcon from '../assets/Homeicon.svg';
import PatientsIcon from '../assets/Peopleicon.svg';
import ScheduleIcon from '../assets/Calendericon.svg';
import MessageIcon from '../assets/messageicon.svg';
import TransactionIcon from '../assets/Creditcardicon.svg';
import DoctorPhoto from '../assets/doctor.png';
import SettingsIcon from '../assets/settings.svg';
import MoreIcon from '../assets/more.svg';

const NavBar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-logo'>
        <Link to="/">
          <img src={logo} alt='Logo'></img>
        </Link>
      </div>
      <ul className='navbar-menu'>
        <li><Link to="/"><img src={OverviewIcon} alt='Overview' className='icon'/>Overview</Link></li>
        <li><Link to="/patients"><img src={PatientsIcon} alt='Patients' className='icon'/>Patients</Link></li>
        <li><Link to="/schedule"><img src={ScheduleIcon} alt='Schedule' className=' icon' />Schedule</Link></li>
        <li><Link to="/message"><img src={MessageIcon} alt='Message' className='icon'/>Message</Link></li>
        <li><Link to="/transaction"><img src={TransactionIcon} alt='Transaction' className='icon'/>Transaction</Link></li>
      </ul>
      <div className='doctor-info'>
        <img src={DoctorPhoto} alt='Doctor' className='doc-photo' />
        <ul className='doctor-details'>
          <li className='doctor-name'>Dr. Jose Simmons</li>
          <li className='doctor-title'>General Practitioner</li>
        </ul>
      </div>
      <div className='xtra'>
        <p><img src={SettingsIcon} alt='settings' className='settings-icon'></img></p>
        <p><img src={MoreIcon} alt='more' className='more-icon'></img></p>
      </div>
    </nav>
  );
};

export default NavBar;
