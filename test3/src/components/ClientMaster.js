import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Input from './input';
import Label from './label';
import Tetarea from './txtarea' 
import Button from './button'

const ClientMaster=({ mode })=>{
    const { id } = useParams();
    const [formError,setFormError] = useState("")
    const [companyName, setCompanyName] = useState(''); 
    const [clientCode, setClientCode] = useState('');
    const [address, setAdress] = useState('');
    const [area, setArea] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [contactPerson, setContectPerson] = useState('');
    const [transporter, setTransporter] = useState('');
    const [agentName, setAgentName] = useState('');
    const [gstNo, setGstNo] = useState('');
    const [gstError, setGstError] = useState('');
    const [pinCode, setpinCode] = useState('');
    const [pinCodeError, setpinCodeError] = useState('');
    const [distance, setDistance] = useState('');
    const [distanceError, setDistanceError] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [emailId, setEmailId] = useState('');
    const [emailIdError, setEmailIdError] = useState('');
    const [website, setWebsite] = useState('');
    const [websiteError, setWebsiteError] = useState('');
    const [panNo, setPanNo] = useState('');
    const [panError, setPanError] = useState('');
    const [aadharNo, setAadharNo] = useState('');
    const [aadharError, setAadharError] = useState('');
    const [agentComm, setAgentComm] = useState('');
    const [agentCommError, setAgentCommError] = useState('');
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://192.168.1.250:3004/client/sendDetails/${id}`);
                const data = await response.json();
                setGstNo(data.gstNo);
                setCompanyName(data.companyName);
                setClientCode(data.clientCode);
                setAdress(data.address);
                setArea(data.area);
                setpinCode(data.pinCode);
                setCity(data.city);
                setState(data.state);
                setCountry(data.country);
                setDistance(data.distance);
                setContectPerson(data.contactPerson);
                setMobileNo(data.mobileNo);
                setEmailId(data.emailId);
                setWebsite(data.website);
                setPanNo(data.panNo);
                setAadharNo(data.aadharNo);
                setTransporter(data.transporter);
                setAgentName(data.agentName);
                setAgentComm(data.agentComm);
            } 
            catch (error) {
                console.error('Error fetching client data:', error);
            }
        };
        fetchData();
    }, [id]);

    const handelreset = ()=>{
        console.log("reset")
        setGstNo('');
        setCompanyName('');
        setClientCode('');
        setAdress('');
        setArea('');
        setpinCode('');
        setCity('');
        setState('');
        setCountry('');
        setDistance('');
        setContectPerson('');
        setMobileNo('');
        setEmailId('');
        setWebsite('');
        setPanNo('');
        setAadharNo('');
        setTransporter('');
        setAgentName('');
        setAgentComm('');
        setGstError('');
        setpinCodeError('');
        setDistanceError('');
        setMobileError('');
        setEmailIdError('');
        setWebsiteError('');
        setPanError('');
        setAadharError('');
        setAgentCommError('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (gstError !== '' || pinCodeError !== '' || distanceError !== '' || mobileError !== '' || emailIdError !== '' || websiteError !== '' || panError !== '' || aadharError !== '' || agentCommError !== '') 
        {
                setFormError('*OOPS! Fill data properly.');
        }
        else 
        {
            setFormError('')
            try {
                if (mode === 'add') {
                    await axios.post('http://192.168.1.250:3004/client/insert',{ gstNo,companyName,clientCode,address,area,pinCode,city,state,country,distance,contactPerson,mobileNo,emailId,website,panNo,aadharNo,transporter,agentName,agentComm });
                    setGstNo('');
                    setCompanyName('');
                    setClientCode('');
                    setAdress('');
                    setArea('');
                    setpinCode('');
                    setCity('');
                    setState('');
                    setCountry('');
                    setDistance('');
                    setContectPerson('');
                    setMobileNo('');
                    setEmailId('');
                    setWebsite('');
                    setPanNo('');
                    setAadharNo('');
                    setTransporter('');
                    setAgentName('');
                    setAgentComm('');
                } 
                else if (mode === 'edit') {
                    await axios.put(`http://192.168.1.250:3004/client/Update/${id}`, { gstNo,companyName,clientCode,address,area,pinCode,city,state,country,distance,contactPerson,mobileNo,emailId,website,panNo,aadharNo,transporter,agentName,agentComm });
                }
                alert(mode === 'add' ? 'Data inserted successfully' : 'Data updated successfully');
            } 
            catch (error) {
                console.error('Error inserting/updating data:', error);
                alert(`Error ${mode === 'add' ? 'inserting' : 'updating'} data`);
            }
        };
    }

    // function to check valid gst No .................................................................

    const validateGST = (inputValue) => {
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
        if (!inputValue) {
            setGstError('');
        }
        else if (!gstRegex.test(inputValue)) {
        setGstError('Invalid GST No');
        } 
        else {
        setGstError('');
        }
    };
    const handleBlurGst = (e) => {
        const inputValue = e.target.value.trim();
        validateGST(inputValue);
    };

    // function to check valid pinCode code No.............................................................
    
    const validpinCode = (inputValue) => {
        const pinCodeRegex = /^\d{6}$/;
        if (!inputValue) {
            setpinCodeError('');
        }
        else if (!pinCodeRegex.test(inputValue)) {
        setpinCodeError('Invalid pinCode No');
        } 
        else {
        setpinCodeError('');
        }
    };
    const handleBlurpinCode = (e) => {
        const inputValue = e.target.value.trim();
        validpinCode(inputValue);
    };

    //function to check valid distance .....................................................................

    const validDistance = (inputValue) => {
        const distanceRegex = /^\d*\.?\d+$/;
        if (!inputValue) {
            setDistanceError('');
        }
        else if (!distanceRegex.test(inputValue)) {
        setDistanceError('Please enter distance in positive');
        } 
        else {
        setDistanceError('');
        }
    };
    const handleBlurDistance = (e) => {
        const inputValue = e.target.value.trim();
        validDistance(inputValue);
    };

    //function to check mobile no.......................................................................

    const validMobile = (inputValue) => {
        const mobileRegex = /^\d{10}$/;
        if (!inputValue) {
            setMobileError('');
        }
        else if (!mobileRegex.test(inputValue)) {
        setMobileError('Invalid mobile No');
        } 
        else {
        setMobileError('');
        }
    };
    const handleBlurMobile = (e) => {
        const inputValue = e.target.value.trim();
        validMobile(inputValue);
    };

    //function to check emailId.......................................................................
   
    const validemailId = (inputValue) => {
        const emailIdRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!inputValue) {
            setEmailIdError('');
        }
        else if (!emailIdRegex.test(inputValue)) {
        setEmailIdError('Invalid emailId Address');
        } 
        else {
        setEmailIdError('');
        }
    };
    const handleBluremailId = (e) => {
        const inputValue = e.target.value.trim();
        validemailId(inputValue);
    };

    //function to check website............................................................................

    const validWebsite = (inputValue) => {
        const webRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/;
        if (!inputValue) {
            setWebsiteError('');
        }
        else if (!webRegex.test(inputValue)) {
        setWebsiteError('Invalid Website Adress');
        } 
        else {
        setWebsiteError('');
        }
    };
    const handleBlurWebsite = (e) => {
        const inputValue = e.target.value.trim();
        validWebsite(inputValue);
    };

    //function to check panNo..........................................................................

    const validpan = (inputValue) => {
        const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
        if (!inputValue) {
            setPanError('');
        }
        else if (!panRegex.test(inputValue)) {
        setPanError('Invalid Pancard No');
        } 
        else {
        setPanError('');
        }
    };
    const handleBlurPan = (e) => {
        const inputValue = e.target.value.trim();
        validpan(inputValue);
    };

    //function to check  aadhar No.......................................................................
    
    const validadhar = (inputValue) => {
        const adharRegex = /^\d{12}$/;
        if (!inputValue) {
            setAadharError('');
        }
        else if (!adharRegex.test(inputValue)) {
        setAadharError('Invalid Aadharcard No');
        } 
        else {
        setAadharError('');
        }
    };
    const handleBlurAadhar = (e) => {
        const inputValue = e.target.value.trim();
        validadhar(inputValue);
    };

    //function to check agent Commition..................................................................

    const validComm = (inputValue) => {   
        if (!inputValue) {
            setAgentCommError('');
        }
        else if (inputValue <= 0 || inputValue >= 100) {
            setAgentCommError('Please enter commition between 1% to 100%');
        
        } 
        else {
            setAgentCommError('');
        }
    };
    const handleBlurComm = (e) => {
        const inputValue = e.target.value.trim();
        validComm(inputValue);
    };

    return (
    <>
        <form method="post" onSubmit={handleSubmit} className="bg-[#F0F8FF] border-blue-200 shadow-lg flex flex-col  w-full py-4 gap-4">
        <div className="flex w-full flex-col md:flex-row justify-center md:gap-16 p-4 md:p-0">
        <div className="flex flex-col md:w-2/5 gap-2 items-center ">
            <div className="flex w-full items-center">
                <Label val="GST No" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                    type="text"
                    maxl={15}
                    id="txt_gstNo"
                    value={gstNo}
                    onChange={(e) => setGstNo(e.target.value)}
                    onBlur={handleBlurGst}
                    r={false}
                />
                {gstError && <span className="text-red-500 text-xs">{gstError}</span>}
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Company Name" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  maxl={100}
                  id="txt_companyname"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  r={true}
                />
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Client Code" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  maxl={6}
                  id="txt_clientcode"
                  value={clientCode}
                  onChange={(e) => setClientCode(e.target.value)}
                  r={false}
                />
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Address" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Tetarea
                    id="txt_Address" 
                    maxl={500}
                    value={address}
                    onChange={(e) => setAdress(e.target.value)}
                    r={false}
                />
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Area" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  maxl={50}
                  id="txt_area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  r={false}
                />
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Pincode" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                type="text"
                maxl={6}
                id="txt_pinCode"
                value={pinCode}
                onChange={(e) => setpinCode(e.target.value)}
                onBlur={handleBlurpinCode}
                r={false}
                />
                {pinCodeError && <span className="text-red-500 text-xs">{pinCodeError}</span>}
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="City" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  maxl={50}
                  id="txt_city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  r={false}
                />
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="State" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  maxl={50}
                  id="txt_state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  r={false}
                />
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Country" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  maxl={50}
                  id="txt_Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  r={false}
                />
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Distance(km)" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                type="text"
                id="txt_distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                onBlur={handleBlurDistance}
                r={false}
                />
                {distanceError && <span className="text-red-500 text-xs">{distanceError}</span>}
                </div>
            </div>
        </div>
        <div className="flex flex-col md:w-2/5 gap-2 items-center">
            <div className="flex w-full items-center">
                <Label val="Contact Person" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  maxl={100}
                  id="txt_Contectperson"
                  value={contactPerson}
                  onChange={(e) => setContectPerson(e.target.value)}
                  r={true}
                />
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Mobile No." w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                type="text"
                maxl={10}
                id="txt_mobileno"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
                onBlur={handleBlurMobile}
                r={true}
                />
                {mobileError && <span className="text-red-500 text-xs">{mobileError}</span>}
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="email" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                type="email"
                maxl={150}
                id="txt_emailId"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                onBlur={handleBluremailId}
                r={false}
                />
                {emailIdError && <span className="text-red-500 text-xs">{emailIdError}</span>}
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Website" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                type="text"
                maxl={100}
                id="txt_website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                onBlur={handleBlurWebsite}
                r={false}
                />
                {websiteError && <span className="text-red-500 text-xs">{websiteError}</span>}
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Pancard No" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                type="text"
                maxl={10}
                id="txt_pan"
                value={panNo}
                onChange={(e) => setPanNo(e.target.value)}
                onBlur={handleBlurPan}
                r={false}
                />
                {panError && <span className="text-red-500 text-xs">{panError}</span>}
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Adharcard No" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                type="text"
                maxl={12}
                id="txt_adhar"
                value={aadharNo}
                onChange={(e) => setAadharNo(e.target.value)}
                onBlur={handleBlurAadhar}
                r={false}
                />
                {aadharError && <span className="text-red-500 text-xs">{aadharError}</span>}
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Transporter" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  maxl={100}
                  id="txt_transporter"
                  value={transporter}
                  onChange={(e) => setTransporter(e.target.value)}
                  r={false}
                />
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Agent Name" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  id="txt_Agent"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  r={false}
                />
                </div>
            </div>
            <div className="flex w-full items-center">
                <Label val="Agent Comm(%)" w="w-2/5"/>
                <div className="flex flex-col w-3/5 ">
                <Input
                type="number"
                id="txt_AComm"
                value={agentComm}
                onChange={(e) => setAgentComm(e.target.value)}
                onBlur={handleBlurComm}
                r={false}
                />
                {agentCommError && <span className="text-red-500 text-xs">{agentCommError}</span>}
                </div>
            </div>
        </div>
        </div>
        {formError && <span className="text-red-500 font-semibold text-center">{formError}</span>}
        <div className="flex item-center justify-center gap-6">
            
                <Button type="submit" val={mode === 'add' ? 'Save' : 'Update'}/>
            
            <Link to="/" className="flex w-fit ">
                <Button type="reset"  val="Cancel" onclick={handelreset} />
            </Link>
        </div>
        </form>
    </>
  )
}

export default ClientMaster