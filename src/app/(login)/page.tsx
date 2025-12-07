"use client";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { loginSchema, LoginSchema } from "@/src/schemas/authSchema";
import { useAuth } from "@/src/contexts/AuthContext";
import { login } from "@/src/services/authService";
import { Checkbox } from "@/src/components/ui/checkbox";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const loginMutation = useMutation({
    mutationFn: (data: LoginSchema) => login(data),
    onSuccess: (data) => {
      if (data.success.status == 1) {
        const userDetail = {
          id: data.success?.userDetails?.id,
          fullname: data.success?.userDetails?.full_name,
          email: data.success?.userDetails?.email,
          roleId: data.success?.userDetails?.role_id,
        };
        const token = data.success?.token;
        setAuth(userDetail, token);
        toast.success(data.success?.msg || "Logged in successfully!");
        if (data?.success?.userDetails?.role_id == 1) {
          router.push("/home");
        }
        if (data?.success?.userDetails?.role_id == 2) {
          router.push("/Instructor_dashboard");
        }
      } else {
        toast.error(data.success?.msg || "Something went wrong");
      }
      console.log("Login success", data);
    },
    onError: (error: any) => {
      toast.error("Something went wrong");
    },
  });
  const onsubmit: SubmitHandler<LoginSchema> = (data) => {
    console.log("data", data);
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex font-sans bg-white">
      {/* Left Panel - Background Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/login.jpg"
          alt="Motwane Academy"
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 flex flex-col justify-center pt-16 px-14 text-white">
          <h1 className="text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Motwane Academy
          </h1>

          <p className="text-base leading-relaxed max-w-md text-white/90">
            Learn anytime, anywhere. Motwane Academy empowers you with modern
            tools, interactive courses, and hands-on learning to boost your
            skills.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-14 bg-gradient-to-b from-[#00AF6F] via-[#029F92] to-[#0287C7]">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-white mb-2">Login</h2>
            <p className="text-teal-100">Sign in to your academy dashboard</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit(onsubmit)}>
            <Input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="p-6 bg-white/10 border-white/40 text-white placeholder:text-white/90 rounded-sm focus:border-white focus:bg-white/20"
            />
            {errors.email && (
              <p className="text-red-400 text-medium">{errors.email.message}</p>
            )}
            <Input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="p-6 bg-white/10 border-white/40 text-white placeholder:text-white/90 rounded-sm focus:border-white focus:bg-white/20"
            />
            {errors.password && (
              <p className="text-red-400 text-medium">
                {errors.password.message}
              </p>
            )}
            <div className="flex items-center space-x-2 pt-1">
              <Checkbox id="forgot" className="border-white/60" />
              <label
                htmlFor="forgot"
                className="text-sm text-white/80 cursor-pointer hover:text-white transition"
              >
                Forgot password ?
              </label>
            </div>

            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="cursor-pointer w-full bg-white text-teal-700 hover:bg-gray-100 font-semibold text-lg py-6 rounded-sm mt-6"
            >
              {loginMutation.isPending ? "Sign In..." : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-teal-100 text-sm mt-6">
            You have access to selected courses only
          </p>
        </div>
      </div>
    </div>
  );
}
