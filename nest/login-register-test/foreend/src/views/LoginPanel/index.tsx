import { UserFormSchema } from "@/utils/modules/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { FC } from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { UserFields } from "@/types/login";
import { login, register } from "@/apis";
import { useUserStore } from "@/stores";

const LoginRegisterPanel: FC = () => {
  const Navigate = useNavigate();
  const { setToken } = useUserStore();
  // 登录表单配置
  const loginForm = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 注册表单配置
  const registerForm = useForm<z.infer<typeof UserFormSchema>>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 登录提交处理
  const handleLogin = async (data: z.infer<typeof UserFormSchema>) => {
    const { code } = await login(data);
    if (code !== 200) return;
    toast("登录成功");
    Navigate("/");
  };

  // 注册提交处理
  const handleRegister = async (data: z.infer<typeof UserFormSchema>) => {
    const res = await register(data);
    const { code, token } = res;
    if (code !== 200) return;
    setToken(token);
    toast("注册成功");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <Tabs defaultValue="login" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">登录</TabsTrigger>
            <TabsTrigger value="register">注册</TabsTrigger>
          </TabsList>

          {/* 登录表单内容 */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>用户登录</CardTitle>
                <CardDescription>请输入您的账号信息登录系统</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...loginForm}>
                  <form
                    onSubmit={loginForm.handleSubmit(handleLogin)}
                    className="space-y-6"
                  >
                    <FormField
                      control={loginForm.control}
                      name="username"
                      render={({ field }: UserFields) => (
                        <FormItem>
                          <FormLabel>用户名</FormLabel>
                          <FormControl>
                            <Input placeholder="请输入用户名" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={loginForm.control}
                      name="password"
                      render={({ field }: UserFields) => (
                        <FormItem>
                          <FormLabel>密码</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="请输入密码" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      登录
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 注册表单内容 */}
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>用户注册</CardTitle>
                <CardDescription>请填写信息完成注册</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...registerForm}>
                  <form
                    onSubmit={registerForm.handleSubmit(handleRegister)}
                    className="space-y-6"
                  >
                    <FormField
                      control={registerForm.control}
                      name="username"
                      render={({ field }: UserFields) => (
                        <FormItem>
                          <FormLabel>用户名</FormLabel>
                          <FormControl>
                            <Input placeholder="请设置用户名" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={registerForm.control}
                      name="password"
                      render={({ field }: UserFields) => (
                        <FormItem>
                          <FormLabel>密码</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="请设置密码" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                      注册
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LoginRegisterPanel;
