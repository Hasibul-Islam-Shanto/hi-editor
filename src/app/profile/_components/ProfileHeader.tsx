import Image from 'next/image';
import { UserResource } from '@clerk/types';
import { Id } from '../../../../convex/_generated/dataModel';
import { useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import {
  Activity,
  Timer,
  Star,
  Trophy,
  Code2,
  TrendingUp,
  UserIcon,
  Zap,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileHeaderProps {
  userStats: {
    totalExecutions: number;
    languagesCount: number;
    languages: string[];
    last24Hours: number;
    favoriteLanguage: string;
    languageStats: Record<string, number>;
    mostStarredLanguage: string;
  };
  userData: {
    _id: Id<'users'>;
    _creationTime: number;
    proSince?: number | undefined;
    lemonSqueezyCustomerId?: string | undefined;
    lemonSqueezyOrderId?: string | undefined;
    name: string;
    userId: string;
    email: string;
    isPro: boolean;
  };
  user: UserResource;
}
const ProfileHeader = ({ userStats, userData, user }: ProfileHeaderProps) => {
  const starredSnippets = useQuery(api.snippets.getStarredSnippets);
  const STATS = [
    {
      label: 'Code Executions',
      value: userStats?.totalExecutions ?? 0,
      icon: Activity,
      color: 'from-blue-500 to-cyan-500',
      gradient: 'group-hover:via-blue-400',
      description: 'Total code runs',
      metric: {
        label: 'Last 24h',
        value: userStats?.last24Hours ?? 0,
        icon: Timer,
      },
    },
    {
      label: 'Starred Snippets',
      value: starredSnippets?.length ?? 0,
      icon: Star,
      color: 'from-yellow-500 to-orange-500',
      gradient: 'group-hover:via-yellow-400',
      description: 'Saved for later',
      metric: {
        label: 'Most starred',
        value: userStats?.mostStarredLanguage ?? 'N/A',
        icon: Trophy,
      },
    },
    {
      label: 'Languages Used',
      value: userStats?.languagesCount ?? 0,
      icon: Code2,
      color: 'from-purple-500 to-pink-500',
      gradient: 'group-hover:via-purple-400',
      description: 'Different languages',
      metric: {
        label: 'Most used',
        value: userStats?.favoriteLanguage ?? 'N/A',
        icon: TrendingUp,
      },
    },
  ];
  return (
    <>
      <div className="relative mb-8 overflow-hidden rounded-2xl border border-gray-800/50 bg-gradient-to-br from-[#12121a] to-[#1a1a2e] p-8">
        <div className="bg-grid-white/[0.02] absolute inset-0 bg-[size:32px]" />
        <div className="relative flex items-center gap-8">
          <div className="group relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-50 blur-xl transition-opacity group-hover:opacity-75" />
            <Image
              src={user.imageUrl}
              alt="Profile"
              width={96}
              height={96}
              className="relative z-10 h-24 w-24 rounded-full border-4 border-gray-800/50 transition-transform group-hover:scale-105"
            />
            {userData.isPro && (
              <div className="absolute -top-2 -right-2 z-20 animate-pulse rounded-full bg-gradient-to-r from-purple-500 to-purple-600 p-2 shadow-lg">
                <Zap className="h-4 w-4 text-white" />
              </div>
            )}
          </div>
          <div>
            <div className="mb-2 flex items-center gap-3">
              <h1 className="text-3xl font-bold text-white">{userData.name}</h1>
              {userData.isPro && (
                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-400">
                  Pro Member
                </span>
              )}
            </div>
            <p className="flex items-center gap-2 text-gray-400">
              <UserIcon className="h-4 w-4" />
              {userData.email}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {STATS.map((stat, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-black/40 to-black/20"
            >
              {/* Glow effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 transition-all duration-500 group-hover:opacity-10 ${stat.gradient}`}
              />

              {/* Content */}
              <div className="relative p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-400">
                        {stat.description}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-white">
                      {typeof stat.value === 'number'
                        ? stat.value.toLocaleString()
                        : stat.value}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">{stat.label}</p>
                  </div>
                  <div
                    className={`rounded-xl bg-gradient-to-br p-3 ${stat.color} bg-opacity-10`}
                  >
                    <stat.icon className="h-5 w-5 text-white" />
                  </div>
                </div>

                {/* Additional metric */}
                <div className="flex items-center gap-2 border-t border-gray-800/50 pt-4">
                  <stat.metric.icon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-400">
                    {stat.metric.label}:
                  </span>
                  <span className="text-sm font-medium text-white">
                    {stat.metric.value}
                  </span>
                </div>
              </div>

              {/* Interactive hover effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
