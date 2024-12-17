import React from 'react';
import SliderComponent from './sliderComponent';
// import SliderComponent from './sliderComponent';

export default function SliderListComponent({ joints, onJointChange }) {
    return (
        <div>
            {joints && joints.map((joint) => (
                <SliderComponent
                    key={joint.name}
                    name={joint.name}
                    value={joint.angle}
                    min={joint.limit.lower}
                    max={joint.limit.upper}
                    step={0.01}
                    onChange={(newValue) => onJointChange(joint.name, newValue)}
                />
            ))}
        </div>
    );
};