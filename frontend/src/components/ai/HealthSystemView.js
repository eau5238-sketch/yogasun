import React, { useState, useEffect } from "react";
import "./HealthSystemView.css";

const HealthSystemView = ({ patientId, systemData, onDataUpdate }) => {
  const [healthMetrics, setHealthMetrics] = useState({
    heartRate: 0,
    bloodPressure: { systolic: 0, diastolic: 0 },
    temperature: 0,
    oxygenSaturation: 0,
    weight: 0,
    height: 0,
  });

  const [medicalHistory, setMedicalHistory] = useState([]);
  const [currentMedications, setCurrentMedications] = useState([]);
  const [aiInsights, setAiInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    loadHealthSystemData();
  }, [patientId]);

  const loadHealthSystemData = async () => {
    setLoading(true);
    try {
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (systemData) {
        setHealthMetrics(systemData.metrics || healthMetrics);
        setMedicalHistory(systemData.history || []);
        setCurrentMedications(systemData.medications || []);
        setAiInsights(systemData.aiInsights || []);
      }
    } catch (error) {
      console.error("건강 시스템 데이터 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const getHealthStatus = () => {
    const { heartRate, bloodPressure, temperature, oxygenSaturation } =
      healthMetrics;

    // AI 기반 건강 상태 분석
    let status = "normal";
    let alerts = [];

    if (heartRate > 100 || heartRate < 60) {
      status = "warning";
      alerts.push("심박수 이상");
    }

    if (bloodPressure.systolic > 140 || bloodPressure.diastolic > 90) {
      status = "warning";
      alerts.push("혈압 높음");
    }

    if (temperature > 37.5) {
      status = "alert";
      alerts.push("발열");
    }

    if (oxygenSaturation < 95) {
      status = "alert";
      alerts.push("산소포화도 낮음");
    }

    return { status, alerts };
  };

  const renderOverview = () => {
    const { status, alerts } = getHealthStatus();

    return (
      <div className="overview-tab">
        <div className="health-status-card">
          <div className={`status-indicator ${status}`}>
            <span className="status-dot"></span>
            <span className="status-text">
              {status === "normal"
                ? "정상"
                : status === "warning"
                ? "주의"
                : "위험"}
            </span>
          </div>

          {alerts.length > 0 && (
            <div className="health-alerts">
              <h4>주의사항</h4>
              <ul>
                {alerts.map((alert, index) => (
                  <li key={index}>{alert}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">💓</div>
            <div className="metric-info">
              <span className="metric-label">심박수</span>
              <span className="metric-value">
                {healthMetrics.heartRate} BPM
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">🩸</div>
            <div className="metric-info">
              <span className="metric-label">혈압</span>
              <span className="metric-value">
                {healthMetrics.bloodPressure.systolic}/
                {healthMetrics.bloodPressure.diastolic} mmHg
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">🌡️</div>
            <div className="metric-info">
              <span className="metric-label">체온</span>
              <span className="metric-value">
                {healthMetrics.temperature}°C
              </span>
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">🫁</div>
            <div className="metric-info">
              <span className="metric-label">산소포화도</span>
              <span className="metric-value">
                {healthMetrics.oxygenSaturation}%
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderHistory = () => (
    <div className="history-tab">
      <h3>진료 이력</h3>
      <div className="history-timeline">
        {medicalHistory.map((record, index) => (
          <div key={index} className="history-item">
            <div className="history-date">{record.date}</div>
            <div className="history-content">
              <h4>{record.diagnosis}</h4>
              <p>{record.treatment}</p>
              <span className="doctor-name">담당의: {record.doctor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMedications = () => (
    <div className="medications-tab">
      <h3>현재 복용 중인 약물</h3>
      <div className="medications-list">
        {currentMedications.map((medication, index) => (
          <div key={index} className="medication-item">
            <div className="medication-info">
              <h4>{medication.name}</h4>
              <p>{medication.dosage}</p>
              <span className="frequency">{medication.frequency}</span>
            </div>
            <div className="medication-status">
              <span
                className={`status ${
                  medication.active ? "active" : "inactive"
                }`}
              >
                {medication.active ? "복용 중" : "중단"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAIInsights = () => (
    <div className="ai-insights-tab">
      <h3>AI 건강 분석</h3>
      <div className="insights-list">
        {aiInsights.map((insight, index) => (
          <div key={index} className="insight-item">
            <div className={`insight-priority ${insight.priority}`}>
              {insight.priority === "high"
                ? "🔴"
                : insight.priority === "medium"
                ? "🟡"
                : "🟢"}
            </div>
            <div className="insight-content">
              <h4>{insight.title}</h4>
              <p>{insight.description}</p>
              {insight.recommendation && (
                <div className="recommendation">
                  <strong>권장사항:</strong> {insight.recommendation}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="health-system-view loading">
        <div className="loading-spinner"></div>
        <p>건강 정보를 불러오는 중...</p>
      </div>
    );
  }

  return (
    <div className="health-system-view">
      <div className="health-header">
        <h2>건강 관리 시스템</h2>
        <p>AI 기반 건강 모니터링 및 분석</p>
      </div>

      <div className="health-tabs">
        <button
          className={`tab-button ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          개요
        </button>
        <button
          className={`tab-button ${activeTab === "history" ? "active" : ""}`}
          onClick={() => setActiveTab("history")}
        >
          진료 이력
        </button>
        <button
          className={`tab-button ${
            activeTab === "medications" ? "active" : ""
          }`}
          onClick={() => setActiveTab("medications")}
        >
          복용 약물
        </button>
        <button
          className={`tab-button ${
            activeTab === "ai-insights" ? "active" : ""
          }`}
          onClick={() => setActiveTab("ai-insights")}
        >
          AI 분석
        </button>
      </div>

      <div className="health-content">
        {activeTab === "overview" && renderOverview()}
        {activeTab === "history" && renderHistory()}
        {activeTab === "medications" && renderMedications()}
        {activeTab === "ai-insights" && renderAIInsights()}
      </div>
    </div>
  );
};

export default HealthSystemView;
