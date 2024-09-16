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
  const [selectedOptions, setSelectedOptions] = useState([]);

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
    console.log(newSchemas);
    setSchemas(newSchemas);
  };

  const handleAddNewSchema = () => {
    const newOption = availableOptions.find(option => !schemas.includes(option.value));
    if (newOption) {
      setSchemas([...schemas, newOption.value]);
      setAvailableOptions(availableOptions.filter(option => option.value !== newOption.value));
    }
  };

  const handleSaveData = () => {
    // Example data format
    const data = {
      segmentName,
      schemas: schemas.map(value => ({ value }))
    };

    console.log('Data to be sent to the server:', data);

    // TODO: Send data to the server using fetch or axios
    // fetch('/api/save-segment', {
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
      <button onClick={handleSaveSegmentClick}>Save segment</button>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <button className="close" onClick={handlePopupClose}>X</button>
            <input
              type="text"
              value={segmentName}
              onChange={handleSegmentNameChange}
              placeholder="Segment Name"
            />
            <div>
              <label>Add schema to segment:</label>
              <select
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
              {schemas.map((schema, index) => (
                <div key={index} className="schema">
                  <select
                    value={schema}
                    onChange={(e) => handleSchemaChange(index, e.target.value)}
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
