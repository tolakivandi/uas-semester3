import { Button, Image, Input, Select, SelectItem, Link } from "@nextui-org/react";
import img from "../imgPage/Register.jpg";
export function Register() {
  return (
    <>
      <div className="w-full flex flex-wrap py-10">
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Join Us.</p>
            <form
              className="flex flex-col pt-3 md:pt-8"
              onsubmit="event.preventDefault();"
            >
              {/* username */}
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-3">
                <Input type="email" label="username" className="color" />
              </div>
              {/* emaill */}
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-3">
                <Input type="teks" label="email" className="color" />
              </div>
              {/* alamat */}
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-3">
                <Input type="teks" label="alamat" className="color" />
              </div>
              {/* password */}
              <div className="flex w-full flex-wrap md:flex-nowrap gap-4 py-3">
                <Input type="email" label="password" className="color" />
              </div>
              {/* select */}
              {/* <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select 
        label="Select an animal" 
        className="max-w-xs" 
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
      <Select
        label="Favorite Animal"
        placeholder="Select an animal"
        className="max-w-xs"
      >
        {animals.map((animal) => (
          <SelectItem key={animal.value} value={animal.value}>
            {animal.label}
          </SelectItem>
        ))}
      </Select>
    </div> */}
    {/* input gambar */}
              <div class="flex items-center justify-center max-w-full py-3">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" />
                </label>
              </div>
{/* simpan data */}
              <Button  color="primary">SIGN UP</Button>
            </form>
            <div class="text-center pt-12 pb-12">
              <p>
                Already have an account?{" "}
                <Link href="../Login">log in </Link>
              </p>
            </div>
          </div>
        </div>

        <div class="w-1/2 w-full shadow-2xl">
          <Image className="" src={img} alt="Background" />
        </div>
      </div>
    </>
  );
}
