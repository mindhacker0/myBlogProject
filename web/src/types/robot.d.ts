export interface Pose {
    "x": number | string,
    "y": number | string,
    "z": number | string,
    "roll": number | string,
    "pitch": number | string,
    "yaw": number | string
    [key: string]: any;
}

export interface JointPositions {
    "J1": number | string,
    "J2": number | string,
    "J3": number | string,
    "J4": number | string,
    "J5": number | string,
    "J6": number | string
    [key: string]: any;
}

export interface RobotInfo {
    "jointPositions": JointPositions
    "pose": Pose
    "isEnabled": boolean
    "isMoving"?: boolean
  }