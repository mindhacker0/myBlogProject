import React from 'react';

export default function SliderComponent({ name, value, min, max, step, onChange }) {
    return (
        <div>
            <label htmlFor={name}>{name}</label>
            <input
                type="range"
                id={name}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={e => onChange(e.target.value)}
            />
        </div>
    );
};
