import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

import CustomSvg from "./CustomSvg";

type NotificationType = {
    newPostsHome: boolean;
    networkNotificationCount: number;
    notificationCount: number;
};

const MobileBottomNavbar = () => {
    const { t } = useTranslation();
    const [active] = useState<string>('home');
    const [notifications, setNotifications] = useState<NotificationType | null>(null);

    useEffect(() => {
        const getNotifications = async() => {
            const response = await axios.get<NotificationType>('/notifications.json');
            setNotifications(response.data);
        }

        getNotifications();
    }, []);

    return (
        <section className="fixed sm:hidden bottom-0 w-full border-t border-gray-300 dark:border-white/20 bg-white dark:bg-[#1B1F23]">
            <nav>
                <ul className="flex items-center justify-between">
                    <li className={cn("flex-1 py-2 capitalize flex flex-col items-center gap-[1px] text-xs font-light", active === 'home' ? "border-t border-gray-600 dark:border-white" : "border-none")}>
                        <div className="relative">
                            <CustomSvg name="home" size="22" className={cn(active === 'home' ? "opacity-100" : "opacity-60")} />
                            {notifications?.newPostsHome && (
                                <div className="absolute top-0 -right-1 w-2 h-2 bg-red-600 rounded-full"></div>
                                )}
                        </div>
                        {t('home')}

                    </li>
                    <li className={cn("flex-1 py-2 capitalize flex flex-col items-center gap-[1px] text-xs font-light", active === 'users' ? "border-t border-gray-600 dark:border-white" : "border-none")}>
                        <div className="relative">
                            <CustomSvg name="users" size="22" className={cn(active === 'users' ? "opacity-100" : "opacity-60")} />
                            {notifications && notifications.networkNotificationCount > 0 && (
                                <div className="absolute -top-1 -right-3 bg-red-600 text-white rounded-full h-4 w-4 flex items-center justify-center">
                                    {notifications.networkNotificationCount}
                                </div>
                            )}
                        </div>
                        {t('network')}
                    </li>
                    <li className={cn("flex-1 py-2 capitalize flex flex-col items-center gap-[1px] text-xs font-light", active === 'plus' ? "border-t border-gray-600 dark:border-white" : "border-none")}>
                        <CustomSvg name="plus" size="22" className={cn(active === 'plus' ? "opacity-100" : "opacity-60")} />
                        {t('post')}
                    </li>
                    <li className={cn("flex-1 py-2 capitalize flex flex-col items-center gap-[1px] text-xs font-light", active === 'ring' ? "border-t border-gray-600 dark:border-white" : "border-none")}>
                        <div className="relative">
                            <CustomSvg name="ring" size="22" className={cn(active === 'ring' ? "opacity-100" : "opacity-60")} />
                            {notifications && notifications.notificationCount > 0 && (
                            <div className="absolute -top-1 -right-3 bg-red-600 text-white rounded-full flex items-center justify-center px-1">
                                {notifications.notificationCount}
                            </div>
                        )}
                        </div>
                        {t('notifications')}
                    </li>
                    <li className={cn("flex-1 py-2 capitalize flex flex-col items-center gap-[1px] text-xs font-light", active === 'jobs' ? "border-t border-gray-600 dark:border-white" : "border-none")}>
                        <CustomSvg name="jobs" size="22" className={cn(active === 'jobs' ? "opacity-100" : "opacity-60")} />
                        {t('jobs')}
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default MobileBottomNavbar;