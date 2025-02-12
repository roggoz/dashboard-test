import React, { useEffect, useState } from "react";
import axios from 'axios';
import SearchIcon from './assets/search.svg';
import Birthicon from './assets/BirthIcon.svg';
import PhoneIcon from './assets/PhoneIcon.svg';
import InsuranceIcon from './assets/InsuranceIcon.svg'
import MaleIcon from './assets/MaleIcon.svg';
import FemaleIcon from './assets/FemaleIcon.svg';
import BloodPressureChart from "./BloodPressureChart";
import RespiratoryIcon from './assets/Respiratory.svg';
import TemperatureIcon from './assets/Temperature.svg';
import HeartIcon from './assets/Heart.svg';
import DownloadIcon from './assets/download.svg'
import HorizontalIcon from './assets/horizontalicon.svg'
import ExpandIcon from './assets/expand.svg'

const Patient = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const username = 'coalition';
            const password = 'skills-test';
            const token = btoa(`${username}:${password}`);

            try {
                const response = await axios.get('https://fedskillstest.coalitiontechnologies.workers.dev', {
                    headers:{
                        'Authorization': `Basic ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                setData(response.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredData = data.filter(person =>
        person.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectPatient = (patient) => {
        setSelectedPatient(patient);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <><div /><div className="side-list">
            <div className="side-list-top">
                <p className="patients">Patients</p>

                <img src={SearchIcon} alt="search" className="search-icon" />

            </div>
           
           
            <div className="ptn-list">
            {filteredData.length > 0 ? (
                filteredData.map((person, index) => (
                    <div key={index} onClick={() => selectPatient(person)} className="patient-list">
                        <img src={person.profile_picture} alt={`${person.name}'s profile`} className="patient-photo" />

                        <ol>
                            <li className="patient-name"><p>{person.name}</p></li>
                            <li className="patient-details"><p>{person.gender}, {person.age}</p></li>
                        </ol>
                        <span><img src={HorizontalIcon} alt="horizontal" className="hrz" /></span>

                        


                    </div>
                ))
            ) : (
                <p>No results found</p>
            )}
            </div>

            </div>

            {selectedPatient && (
                <div className="patient-card">
                    <img src={selectedPatient.profile_picture} alt={`${selectedPatient.name}'s profile`} className="patient-card-photo" />
                    <h2>{selectedPatient.name}</h2>
                    <div className="patient-detail">
                        <img src={Birthicon} alt="birthicon" className="card-icon" />
                        <div className="detail-text">
                            <p>Date of birth</p>
                            <span>{selectedPatient.date_of_birth}</span>
                        </div>
                    </div>
                    <div className="patient-detail">
                        <img src={selectedPatient.gender === 'Male' ? MaleIcon : FemaleIcon} alt="gendericon" className="card-icon" />
                        <div className="detail-text">
                            <p>Gender</p>
                            <span>{selectedPatient.gender}</span>
                        </div>
                    </div>
                    <div className="patient-detail">
                        <img src={PhoneIcon} alt="phoneicon" className="card-icon" />
                        <div className="detail-text">
                            <p>Contact Info</p>
                            <span>{selectedPatient.phone_number}</span>
                        </div>
                    </div>
                    <div className="patient-detail">
                        <img src={PhoneIcon} alt="phoneicon" className="card-icon" />
                        <div className="detail-text">
                            <p>Emergency contacts</p>
                            <span>{selectedPatient.emergency_contact}</span>
                        </div>
                    </div>
                    <div className="patient-detail">
                        <img src={InsuranceIcon} alt="insuranceicon" className="card-icon" />
                        <div className="detail-text">
                            <p>Insurance provider</p>
                            <span>{selectedPatient.insurance_type}</span>
                        </div>
                    </div>
                    <button><p className="btn">Show All Information</p></button>
                </div>
            )}


            {selectedPatient && (
                <div className="midpart">
                    <h2>Diagnosis History</h2>
                    <div className="cht">
                    {selectedPatient.diagnosis_history && Array.isArray(selectedPatient.diagnosis_history) ? (
                        <><h2>Blood Pressure</h2>
                        <p>Last 6 months <img src={ExpandIcon} className="exp" /></p>
                        <span className="graph"><BloodPressureChart bloodPressureData={selectedPatient.diagnosis_history} /></span></>
                        ) : (
                            <p>No blood pressure data available</p>
                    )}
                    </div>
                    
                            


                    <div className="rate-icons">
                    
                    <div className="respiratory-space">
                        <img src={RespiratoryIcon} alt="respiratoryicon" className="icon-rate" />
                        <p className="rate-heading">Respiratory Rate</p>
                        {selectedPatient.diagnosis_history && (
                            <><p className="value-heading">{selectedPatient.diagnosis_history[0].respiratory_rate.value} bpm</p>
                            <p className="level-heading">{selectedPatient.diagnosis_history[0].respiratory_rate.levels}</p></>                   
                        )}        
                    </div>

                    <div className="temperature-space">
                        <img src={TemperatureIcon} alt="temperatureicon" className="icon-rate" />
                        <p className="rate-heading">Temperature</p>
                        {selectedPatient.diagnosis_history && (
                            <><p className="value-heading">{selectedPatient.diagnosis_history[0].temperature.value}&deg;F</p>
                            <p className="level-heading">{selectedPatient.diagnosis_history[0].temperature.levels}</p></>
                        )}
                    </div>

                    <div className="heart-space">
                        <img src={HeartIcon} alt="hearticon" className="icon-rate" />
                        <p className="rate-heading">Heart Rate</p>
                        {selectedPatient.diagnosis_history && (
                            <><p className="value-heading">{selectedPatient.diagnosis_history[0].heart_rate.value} bpm</p>
                            <p className="level-heading">{selectedPatient.diagnosis_history[0].heart_rate.levels}</p></>
                        )}
                    </div>

                    </div>
                </div>
            )}

            {selectedPatient && (
                <div className="lowerpart">
                    <h2>Diagnostic List</h2>
                    <div className="lower-mid">
                        <p style={{marginLeft: '16px'}}>Problem/Diagnosis</p>
                        <p style={{marginLeft: '104px'}}>Description</p>
                        <p style={{marginLeft: '285px',marginRight: '67px'}}>Status</p>
                   </div>

                   <div className="low-low">
                    <div className="table-container">
                    <table className="diagnostic-table">
                        
                        <tbody>
                            {selectedPatient.diagnostic_list.map((diagnostic, index) => (
                                <tr key={index} className="diagnostic-item">
                                <td className="diagnostic-name">{diagnostic.name}</td>
                                <td className="diagnostic-description">{diagnostic.description}</td>
                                <td className="diagnostic-status">{diagnostic.status}</td>
                                </tr>
                            ))} 
                        </tbody>
                    </table>
                    </div>
                    </div>


                </div>

            )}

            {selectedPatient && (
                <div className="lab">
                    <h2>Lab Results</h2>
                    <div className="find">
                    {selectedPatient.lab_results.map((results, index) => (
                        <div className="findings" key={index}>
                            <p>{results}</p><img src={DownloadIcon} alt="download" className="downloader"/>
                        </div>
                    ))
                    }
                    </div>
                </div>
            )}

            

        
            
        </>
        
    );
};

export default Patient;
