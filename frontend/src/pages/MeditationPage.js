import React from "react";
import MeditationPlayer from "../components/meditation/MeditationPlayer";

export default function MeditationPage() {
  // 일반 React에서 title 변경
  React.useEffect(() => {
    document.title = "요가 명상 - Yoga Meditation";

    // 기존 meta 태그가 있다면 업데이트
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "평화로운 요가 명상으로 마음의 평안을 찾아보세요";
  }, []);

  return <MeditationPlayer />;
}
