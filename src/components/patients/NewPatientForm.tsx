
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

const patientFormSchema = z.object({
  firstName: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres." }),
  lastName: z.string().min(2, { message: "El apellido debe tener al menos 2 caracteres." }),
  dni: z.string().regex(/^[0-9]{8}[A-Z]$/, { message: "Formato de DNI inválido (ej: 12345678A)." }),
  email: z.string().email({ message: "Email inválido." }),
  phone: z.string().min(9, { message: "El teléfono debe tener al menos 9 dígitos." }),
});

type PatientFormValues = z.infer<typeof patientFormSchema>;

interface NewPatientFormProps {
    onSuccess?: () => void;
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
    },
  });

  function onSubmit(data: PatientFormValues) {
    console.log("Nuevo paciente:", data);
    toast.success(t('patient.form.successToast', 'Paciente añadido con éxito'));
    onSuccess?.();
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
         <FormField
          control={form.control}
          name="dni"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('patient.form.dni', 'DNI')}</FormLabel>
              <FormControl>
                <Input placeholder="12345678A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue/90">{t('patient.form.submit', 'Añadir Paciente')}</Button>
      </form>
    </Form>
  );
};
