import { useTheme } from "next-themes";
import { Button } from "../components/ui/Button";
import { Toast, toast } from "../components/ui/toast";


export default function Home() {
  const { setTheme } = useTheme()
  return (
    <div>
      <Button size='lg' variant='outline' className='mt-10' onClick={() => {
        toast({
          title: 'Error signing out',
          message: 'Please try again later.',
          type: 'error',
        })
        setTheme('light')
      }}>sam</Button>



      <p className="text-red-500">salam</p>
      <Button size='sm' variant='subtle' className='mt-96 ' onClick={() => setTheme('dark')}>xczcxz</Button>

    </div>
  )
}
