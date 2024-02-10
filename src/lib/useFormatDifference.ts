import { useTranslation } from 'react-i18next';

export function useFormatDistance() {
    const { t } = useTranslation();

    return (date1: Date, date2: Date): string => {
        // Calculate the difference in seconds
        const diffInSeconds = Math.abs(date2.getTime() - date1.getTime()) / 1000;

        // Convert the difference to various units
        const diffInMinutes = diffInSeconds / 60;
        const diffInHours = diffInMinutes / 60;
        const diffInDays = diffInHours / 24;
        const diffInMonths = diffInDays / 30;
        const diffInYears = diffInDays / 365;

        // Return the difference in the largest unit where it's at least 1
        if (diffInYears >= 1) return `${Math.round(diffInYears)} ${t(diffInYears > 1.5 ? 'years' : 'year')}`;
        if (diffInMonths >= 1) return `${Math.round(diffInMonths)} ${t(diffInMonths > 1.5 ? 'months' : 'month')}`;
        if (diffInDays >= 1) return `${Math.round(diffInDays)} ${t(diffInDays > 1.5 ? 'days' : 'day')}`;
        if (diffInHours >= 1) return `${Math.round(diffInHours)} ${t(diffInHours > 1.5 ? 'hours' : 'hour')}`;
        if (diffInMinutes >= 1) return `${Math.round(diffInMinutes)} ${t(diffInMinutes > 1.5 ? 'minutes' : 'minute')}`;

        // If the difference is less than 1 minute, return it in seconds
        return `${Math.round(diffInSeconds)} ${t(diffInSeconds > 1.5 ? 'seconds' : 'second')}`;
    };
}