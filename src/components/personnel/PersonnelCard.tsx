
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Personnel } from "@/data/personnel";
import { Mail, MessageSquare, Phone } from "lucide-react";

export const PersonnelCard = ({ person }: { person: Personnel }) => {
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('');
    }

    return (
        <Card className="shadow-soft border-0 rounded-2xl">
            <CardHeader className="flex flex-col items-center text-center p-6">
                <div className="relative">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback>{getInitials(person.name)}</AvatarFallback>
                    </Avatar>
                    {person.online && (
                        <span className="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-green-500 ring-2 ring-white" />
                    )}
                </div>
                <CardTitle className="mt-4 text-lg font-bold text-brand-dark">{person.name}</CardTitle>
                <p className="text-sm text-gray-500">{person.role}</p>
                {person.specialty && <Badge variant="secondary" className="mt-2">{person.specialty}</Badge>}
            </CardHeader>
            <CardContent className="p-6 pt-0 flex flex-col items-center">
                <div className="flex space-x-2">
                    <Button variant="outline" size="icon">
                        <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon">
                        <Mail className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
