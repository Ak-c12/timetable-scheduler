import React, { useState, useEffect } from "react";
import { Course, Teacher, Room, Class, TimeSlot } from "../../api";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// import { createPageUrl } from "@/utils";
import { 
  BookOpen, 
  Users, 
  MapPin, 
  Calendar,
  Plus,
  Clock,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

import StatCard from "../../components/Dashboard/statCard";
import RecentClasses from "../../components/Dashboard/recentClasses";
import WeeklyOverview from "../../components/Dashboard/weeklyOverview";
import QuickActions from "../../components/Dashboard/quickActions";
import TodaySchedule from "../../components/Dashboard/todaySchedule";


export default function Dashboard() {
  const [stats, setStats] = useState({
    courses: 0,
    teachers: 0,
    rooms: 0,
    classes: 0,
    timeSlots: 0
  });
  const [recentClasses, setRecentClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [courses, teachers, rooms, classes, timeSlots] = await Promise.all([
        Course.list(),
        Teacher.list(),
        Room.list(), 
        Class.list('-created_date', 10),
        TimeSlot.list()
      ]);

      setStats({
        courses: courses.length,
        teachers: teachers.length,
        rooms: rooms.length,
        classes: classes.length,
        timeSlots: timeSlots.length
      });

      setRecentClasses(classes);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    }
    setIsLoading(false);
    
  };
    const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  
  const todayDateString = new Date().toISOString().split('T')[0];
  const todayClasses = recentClasses.filter(cls => cls.date && cls.date.startsWith(todayDateString));

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">
              Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}!
            </h1>
            <p className="text-lg text-slate-600">{currentDay} • {currentTime}</p>
            {/* <p className="text-gray-600 mt-2 text-lg">
              Welcome to your timetable management system
            </p> */}
          </div>
          <QuickActions />
        </div>

        {/* <div>
          <Card/>
        </div> */}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard
            title="Total Courses"
            value={stats.courses}
            icon={BookOpen}
            color="blue"
            isLoading={isLoading}
          />
          <StatCard
            title="Teachers"
            value={stats.teachers}
            icon={Users}
            color="green"
            isLoading={isLoading}
          />
          <StatCard
            title="Rooms"
            value={stats.rooms}
            icon={MapPin}
            color="purple"
            isLoading={isLoading}
          />
          <StatCard
            title="Active Classes"
            value={stats.classes}
            icon={Calendar}
            color="orange"
            isLoading={isLoading}
          />
          {/* <StatCard
            title="Time Slots"
            value={stats.timeSlots}
            icon={Clock}
            color="pink"
            isLoading={isLoading}
          /> */}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <TodaySchedule 
              todayClasses={todayClasses}
              isLoading={isLoading}
              currentTime={currentTime}
            />
          </div>
          <div className="lg:col-span-2">
            <RecentClasses classes={recentClasses} isLoading={isLoading} />
          </div>

          {/* Weekly Overview */}
          <div>
            <WeeklyOverview />
          </div>
        </div>
      </div>
    </div>
  );
}

