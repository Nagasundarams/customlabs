import React, { useState } from 'react';

const options = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' }
];

function SegmentPage() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [segmentName, setSegmentName] = useState('');
  const [schemas, setSchemas] = useState([]);
  const [availableOptions, setAvailableOptions] = useState(options);

  const handleSaveSegmentClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  const handleSegmentNameChange = (e) => {
    setSegmentName(e.target.value);
  };

  const handleSchemaChange = (index, value) => {
    const newSchemas = [...schemas];
    newSchemas[index] = value;
    setSchemas(newSchemas);
    console.log(value);
    setAvailableOptions(availableOptions.filter(option => option.value !== value));
    
  };

  const handleAddNewSchema = () => {
    const newOption = availableOptions.find(option => !schemas.includes(option.value));
    if (newOption) {
      setSchemas([...schemas, newOption.value]);
      setAvailableOptions(availableOptions.filter(option => option.value !== newOption.value));
    }
    
  };
  

  const handleSaveData = () => {
    const data = {
      segmentName,
      schemas: schemas.map(value => ({ value }))
    };

    console.log('Data to be sent to the server:', data);

    // TODO: Send data to the server using fetch or axios
    // fetch('https://webhook.site/1f3c5189-7c9b-457e-a588-546e9bf164d0', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(data)
    // });

    setIsPopupOpen(false);
    setSegmentName('');
    setSchemas([]);
    setAvailableOptions(options);
  };

  return (
    <div>
      <button className='startbutton' onClick={handleSaveSegmentClick}>Save segment</button>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <button className="close" onClick={handlePopupClose}>X</button>
            <input
              className='segmentname'
              type="text"
              value={segmentName}
              onChange={handleSegmentNameChange}
              placeholder="Segment Name"
            />
            <div>
              <label>Add schema to segment:</label>
              <select
                className='dropdown'
                onChange={(e) => handleSchemaChange(e.target.selectedIndex, e.target.value)}
                defaultValue=""
              >
                <option value="" disabled>Select schema</option>
                {availableOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
              <button onClick={handleAddNewSchema}>+Add new schema</button>
            </div>

            <div className="schemas-list">
              {schemas.map((z, index) => (
                
                <div key={index+1} className="schema">
                  <select
                    className='dropdown'
                    value={z}
                    onChange={(e) => handleSchemaChange(index+1, e.target.value)}
                  >
                    {availableOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <button onClick={handleSaveData}>Save the segment</button>
            <button onClick={handlePopupClose}>cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SegmentPage;
