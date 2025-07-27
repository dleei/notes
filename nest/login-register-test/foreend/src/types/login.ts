import { z } from "zod";
import { UserFormSchema } from '@/utils/modules/schema'
import { ControllerRenderProps } from "react-hook-form";

export interface UserFields {
 field: ControllerRenderProps<z.infer<typeof UserFormSchema>> 
}

export interface LoginVO {
  username: string;
  password: string;
}

export type RegisterVO = {
  [K in keyof LoginVO]: LoginVO[K];
} 