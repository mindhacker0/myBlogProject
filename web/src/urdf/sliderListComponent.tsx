import React from 'react';
import SliderComponent from './sliderComponent';
import { URDFJoint } from 'urdf-loader';

interface SliderListComponentProps {
    joints: URDFJoint[];
    onJointChange: (name: string, newValue: number) => void;
}

const SliderListComponent:React.FC<SliderListComponentProps> = ({ joints, onJointChange }) => {
    return (
        <div>
            {joints && joints.map((joint) => (
                <SliderComponent
                    key={joint.name}
                    name={joint.name}
                    value={Number(joint.angle)  }
                    min={Number(joint.limit.lower)}
                    max={Number(joint.limit.upper)}
                    step={0.01}
                    onChange={(newValue) => onJointChange(joint.name, newValue)}
                />
            ))}
        </div>
    );
};

export default SliderListComponent;