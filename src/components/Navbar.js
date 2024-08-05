import { fetchMenus } from "@/lib/hook";

import React from 'react'

const Navbar = async () => {

    const data = await fetchMenus('mysite'); // ganti dengan nama menu yang ingin Anda tampilkan

  return (
    <div className="container mx-auto p-4">
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