import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Label from './label'
import Input from './input'
import Button from './button'

function ClientDetail() {
  const [data, setData] = useState([]);
  const [contactPersonSearchTerm, setContactPersonSearchTerm] = useState('');
  const [companyNameSearchTerm, setCompanyNameSearchTerm] = useState('');
  const [pinCodeSearchTerm, setpinCodeSearchTerm] = useState('');
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [stateSearchTerm, setStateSearchTerm] = useState('');
  const [countrySearchTerm, setCountrySearchTerm] = useState('');
  const [websiteSearchTerm, setWebsiteSearchTerm] = useState('');
  const [emailIdSearchTerm, setEmailIdSearchTerm] = useState('');
  const [mobileNoSearchTerm, setMobileNoSearchTerm] = useState('');
  const [resetFlag, setResetFlag] = useState(0);
  const [totalCount, setTotalCount] = useState(0); 
  const [offset, setOffset] = useState(0); 
  const [limit, setLimit] = useState(5); 
  const [selectAll, setSelectAll] = useState(false); 
  const [selectedRows, setSelectedRows] = useState([]); 

  useEffect(() => {
    fetchData();
    fetchTotalCount(); 
  }, [resetFlag, offset, limit]);

  const fetchData = async () => {
    try {
      // let apiUrl = `http://localhost:3001/data?offset=${offset}&limit=${limit}`;
      let apiUrl=`http://192.168.1.250:3004/client/search?offset=${offset}&limit=${limit}`
    
      if (resetFlag === 1) {
        setContactPersonSearchTerm('');
        setCompanyNameSearchTerm('');
        setpinCodeSearchTerm('');
        setCitySearchTerm('');
        setStateSearchTerm('');
        setCountrySearchTerm('');
        setWebsiteSearchTerm('');
        setEmailIdSearchTerm('');
        setMobileNoSearchTerm('');
        setOffset(0);
        setResetFlag(0);
        setSelectedRows([]); // Reset selected rows when Reset button is clicked
        setSelectAll(false); // Uncheck the select all checkbox
      }
      else {
        apiUrl += `&companyName=${companyNameSearchTerm}&contactPerson=${contactPersonSearchTerm}&mobileNo=${mobileNoSearchTerm}&EmailId=${emailIdSearchTerm}&website=${websiteSearchTerm}&pinCode=${pinCodeSearchTerm}&city=${citySearchTerm}&state=${stateSearchTerm}&country=${countrySearchTerm}`;
      }
      const response = await axios.get(apiUrl);
      if (offset === 0) {
        setData(response.data); 
        
      } else {
        setData(prevData => [...prevData, ...response.data]); 
      }
    } 
    
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTotalCount = async () => {
    try {
      const response = await axios.get('http://192.168.1.250:3004/client/count');
      setTotalCount(response.data);
    } 

    catch (error) {
      console.error('Error fetching total count:', error);
    }
  };
  
  const handleSearch = async () => {
    setOffset(0); 
    fetchData();
    fetchTotalCount();
  };
  
  const handleReset = async () => {
    setResetFlag(1);
  };
  
  const handleShowMore = () => {
    setOffset(prevOffset => prevOffset + limit);
  };
  
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allRowIds = data.map(item => item.id);
      setSelectedRows(allRowIds);
    } else {
      setSelectedRows([]);
    }
  };
  
  const handleRowSelect = (id) => {
    const isSelected = selectedRows.includes(id);
    if (isSelected) {
      setSelectedRows(prevSelectedRows => prevSelectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows(prevSelectedRows => [...prevSelectedRows, id]);
    }
  };
  
  const handleDeleteSelectedRows = async () => {
    try {
      console.log(selectedRows)
      const response = await axios.post('http://192.168.1.250:3004/client/delete', {
        userIds: selectedRows 
        
      });
      handleReset();
    } 
    catch (error) {
      console.error('Error deleting selected rows:', error);
    }
  };
  
  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const selectedClientId = selectedRows[0];
      return `/editClient/${selectedClientId}`;
    }
  };

  return (
    <>
      <div className="bg-[#F0F8FF]  flex flex-col  w-full py-4 gap-4">
        <div className="md:flex w-full justify-center gap-16 p-4 md:p-0">

          <div className="flex flex-col md:w-2/5 gap-2 items-center">
            
            <div className="flex w-full items-center">
              <Label val="Company Name" w="w-2/5"/>
              <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  id="txt_companyname"
                  value={companyNameSearchTerm}
                  onChange={(e) => setCompanyNameSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full items-center">
              <Label val="Contact Person" w="w-2/5"/>
              <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  id="txt_Contectperson"
                  value={contactPersonSearchTerm}
                  onChange={(e) => setContactPersonSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full items-center">
              <Label val="Mobile No." w="w-2/5"/>
              <div className="flex flex-col w-3/5 ">
                <Input
                type="No"
                id="txt_mobileno"
                value={mobileNoSearchTerm}
                onChange={(e) => setMobileNoSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full items-center">
              <Label val="EmailId" w="w-2/5"/>
              <div className="flex flex-col w-3/5 ">
                <Input
                type="EmailId"
                id="txt_EmailId"
                value={emailIdSearchTerm}
                onChange={(e) => setEmailIdSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full items-center">
              <Label val="Website" w="w-2/5"/>
              <div className="flex flex-col w-3/5 ">
                <Input
                type="text"
                id="txt_website"
                value={websiteSearchTerm}
                onChange={(e) => setWebsiteSearchTerm(e.target.value)}
                />
              </div>
            </div>

          </div>

          <div className="flex flex-col md:w-2/5 gap-2 items-center">

            <div className="flex w-full items-center">
              <Label val="pinCode" w="w-2/5"/>
              <div className="flex flex-col w-3/5 ">
                <Input
                  type="number"
                  id="txt_pinCode"
                  value={pinCodeSearchTerm}
                  onChange={(e) => setpinCodeSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full items-center">
              <Label val="City" w="w-2/5"/>
              <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  id="txt_city"
                  value={citySearchTerm}
                  onChange={(e) => setCitySearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full items-center">
              <Label val="State" w="w-2/5"/>
              <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  id="txt_state"
                  value={stateSearchTerm}
                  onChange={(e) => setStateSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex w-full items-center">
              <Label val="Country" w="w-2/5"/>
              <div className="flex flex-col w-3/5 ">
                <Input
                  type="text"
                  id="txt_Country"
                  value={countrySearchTerm}
                  onChange={(e) => setCountrySearchTerm(e.target.value)}
                />
              </div>
            </div>

          </div>

        </div>
        
        <div className="flex item-center justify-center gap-6">
          <Button onclick={handleSearch} val="Search" />
          <Button onclick={handleReset} val="Cancel" />
        </div>
      </div>

      <div className="bg-[#ffffff]  flex flex-col w-full p-4 gap-4 ">
        
        <div className='w-full flex md:flex-row flex-col gap-2 justify-between items-center'>
          
        

          <div className='flex gap-5'>
            
          <div className='flex gap-2 items-center md:justify-start justify-center'>
          <label>Select all</label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
        </div>

            <Link to="/newClient" className="flex w-fit ">
              <Button val="Add"/>
            </Link>
            
            <Link to={handleEdit()} className="flex w-fit">
              <Button val="Edit"/>
            </Link>
            
            <Button onclick={handleDeleteSelectedRows} val="Delete"/>
          
          </div >
          
          <div>Total Entries: {totalCount} <span className='font-bold'>|</span> Result: {data.length}</div>
          
          <div className='flex gap-4'>
            <Link onClick={handleShowMore} className='text-blue-700 underline'>Show More</Link>
            <Link className='text-blue-700 underline'>Export Excel</Link>
          </div>
        
          
        </div>
        
        {/* <div className='flex gap-2 items-center md:justify-start justify-center'>
          <label>Select all</label>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
        </div> */}
            
      </div>

      <div className='bg-[#ffffff] flex flex-col w-full py-4 gap-4 px-2'>
        {data.map((item,index) => (
          <div className={`${index % 2 === 0 ? 'bg-slate-100' : 'bg-white'} border-slate-200 shadow-lg rounded-lg gap-1 flex flex-col p-4`} key={item.id}>   
            
            <div className='flex items-center gap-2'>
              <input 
                type="checkbox"
                className='h-4 w-4'
                checked={selectedRows.includes(item.id)}
                onChange={() => handleRowSelect(item.id)}
              /> 
              <li className='list-none'><b>Company Name: {item.companyName}</b></li> 
            </div>

            <ul className="gap-1 flex flex-col">
              <li className='list-none flex md:flex-row flex-col md:gap-4 gap-2'>
                <span className='flex items-center gap-2'>
                  <img src="/user.png" alt='user' className='h-5 w-5' /> {item.contactPerson}
                </span>
                <span className='flex items-center gap-2'>
                  <img src="/phone.png" alt='phone' className='h-5 w-5'/> {item.mobileNo} 
                </span>
                <span className='flex items-center gap-2'>
                  <img src="/Email.png" alt='EmailId' className='h-5 w-5'/> {item.emailId}
                </span> 
              </li>

              <li><span className='flex items-center gap-2'><img src="/location.png" alt='location ' className='h-5 w-5'/>{item.city}, {item.state}, {item.country}</span></li>
            
            </ul>
            
          </div>
        ))}
      </div>
    </>
  )
}

export default ClientDetail