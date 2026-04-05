import React from "react";
import { DollarSign, Bell, Lock, Download } from "lucide-react";

const Settings = () => {
    const settingItems = [
        {
            icon: DollarSign,
            title: "Currency",
            description: "Change your default currency"
        },
        {
            icon: Bell,
            title: "Notifications",
            description: "Manage your notification preferences"
        },
        {
            icon: Lock,
            title: "Privacy & Security",
            description: "Control your account security"
        },
        {
            icon: Download,
            title: "Export Data",
            description: "Download your transactions"
        }
    ];

    return (
        <div className="px-6 py-4 dark:bg-gray-950 min-h-screen">
            <div className="max-w-2xl">
                <div className="flex flex-col gap-4">
                    {settingItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={index}
                                className="p-6 bg-white dark:bg-[#121614] border border-gray-300
                                dark:border-gray-700 rounded-lg hover:border-gray-300 
                                dark:hover:border-gray-600 hover:shadow-md dark:hover:shadow-gray-900 
                                transition text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                        <Icon size={24} className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-gray-900 dark:text-white">{item.title}</h2>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Settings;