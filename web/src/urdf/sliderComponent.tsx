import React from 'react';

interface SliderComponentProps {
    name: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (value: number) => void;
}

const SliderComponent: React.FC<SliderComponentProps> = ({ name, value, min, max, step, onChange }) => {
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
                onChange={e => onChange(Number(e.target.value))}
            />
        </div>
    );
};

export default SliderComponent;