
import ChatView from "@/components/messages/ChatView";
import DoctorList from "@/components/messages/DoctorList";
import { doctors } from "@/data/messages";
import { useState } from "react";
import { Card } from "@/components/ui/card";

const Messages = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(doctors[0]?.id || null);

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId);

  return (
    <Card className="flex h-[calc(100vh-10rem)] overflow-hidden">
      <DoctorList selectedDoctorId={selectedDoctorId} onSelectDoctor={setSelectedDoctorId} />
      <ChatView doctor={selectedDoctor} />
    </Card>
  );
};

export default Messages;
