function simplifyAngle(angle) {
    while (angle > 2*PI) {
        angle -= 2*PI;
    }

    while (angle < 0) {
        angle += 2*PI;
    }

    return angle;
}

function relativeAngleDiff(angle, anchor) {
    angle = simplifyAngle(angle + PI - anchor);
    anchor = PI;

    return anchor - angle;
}