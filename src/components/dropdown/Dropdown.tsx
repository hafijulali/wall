
import React, { useState } from 'react';

interface DropdownProps {
  options: string[];
  onChange: (selectedValue: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>(options[0]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <select className='btn' value={selectedValue} onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
