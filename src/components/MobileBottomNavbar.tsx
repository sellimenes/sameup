import { useEffect, useState } from "react";
import axios from "axios";
import { t } from "i18next";
import { cn } from "@/lib/utils";

import CustomSvg from "./CustomSvg";

type NotificationType = {
    newPostsHome: boolean;
    networkNotificationCount: number;
    notificationCount: number;
};

const MobileBottomNavbar = () => {
    const [active, setActive] = useState<string>('home');
    const [notifications, setNotifications] = useState<NotificationType | null>(null);

    useEffect(() => {
        const getNotifications = async() => {
            const response = await axios.get<NotificationType>('/notifications.json');
            setNotifications(response.data);
        }

        getNotifications();
    }, []);

    return (
        <section className="fixed sm:hidden bottom-0 w-full border-t border-white/20 py-2 px-5 bg-white dark:bg-[#1B1F23]">
            <nav>
                <ul className="flex items-center justify-between">
                    <li className={cn("relative capitalize flex flex-col items-center gap-[1px] text-xs font-light", active === 'home' ? 'opacity-100': 'opacity-60')}>
                        <CustomSvg name="home" size="22" />
                        {t('home')}
                        {notifications?.newPostsHome && (
                            <div className="absolute top-0 right-0 w-2 h-2 bg-red-600 rounded-full"></div>
                        )}
                    </li>
                    <li className={cn("relative capitalize flex flex-col items-center gap-[1px] text-xs font-light", active === 'users' ? 'opacity-100': 'opacity-60')}>
                        <div className="relative">
                            <CustomSvg name="users" size="22" />
                            {notifications && notifications.networkNotificationCount > 0 && (
                                <div className="absolute -top-1 -right-3 bg-red-600 rounded-full h-4 w-4 flex items-center justify-center">
                                    {notifications.networkNotificationCount}
                                </div>
                            )}
                        </div>
                        {t('network')}
                    </li>
                    <li className={cn("relative capitalize flex flex-col items-center gap-[1px] text-xs font-light", active === 'plus' ? 'opacity-100': 'opacity-60')}>
                        <CustomSvg name="plus" size="22" />
                        {t('post')}
                    </li>
                    <li className={cn("relative capitalize flex flex-col items-center gap-[1px] text-xs font-light", active === 'notifications' ? 'opacity-100': 'opacity-60')}>
                        <div className="relative">
                            <CustomSvg name="ring" size="22" />
                            {notifications && notifications.notificationCount > 0 && (
                            <div className="absolute -top-1 -right-3 bg-red-600 rounded-full flex items-center justify-center px-1">
                                {notifications.notificationCount}
                            </div>
                        )}
                        </div>
                        {t('notifications')}
                    </li>
                    <li className={cn("relative capitalize flex flex-col items-center gap-[1px] text-xs font-light", active === 'jobs' ? 'opacity-100': 'opacity-60')}>
                        <CustomSvg name="jobs" size="22" />
                        {t('jobs')}
                    </li>
                </ul>
            </nav>
        </section>
    )
}

export default MobileBottomNavbar;