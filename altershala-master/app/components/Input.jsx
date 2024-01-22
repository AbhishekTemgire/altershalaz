'use client'
import React, { useState } from 'react';
import Select from 'react-select';

const options = [
    { value: 'Technology', label: 'Technology' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Education', label: 'Education' },
    { value: 'Marketing', label: 'Marketing' },
    { value: 'Health', label: 'Health' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Cryptocurrency', label: 'Cryptocurrency' },
    { value: 'Travel', label: 'Travel' }, // Additional option
    { value: 'Sports', label: 'Sports' }, // Additional option
    { value: 'Food', label: 'Food' },     // Additional option
    // Add more options as needed
];

export default function KeywordSelector() {
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddKeyword = () => {
        if (inputValue && selectedKeywords.length < 3) {
            const newKeyword = { value: inputValue, label: inputValue };
            setSelectedKeywords([...selectedKeywords, newKeyword]);
            setInputValue('');
        }
    };

    const removeKeyword = (keyword) => {
        const updatedKeywords = selectedKeywords.filter((kw) => kw.value !== keyword.value);
        setSelectedKeywords(updatedKeywords);
    };

    const handleSubmit = () => {
        const selectedKeywordValues = selectedKeywords.map((kw) => kw.value);
        console.log('Selected Keywords:', selectedKeywordValues);
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            boxShadow: 'none',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#F0F0F0' : 'white',
            color: '#333',
        }),
        multiValue: (provided) => ({
            ...provided,
            backgroundColor: '#1e1e1e',
      
        }),
        multiValueLabel: (provided) => ({
            ...provided,
            color: 'white',
            backgroundColor: '#1e1e1e',
       
         
        }),
        multiValueRemove: (provided) => ({
            ...provided,
            backgroundColor: 'transparent',
            color: 'white',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'transparent',
                color: 'white',
            },
        }),
    };

    const customComponents = {
        DropdownIndicator: () => null, // Remove the dropdown indicator
        IndicatorSeparator: () => null, // Remove the indicator separator
    };

    return (
        <div className="relative justify-center items-center flex-col flex w-full h-screen  mb-3">
            <Select
                options={options}
                isMulti
                value={selectedKeywords}
                onChange={(selectedOptions) => setSelectedKeywords(selectedOptions)}
                label="hello"
                isSearchable
                className='w-[300px]'
                styles={customStyles}
                components={customComponents}
            />
            <button
                className="mt-2 bg-[#0F0F0F] text-sm  text-white font-bold py-2 px-6 rounded-full "
                onClick={handleSubmit}
            >
                Submit
            </button>
        </div>
    );
}
