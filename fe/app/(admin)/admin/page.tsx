"use client";

import {
  useEffect,
  useState,
} from "react";

import styles from "./dashboard.module.css";

import {api} from "@/libs/api"
type DashboardStats = {
  totalUsers: number;
  totalProperties: number;
  totalProjects: number;
  totalNews: number;
  pendingProperties: number;
};

export default function AdminDashboard() {
  const [stats, setStats] =
    useState<DashboardStats | null>(
      null
    );

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchDashboard =
      async () => {
        try {
          const res = await api(
            "http://localhost:5000/admin/dashboard"
          );

          const data =
            await res.json();

          setStats(data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchDashboard();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className={
        styles.dashboardWrapper
      }
    >
      <h1 className={styles.title}>
        Admin Dashboard
      </h1>

      <div className={styles.stats}>
        <Card
          icon="👤"
          title="Người dùng"
          value={
            stats?.totalUsers || 0
          }
        />

        <Card
          icon="🏠"
          title="Bất động sản"
          value={
            stats?.totalProperties ||
            0
          }
        />

        <Card
          icon="📝"
          title="Dự án"
          value={
            stats?.totalProjects || 0
          }
        />

        <Card
          icon="📰"
          title="Tin tức"
          value={
            stats?.totalNews || 0
          }
        />

        <Card
          icon="⏳"
          title="Chờ duyệt"
          value={
            stats?.pendingProperties ||
            0
          }
        />
      </div>
    </div>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: number;
}) {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        {icon}
      </div>

      <div>
        <h3>{title}</h3>

        <p>{value}</p>
      </div>
    </div>
  );
}