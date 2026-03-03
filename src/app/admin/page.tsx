"use client";

import React from "react";
import {
    Users,
    ShoppingBag,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Utensils,
    Calendar,
    ChevronRight,
    MoreVertical
} from "lucide-react";

const STATS = [
    { name: "Total Revenue", value: "₹4,28,450", change: "+12.5%", trend: "up", icon: TrendingUp, color: "text-green-600", bg: "bg-green-50" },
    { name: "Total Orders", value: "1,245", change: "+5.2%", trend: "up", icon: ShoppingBag, color: "text-brand-orange", bg: "bg-brand-orange/5" },
    { name: "New Customers", value: "328", change: "-2.1%", trend: "down", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Popular Dish", value: "Butter Chicken", icon: Utensils, color: "text-brand-yellow", bg: "bg-brand-yellow/10" }
];

const RECENT_ORDERS = [
    { id: "#SPF-2041", customer: "Rahul Sharma", dish: "Smoky Butter Chicken", amount: "₹849", status: "Delivered", time: "2 mins ago" },
    { id: "#SPF-2040", customer: "Priya Varma", dish: "Jeera Rice + Dal Fry", amount: "₹428", status: "In Kitchen", time: "8 mins ago" },
    { id: "#SPF-2039", customer: "Amit Patel", dish: "Chicken Biryani Combo", amount: "₹1,250", status: "On the way", time: "15 mins ago" },
    { id: "#SPF-2038", customer: "Sneh Kapoor", dish: "Shahi Paneer (Full)", amount: "₹349", status: "Pending", time: "22 mins ago" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-4xl font-black text-brand-teal uppercase tracking-tighter">Dashboard <span className="text-brand-orange">Overview</span></h1>
                    <p className="text-sm font-medium text-gray-400">Welcome back! Here's what's happening at Star Plus Foods today.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl shadow-sm border border-gray-100">
                    <Calendar className="w-4 h-4 text-gray-400 ml-2" />
                    <span className="text-xs font-bold text-gray-600 uppercase tracking-widest mr-2">Dec 20, 2023 - Dec 27, 2023</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat) => (
                    <div key={stat.name} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 group hover:shadow-xl hover:shadow-black/5 transition-all duration-500 hover:-translate-y-1">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            {stat.change && (
                                <div className={`flex items-center text-xs font-black rounded-full px-2 py-1 ${stat.trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                                    {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
                                    {stat.change}
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">{stat.name}</span>
                            <span className="text-2xl font-black text-brand-teal">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight">Recent <span className="text-brand-orange">Orders</span></h3>
                        <button className="text-[10px] font-black text-brand-orange uppercase tracking-widest hover:underline flex items-center">
                            View All <ChevronRight className="w-3 h-3 ml-1" />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Order ID</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Customer</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Amount</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {RECENT_ORDERS.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-8 py-5 text-sm font-black text-brand-teal">{order.id}</td>
                                        <td className="px-8 py-5">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-brand-teal">{order.customer}</span>
                                                <span className="text-[10px] text-gray-400 font-medium">{order.dish}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-sm font-black text-brand-teal">{order.amount}</td>
                                        <td className="px-8 py-5">
                                            <span className={`
                                                text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter
                                                ${order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                                                    order.status === 'In Kitchen' ? 'bg-blue-50 text-blue-600' :
                                                        order.status === 'On the way' ? 'bg-brand-yellow/20 text-brand-yellow' :
                                                            'bg-brand-orange/10 text-brand-orange'}
                                            `}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5 text-right">
                                            <button className="p-2 text-gray-400 hover:text-brand-orange hover:bg-gray-100 rounded-xl transition-all">
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Popular Products Sidebar */}
                <div className="space-y-8">
                    <div className="bg-brand-teal rounded-3xl p-8 text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Grow your <span className="text-brand-orange">Sales</span></h3>
                            <p className="text-white/60 text-sm font-medium mb-6">Create a special coupon for your best customers and increase orders by 20%.</p>
                            <button className="px-6 py-3 bg-brand-orange text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform shadow-lg shadow-brand-orange/20">
                                Create Offer
                            </button>
                        </div>
                        {/* Decorative Background Patterns */}
                        <div className="absolute top-0 right-0 mandala-pattern w-full h-full opacity-10 pointer-events-none transform rotate-12 -translate-y-1/2 translate-x-1/2"></div>
                    </div>

                    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-black text-brand-teal uppercase tracking-tight mb-6">Top <span className="text-brand-orange">Categories</span></h3>
                        <div className="space-y-6">
                            {[
                                { name: "Non-Veg Curries", percentage: 45, color: "bg-brand-orange" },
                                { name: "Veg Specialities", percentage: 30, color: "bg-brand-yellow" },
                                { name: "Meal Combos", percentage: 25, color: "bg-brand-teal" }
                            ].map((cat) => (
                                <div key={cat.name} className="space-y-2">
                                    <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                                        <span className="text-brand-teal">{cat.name}</span>
                                        <span className="text-gray-400">{cat.percentage}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-50 rounded-full overflow-hidden">
                                        <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.percentage}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
