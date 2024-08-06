import { fetchMenus, fetcSettings } from "@/lib/hook";
import Image from "next/image";

const Navbar = async () => {

    const data = await fetchMenus('mysite'); // ganti dengan nama menu yang ingin Anda tampilkan
    const setting = await fetcSettings();
    
  return (
    <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
      <div className="flex space-x-4 justify-center items-center">
        <Image src={process.env.HOST+"/storage/uploads"+setting.images.logo.path} width={100} height={100} alt={setting.images.logo.title} className="w-16"/>
        <h2 className="font-bold">{setting.seo.title}</h2>
      </div>
      <ul className="flex space-x-4">
        {data.links.map((item, index) => (
          <li key={index}>
            {item.active ? <a href={item.url.route}>{item.title}</a> : null }
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Navbar