import { Button } from "@/components/ui/button";

export default function Home() {
    return (
      <main className="bg-blue-900 w-screen h-screen flex items-center">
       <div className="text-center w-full">
         <Button size="lg" variant="destructive">
            Click Me
         </Button>
       </div>
     </main>
  
    )
  }