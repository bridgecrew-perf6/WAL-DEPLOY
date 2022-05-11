"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getMorning = () => {
    const setTime = new Date();
    const morning = new Date(Date.UTC(setTime.getFullYear(), setTime.getMonth(), setTime.getDate(), 8 - 9, 0, 0, 0));
    return morning;
};
const getAfternoon = () => {
    const setTime = new Date();
    const afternoon = new Date(Date.UTC(setTime.getFullYear(), setTime.getMonth(), setTime.getDate(), 14 - 9, 0, 0, 0));
    return afternoon;
};
const getNight = () => {
    const setTime = new Date();
    const night = new Date(Date.UTC(setTime.getFullYear(), setTime.getMonth(), setTime.getDate(), 20 - 9, 0, 0, 0));
    return night;
};
const timeHandler = {
    getMorning,
    getAfternoon,
    getNight
};
exports.default = timeHandler;
//# sourceMappingURL=timeHandler.js.map