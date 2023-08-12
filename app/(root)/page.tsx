import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"


const HomePage
 = () => {


  return  (
    <main className=" w-screen h-screen flex items-center">
      <div className="text-center w-full space-y-8" >
      <h2>Welcome Page</h2>
      <Link href='/dashboard' className={buttonVariants({ variant: "outline" })}>
        Dashboard/Register
      </Link>
      </div>
    </main>
  )
 }
 
 
 export default HomePage
