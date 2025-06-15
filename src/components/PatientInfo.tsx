
import { ChevronLeft, CheckCircle, FileText } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const responsibleDoctors = [
  "https://i.pravatar.cc/150?img=1",
  "https://i.pravatar.cc/150?img=2",
  "https://i.pravatar.cc/150?img=3",
  "https://i.pravatar.cc/150?img=4",
];

export const PatientInfo = () => (
  <Card className="shadow-soft border-0 rounded-2xl w-full lg:w-80 flex-shrink-0">
    <CardContent className="p-6">
      <button className="flex items-center text-sm text-gray-500 hover:text-brand-blue mb-4">
        <ChevronLeft className="w-4 h-4 mr-1" />
        All Patients
      </button>

      <div className="flex flex-col items-center text-center">
        <Avatar className="w-20 h-20 mb-3">
          <AvatarImage src="https://i.pravatar.cc/150?img=5" alt="Aaron Almaraz" />
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
        <h2 className="text-xl font-bold text-brand-dark">Aaron Almaraz</h2>
        <p className="text-sm text-gray-400">65 years old, Technician</p>
        <div className="flex items-center bg-green-100 text-status-green text-xs font-medium px-3 py-1 rounded-full mt-2">
          <CheckCircle className="w-3 h-3 mr-1" />
          Healthy
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center my-6">
        <div>
          <p className="text-xs text-gray-400">BLOOD</p>
          <p className="font-bold text-brand-dark">B+</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">HEIGHT</p>
          <p className="font-bold text-brand-dark">170<span className="font-normal text-sm">cm</span></p>
        </div>
        <div>
          <p className="text-xs text-gray-400">WEIGHT</p>
          <p className="font-bold text-brand-dark">80<span className="font-normal text-sm">kg</span></p>
        </div>
      </div>

      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Responsible Doctors</h3>
        <div className="flex -space-x-2">
          {responsibleDoctors.map((src, index) => (
            <Avatar key={index} className="w-8 h-8 border-2 border-white">
              <AvatarImage src={src} />
              <AvatarFallback>{index}</AvatarFallback>
            </Avatar>
          ))}
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Patient History</h3>
        <button className="flex items-center w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
          <FileText className="w-5 h-5 mr-3 text-pink-400"/>
          <div>
            <p className="text-sm font-semibold text-brand-dark">Mr. Aaron Almaraz</p>
            <p className="text-xs text-gray-400">health-history-20.pdf</p>
          </div>
        </button>
      </div>

    </CardContent>
  </Card>
);
