import React from 'react';

const MySelect = ({defaultValue, options, value, onChange}) => {
    return (
        <select
            style={({margin: "30px 10px"})}
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value="">{defaultValue}</option>

                {options.map(option =>
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>)}
        </select>
    );
};

export default MySelect;