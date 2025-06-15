
import ChatView from "@/components/messages/ChatView";
import DoctorList from "@/components/messages/DoctorList";
import { doctors } from "@/data/messages";
import { useState } from "react";

const Messages = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(doctors[0]?.id || null);

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);

  return (
    <div className="flex h-full -m-8">
      <DoctorList selectedDoctorId={selectedDoctorId} onSelectDoctor={setSelectedDoctorId} />
      <ChatView doctor={selectedDoctor} />
    </div>
  );
};

export default Messages;
