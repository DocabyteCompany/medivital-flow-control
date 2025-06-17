
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createPatientWithRecord } from "@/services/patientService";

const patientFormSchema = z.object({
  firstName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  lastName: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
  dni: z.string().regex(/^[0-9]{8}[A-Z]$/, { message: "Formato de identificación inválido (ej: 12345678A)." }),
  email: z.string().email({ message: "Email inválido." }),
  phone: z.string().min(9, { message: "El teléfono debe tener al menos 9 dígitos." }),
  dob: z.string().min(1, { message: "La fecha de nacimiento es requerida." }),
  gender: z.enum(['Masculino', 'Femenino'], { message: "Seleccione un género." }),
  bloodType: z.string().min(1, { message: "El tipo de sangre es requerido." }),
  height: z.string().min(1, { message: "La altura es requerida." }),
  weight: z.string().min(1, { message: "El peso es requerido." }),
  occupation: z.string().min(1, { message: "La ocupación es requerida." }),
  address: z.string().optional(),
  insuranceType: z.string().optional(),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

interface NewPatientFormProps {
  onSuccess?: (patientId: string) => void;
}

export const NewPatientForm = ({ onSuccess }: NewPatientFormProps) => {
  const { t } = useTranslation();

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dni: "",
      email: "",
      phone: "",
      dob: "",
      gender: "Masculino",
      bloodType: "",
      height: "",
      weight: "",
      occupation: "",
      address: "",
      insuranceType: "",
    },
  });

  function onSubmit(data: PatientFormValues) {
    try {
      const newPatient = createPatientWithRecord({
        ...data,
        height: parseInt(data.height),
        weight: parseInt(data.weight),
        insuranceType: data.insuranceType as any
      });
      
      console.log("Nuevo paciente creado:", newPatient);
      toast.success(`Paciente ${newPatient.name} añadido con éxito. Expediente médico generado.`);
      onSuccess?.(newPatient.id);
      form.reset();
    } catch (error) {
      console.error('Error creating patient:', error);
      toast.error('Error al crear el paciente. Inténtelo de nuevo.');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('patient.form.firstName', 'Nombre')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('patient.form.firstNamePlaceholder', 'Ej: Juan')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('patient.form.lastName', 'Apellidos')}</FormLabel>
                <FormControl>
                  <Input placeholder={t('patient.form.lastNamePlaceholder', 'Ej: Pérez García')} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t('patient.form.identification', 'Identificación')}</FormLabel>
                <FormControl>
                  <Input placeholder="12345678A" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de Nacimiento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar género" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Masculino">Masculino</SelectItem>
                    <SelectItem value="Femenino">Femenino</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bloodType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de Sangre</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('patient.form.email', 'Email')}</FormLabel>
              <FormControl>
                <Input type="email" placeholder="juan.perez@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('patient.form.phone', 'Teléfono')}</FormLabel>
              <FormControl>
                <Input placeholder="600112233" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Altura (cm)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="170" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peso (kg)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="70" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ocupación</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Ingeniero, Estudiante, Jubilado" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dirección (Opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Calle, número, ciudad" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="insuranceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('patient.form.insurance', 'Tipo de Seguro')}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo de seguro (opcional)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="none">Sin seguro</SelectItem>
                  <SelectItem value="public">Seguro Público</SelectItem>
                  <SelectItem value="private">Seguro Privado</SelectItem>
                  <SelectItem value="mixed">Seguro Mixto</SelectItem>
                  <SelectItem value="international">Seguro Internacional</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90">
          {t('patient.form.submit', 'Crear Paciente y Expediente')}
        </Button>
      </form>
    </Form>
  );
};
