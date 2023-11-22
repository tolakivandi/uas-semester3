import { Button,Image,Input, Link} from "@nextui-org/react";
import img from "../imgPage/Login.jpg";

export function Login() {
  return (
    <>
    <main className="bg-slate-100 min-h-screen flex items-center justify-center p-8 md:p-0">
      <div className="bg-white shadow-lg flex flex-col items-center rounded-xl overflow-hidden lg:flex-row lg:w-2/3 2xl:w-1/2">
        {/* Form */}
        <div className="p-8 lg:w-1/2 sm:p-8">
          <h1 className="font-bold text-gray-800 text-3xl md:text-4xl md:mb-16">
           welcome to rental mobil professional
          </h1>


          <form action="" className="flex flex-col  ">
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Input type="email" label="Email" className="color"/>
    </div>
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-7 ">
      <Input type="password" label="your password" className=""/>
    </div>
    <Button color="primary">
      LOG IN

    </Button>

          </form>

          <p className="text-gray-500">
            Don't have an account?{" "}
            <Link href="../Register">regist now</Link>
          </p>
        </div>

        {/* Image */}
        <div className="w-1/2">
          <Image src={img} alt="" className="h-f lg:block hidden" />
        </div>
      </div>
    </main>
    </>
  );
}
