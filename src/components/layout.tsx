import Navbar from './navbar'
import Footer from './footer'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className='flex-grow'>{children}</main>
      {/* <Footer /> */}
    </>
  )
}