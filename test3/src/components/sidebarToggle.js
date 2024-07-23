import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function SidebarToggle() {
  const [data, setData] = useState(null);
  const [openFields, setOpenFields] = useState({});

    const toggleField = (field) => {
        setOpenFields((prevOpenFields) => ({
        ...prevOpenFields,
        [field]: !prevOpenFields[field],
        }));
    };
  // Define the fetchTotalCount function outside of useEffect
  useEffect(() => {
    const fetchTotalCount = async () => {
      try {
        const response = await axios.get('http://192.168.1.250:3004/menu/search');
        setData(response.data);
        console.log(response.data); // Log the fetched data to the console
      } catch (error) {
        console.error('Error fetching total count:', error);
      }
    };

    fetchTotalCount(); // Fetch data when the component mounts
  }, []); 

  // Function to render subFields
  const renderSubFields = (subFields) => {
    return(
      <ul className="w-full flex flex-col">
        {Object.entries(subFields).map(([key, value]) => {
        if ( value.label && value.link  ) {
          return <li key={key} className="cursor-pointer hover:bg-stone-200 p-3 px-8 border-b-[1px] border-blue-100">{ value.label}</li>;
        }
        else{
          return (
            <li key={key}>
              <button className="p-3 px-8 w-full flex items-center justify-between border-b-[1px] border-slate-100" onClick={() => toggleField(key)}>
                <h1 className='font-bold'>{value.label}</h1>
                {openFields[key] ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}
              </button>
              {openFields[key] && (
                <ul className="w-full flex flex-col">
                    {Object.entries(value.subFields).map(([key, value]) => {
                       return <li key={key} className="cursor-pointer hover:bg-stone-200 px-12 p-3 border-b-[1px] border-slate-100">{value.label}</li>
                    })}
                </ul>
              )} 
            </li>
          )
        }
        })}
      </ul>
  )
  };

  return (
    <div className="flex flex-col text-black divide-y-[1px] md:h-full md:overflow-y-auto">
      <ul className=' text-sm'>
      {data && Object.entries(data).map(([key, value]) => (
        <li key={key} className="border-b border-gray-600">
          <button className="p-3 w-full flex items-center justify-between" onClick={() => toggleField(key)}>
            <h1 className='font-bold'>{value.label}</h1>
            {openFields[key] ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleRight} />}
          </button>
          {openFields[key] && (
            renderSubFields(value.subFields)
          )}
        </li>
      ))}
      </ul>
    </div>
  );
}

export default SidebarToggle;