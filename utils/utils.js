export const getCurrentYear = () => {
    return new Date().getFullYear();
};

export const getRandomValue = (maxValue, minValue) => {
    return Math.ceil(Math.random() * (maxValue - minValue) + minValue);
}

// Utility function to merge classNames (similar to cn from shadcn)
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}